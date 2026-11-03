"""Shared, cancellable sentence/TTS pipeline for both voice room types."""
import asyncio
import re
import logging
import time

from app.core.config import settings
from app.services.correction_filter import drop_trivial_correction
from app.services.llm_orchestrator import (
    TurnMessage, analyze_voice_turn, bounded_history,
    extract_complete_sentences, stream_voice_reply,
)
from app.services.tts_stream import synthesize_speech, tts_available

logger = logging.getLogger(__name__)


class SentenceSpeaker:
    def __init__(self, websocket, http_client, send_json, language="tr"):
        self.websocket = websocket
        self.http_client = http_client
        self.send_json = send_json
        self.language = language
        self.queue = asyncio.Queue(maxsize=3)
        self.tasks = set()
        self.sender = None

    async def __aenter__(self):
        self.sender = asyncio.create_task(self._drain())
        return self

    async def __aexit__(self, *_):
        tasks = [self.sender, *self.tasks]
        for task in tasks:
            if task is not None and not task.done():
                task.cancel()
        await asyncio.gather(*(t for t in tasks if t is not None), return_exceptions=True)

    async def _drain(self):
        while True:
            task = await self.queue.get()
            if task is None:
                return
            try:
                audio = await task
            except (Exception,):
                logger.warning("Voice synthesis unavailable; sentence remains readable")
                await self.send_json({"type": "audio.unavailable"})
            else:
                await self.websocket.send_bytes(audio)
            finally:
                self.tasks.discard(task)

    async def speak(self, sentence):
        # Some models leak JSON escapes into the spoken text (\" quotes, stray backslashes): never show or read them.
        sentence = clean_spoken(sentence)
        if not sentence:
            return
        await self.send_json({"type": "reply.sentence", "text": sentence,
                              "speaker": "character" if self.language == "en" else "teacher",
                              "language": self.language})
        if not tts_available():
            return

        async def synthesize():
            # Includes time waiting for provider concurrency capacity.
            async with asyncio.timeout(12):
                return await synthesize_speech(self.http_client, sentence,
                                                settings.cartesia_voice_id, self.language)

        task = asyncio.create_task(synthesize())
        self.tasks.add(task)
        await self.queue.put(task)
        if self.sender.done():
            await self.sender

    async def flush(self):
        await self.queue.put(None)
        await self.sender


def clean_spoken(text: str) -> str:
    """What a model leaks into a spoken reply and must never be shown or read: JSON escapes, stray backslashes, ** markdown."""
    return " ".join((text or "").replace('\\"', '"').replace("\\", "").replace("**", "").split())


# Common words of the learners' own languages: a "suggested reply" with them is an explanation, not an answer.
_NATIVE_WORDS = {
    "ve", "bir", "bu", "yerine", "demelisin", "söyle", "soyle", "şimdi", "simdi", "değil", "degil", "için", "icin", "gibi",
    "que", "una", "por", "para", "dice", "decir", "pero", "você", "voce", "dizer", "não", "nao", "und", "nicht", "sagen",
    "statt", "anstatt", "der", "die", "das", "ist", "mit",
}


def _is_english(text: str) -> bool:
    letters = [c for c in text if c.isalpha()]
    if not letters or sum(c.isascii() for c in letters) / len(letters) < 0.97:
        return False
    # An answer to say aloud has no quotes or colons in it (those mean someone is explaining a sentence).
    if any(ch in text for ch in '"“”«»:'):
        return False
    words = {w.strip(".,!?;").lower() for w in text.split()}
    return not (words & _NATIVE_WORDS)


_QUOTED = re.compile(
    r'"([^"\n]{3,160})"'
    r'|“([^”\n]{3,160})”'
    r'|«([^»\n]{3,160})»'
    r'|„([^“”\n]{3,160})[“”]'
)


def quoted_english(text: str) -> list[str]:
    """English sentences Mivo put in quotes (the line to say, the other person's line), in order."""
    out = []
    for m in _QUOTED.finditer(text or ""):
        part = next(g for g in m.groups() if g is not None).strip()
        letters = [c for c in part if c.isalpha()]
        # Mostly plain ASCII letters and at least two words: English, not a Turkish/German phrase.
        if len(part.split()) >= 2 and letters and sum(c.isascii() for c in letters) / len(letters) > 0.97:
            out.append(part)
    return out


