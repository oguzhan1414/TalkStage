"""Shared, cancellable sentence/TTS pipeline for both voice room types."""
import asyncio
import logging
import time

from app.core.config import settings
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
                    if not parts:
                        logger.info("voice_first_sentence_ms=%d", (time.monotonic() - started) * 1000)
                    parts.append(sentence)
                    await speaker.speak(sentence)
            if buffer.strip():
                parts.append(buffer.strip())
                await speaker.speak(buffer.strip())
            reply = " ".join(parts)
            if not reply:
                raise RuntimeError("Empty voice reply")
            # Start secondary work before waiting for remaining audio synthesis.
            async def feedback():
                try:
                    async with asyncio.timeout(8):
                        return await analyze_voice_turn(system_prompt, context, text, reply)
                except Exception:
                    logger.warning("Voice feedback unavailable; preserving successful reply")
                    return None
            analysis_task = asyncio.create_task(feedback())
            await speaker.flush()
            analysis = await analysis_task
        if analysis:
            await send_json({"type": "correction", "data": analysis.correction.model_dump()})
            await send_json({"type": "fluency_score", "value": analysis.fluency_score})
        await send_json({"type": "turn.complete", "user_text": text, "assistant_text": reply,
                         "suggested_replies": analysis.suggested_replies if analysis else [],
                         "coach_tip_tr": analysis.coach_tip_tr if analysis else None})
        if analysis and allow_completion and analysis.is_scene_complete:
            await send_json({"type": "scene.complete", "summary_tr": analysis.completion_summary_tr})
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