async def run_voice_turn(websocket, http_client, system_prompt, history, text,
                         send_json, *, language="tr", allow_completion=False,
                         log_mistake=None):
    started = time.monotonic()
    context = bounded_history(history)
    analysis_task = None
    try:
        async with SentenceSpeaker(websocket, http_client, send_json, language) as speaker:
            parts, buffer = [], ""
            async for delta in stream_voice_reply(system_prompt, context, text):
                buffer += delta
                sentences, buffer = extract_complete_sentences(buffer)
                for sentence in sentences:
                    sentence = clean_spoken(sentence)
                    if not sentence:
                        continue
                    if not parts:
                        logger.info("voice_first_sentence_ms=%d", (time.monotonic() - started) * 1000)
                    parts.append(sentence)
                    await speaker.speak(sentence)
            tail = clean_spoken(buffer)
            if tail:
                parts.append(tail)
                await speaker.speak(tail)
            reply = " ".join(parts)
            if not reply:
                raise RuntimeError("Empty voice reply")
            # Start secondary work before waiting for remaining audio synthesis.
            async def feedback():
                try:
                    async with asyncio.timeout(8):
                        return await analyze_voice_turn(system_prompt, context, text, reply)
                except Exception:
                    logger.warning("Voice feedback unavailable (no correction/tips this turn); preserving successful reply", exc_info=True)
                    return None
            analysis_task = asyncio.create_task(feedback())
            await speaker.flush()
            analysis = await analysis_task
        if analysis:
            # Deterministic backstop for the prompt's NOISE RULES: case/punctuation-only "errors" never reach the learner.
            analysis.correction = drop_trivial_correction(analysis.correction, text)
            await send_json({"type": "correction", "data": analysis.correction.model_dump()})
            await send_json({"type": "fluency_score", "value": analysis.fluency_score})
        suggested = list(analysis.suggested_replies) if analysis else []
        suggested_tr = list(analysis.suggested_replies_tr) if analysis else []
        # A "suggestion" that is not an English sentence (a weak model put its explanation there) is not shown.
        if suggested and not all(_is_english(clean_spoken(x)) for x in suggested):
            suggested, suggested_tr = [], []
        suggested = [clean_spoken(x) for x in suggested]
        if not suggested:
            # The analysis failed or came back empty (provider rate limit, slow model): the hint button still gets the
            # English line Mivo asked for ("Bir de sen söyle: \"Yes, I am a new student.\"") instead of staying grey.
            # A question in quotes is the other person's line to ANSWER, not a sentence to repeat.
            suggested, suggested_tr = [q for q in quoted_english(reply) if not q.rstrip().endswith("?")][-1:], []
        await send_json({"type": "turn.complete", "user_text": text, "assistant_text": reply,
                         "suggested_replies": suggested,
                         "suggested_replies_tr": suggested_tr,
                         "coach_tip_tr": analysis.coach_tip_tr if analysis else None})
        if analysis and allow_completion and analysis.is_scene_complete:
            await send_json({"type": "scene.complete", "summary_tr": analysis.completion_summary_tr})
        if analysis and analysis.conversation_ended:
            # The goodbye has been said: the app closes the room and shows its summary once the audio has played.
            await send_json({"type": "session.ending"})
        history.extend([TurnMessage(role="user", content=text), TurnMessage(role="assistant", content=reply)])
        history[:] = bounded_history(history)
        logger.info("voice_turn_ms=%d feedback=%s", (time.monotonic() - started) * 1000, analysis is not None)
        # Persistence must not block the asyncio event loop or delay the reply.
        if analysis and log_mistake:
            await asyncio.to_thread(log_mistake, analysis.correction)
    finally:
        if analysis_task and not analysis_task.done():
            analysis_task.cancel()
            await asyncio.gather(analysis_task, return_exceptions=True)
