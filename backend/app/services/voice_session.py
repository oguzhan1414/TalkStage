"""Bounded WebSocket transport shared by scenario and free-chat rooms.

STT connections exist only while recording/finalizing; silent thinking time and
TTS playback do not hold a paid recognizer open. No audio is persisted here.
"""
import asyncio
import json
import logging
import time
from collections import deque

import httpx
from fastapi import WebSocketDisconnect
from websockets.asyncio.client import connect as ws_connect

from app.core.language import DEEPGRAM_CODES, normalize_native_language
from app.core.security import user_from_token
from app.services.llm_orchestrator import TurnMessage
from app.services.stt_stream import DEEPGRAM_LIVE_URL, FINALIZE_MESSAGE, deepgram_auth_headers, parse_transcript_event
from app.services.voice_turn import SentenceSpeaker

logger = logging.getLogger(__name__)
MAX_TEXT_LENGTH = 2000
MAX_AUDIO_BYTES = 16000 * 2 * 60
MAX_SESSION_SECONDS = 30 * 60
MAX_TURNS = 120
# Per-worker backstop. A distributed admission limit belongs at the gateway.
_active_users: set[str] = set()


class SessionEnded(Exception):
    pass


def parse_control(raw: str) -> dict:
    if len(raw) > 12000:
        raise ValueError("message_too_large")
    data = json.loads(raw)
    if not isinstance(data, dict) or not isinstance(data.get("type"), str):
        raise ValueError("invalid_message")
    return data


async def authenticate_voice(websocket):
    await websocket.accept()
    try:
        raw = await asyncio.wait_for(websocket.receive_text(), 10)
        data = parse_control(raw)
        token = data.get("access_token")
        if data["type"] != "auth" or not isinstance(token, str) or not token or len(token) > 8192:
            raise ValueError("auth_required")
        # Odalar auth mesajındaki ek alanları (ör. sahne bağlamı) okuyabilsin.
        websocket.state.auth_payload = data
        return await asyncio.wait_for(asyncio.to_thread(user_from_token, token), 10)
    except (Exception,):
        try:
            await websocket.close(code=1008, reason="auth_invalid")
        except RuntimeError:
            pass
        return None


class Recognition:
    def __init__(self, send_json):
        self.send_json = send_json
        self.socket = None
        self.reader = None
        self.finalizer = None
        self.segments = []
        self.words = []
        self.interim = ""
        self.interim_words = []
        self.duration = 0.0
        self.fillers = 0
        self.byte_count = 0
        self.started = 0.0
        self.finished = True
        self.finalizing = False

    async def start(self, language="en"):
        if not self.finished:
            raise ValueError("recording_in_progress")
        await self.close()
        self.segments, self.words, self.interim_words = [], [], []
        self.interim = ""
        self.duration, self.fillers, self.byte_count = 0.0, 0, 0
        self.finished, self.finalizing = False, False
        self.started = time.monotonic()
        # Nova-2 multi is English/Spanish, NOT English/Turkish. Select the
        # language per utterance (English or the learner's native language)
        # rather than silently mistranscribing.
        dg_language = DEEPGRAM_CODES.get(language, language)
        url = DEEPGRAM_LIVE_URL.replace("language=en", f"language={dg_language}")
        self.socket = await ws_connect(url, additional_headers=deepgram_auth_headers(),
                                       open_timeout=8, close_timeout=1, max_size=256_000)
        self.reader = asyncio.create_task(self._read())

    async def audio(self, data):
        if self.finalizing:
            return
        if self.finished:
            await self.start()  # Compatibility with existing mobile builds.
        self.byte_count += len(data)
        if (len(data) > 128000 or len(data) % 2 or self.byte_count > MAX_AUDIO_BYTES
                or self.byte_count > (time.monotonic() - self.started) * 40000 + 128000):
            raise ValueError("audio_limit")
        await self.socket.send(data)

    async def finalize(self):
        if self.finished:
            await self.send_json({"type": "transcript.final", "text": "", "words": []})
            return
        if self.finalizing:
            return
        self.finalizing = True
        await self.socket.send(FINALIZE_MESSAGE)
        # Finalize can return no acknowledgement when all speech was already
        # finalized. Flush accumulated segments instead of waiting six seconds.
        async def fallback():
            await asyncio.sleep(1.5)
            await self._finish()
        self.finalizer = asyncio.create_task(fallback())

    async def _read(self):
        try:
            async for raw in self.socket:
                event = parse_transcript_event(raw)
                if event is None or self.finished:
                    continue
                if event.is_final:
                    if event.text:
                        self.segments.append(event.text)
                        self.words.extend(event.words)
                    self.interim, self.interim_words = "", []
                    self.duration += event.duration_sec
                    self.fillers += event.filler_count
                else:
                    self.interim, self.interim_words = event.text, event.words
                if event.from_finalize and self.finalizing:
                    await self._finish()
                    return
                await self.send_json({"type": "transcript.interim",
                                      "text": " ".join([*self.segments, self.interim]).strip(),
                                      "words": self.words + self.interim_words})
        except asyncio.CancelledError:
            raise
        except Exception:
            logger.warning("Voice recognizer disconnected")
            await self.send_json({"type": "error", "code": "transcription_failed",
                                  "message": "Ses çözümlenemedi. Tekrar söyleyebilir veya yazabilirsin.",
                                  "retryable": True})
            self.finished = True

    async def _finish(self):
        if self.finished:
            return
        self.finished = True
        text = " ".join([*self.segments, self.interim]).strip()[:MAX_TEXT_LENGTH]
        words = (self.words + self.interim_words)[:500]
        confidence = sum(w.get("confidence", 0) for w in words) / len(words) if words else 0
        # A fallback interim is explicitly low confidence and must be reviewed.
        if self.interim:
            confidence = min(confidence, 0.7)
        duration = max(self.duration, self.byte_count / 32000)
        await self.send_json({"type": "transcript.final", "text": text, "words": words,
                              "metrics": {"wpm": round(len(words) * 60 / duration, 1) if duration else 0,
                                          "filler_count": self.fillers,
                                          "avg_confidence": round(confidence, 2),
                                          "duration_sec": round(duration, 2)}})
        if self.socket:
            await self.socket.close()

    async def close(self):
        for task in (self.reader, self.finalizer):
            if task and not task.done():
                task.cancel()
        await asyncio.gather(*(t for t in (self.reader, self.finalizer) if t), return_exceptions=True)
        if self.socket:
            await self.socket.close()
        self.reader = self.finalizer = self.socket = None
        self.finished = True


async def serve_voice(websocket, user_id, opening, run_turn, *, language="tr", teacher_mode=True,
                      max_seconds=MAX_SESSION_SECONDS, native_language="tr"):
    native_language = normalize_native_language(native_language)
    if user_id in _active_users:
        await websocket.close(code=1008, reason="session_already_active")
        return
    _active_users.add(user_id)
    history = []
    send_lock = asyncio.Lock()

    async def send_json(payload):
        async with send_lock:
            await websocket.send_text(json.dumps(payload, ensure_ascii=False))

    recognition = Recognition(send_json)
    turn_task = None
    turn_count = 0
    last_turn_at = 0.0
    controls = deque()
    try:
        async with httpx.AsyncClient(timeout=12) as http_client:
            async def perform_turn(text):
                try:
                    async with asyncio.timeout(40):
                        await run_turn(websocket, http_client, history, text, send_json)
                except Exception:
                    logger.warning("Voice turn failed", exc_info=True)
                    await send_json({"type": "error", "code": "voice_reply_failed",
                                     "message": "Yanıt hazırlanamadı. Tekrar deneyebilir veya yazabilirsin.",
                                     "retryable": True})

            async def receive():
                nonlocal turn_task, turn_count, last_turn_at
                async with asyncio.timeout(20):
                    async with SentenceSpeaker(websocket, http_client, send_json, language) as speaker:
                        if opening:
                            await speaker.speak(opening)
                            await speaker.flush()
                            history.append(TurnMessage(role="assistant", content=opening))
                await send_json({"type": "session.ready", "teacher_mode": teacher_mode})
                while True:
                    message = await asyncio.wait_for(websocket.receive(), 180)
                    if message["type"] == "websocket.disconnect":
                        return
                    busy = turn_task is not None and not turn_task.done()
                    if (data := message.get("bytes")) is not None:
                        if not busy:
                            await recognition.audio(data)
                        continue
                    control = parse_control(message.get("text", ""))
                    now = time.monotonic()
                    while controls and controls[0] < now - 60:
                        controls.popleft()
                    controls.append(now)
                    if len(controls) > 120:
                        raise ValueError("rate_limit")
                    kind = control["type"]
                    if kind == "end_session":
                        return
                    if busy:
                        # Ignore duplicate confirm/start frames without interrupting
                        # a successful turn or queueing extra paid model requests.
                        continue
                    if kind == "start_turn":
                        spoken_language = control.get("language", "en")
                        if spoken_language not in {"en", native_language}:
                            raise ValueError("invalid_language")
                        await recognition.start(spoken_language)
                    elif kind == "end_turn":
                        await recognition.finalize()
                    elif kind == "confirm_turn":
                        text = control.get("text")
                        if not isinstance(text, str) or not 0 < len(text.strip()) <= MAX_TEXT_LENGTH:
                            raise ValueError("invalid_transcript")
                        if now - last_turn_at < 1:
                            raise ValueError("rate_limit")
                        if turn_count >= MAX_TURNS:
                            raise ValueError("turn_limit")
                        await recognition.close()
                        turn_count += 1
                        last_turn_at = now
                        turn_task = asyncio.create_task(perform_turn(text.strip()))

            async with asyncio.timeout(min(max_seconds, MAX_SESSION_SECONDS)):
                await receive()
    except (WebSocketDisconnect, SessionEnded):
        pass
    except TimeoutError:
        await send_json({"type": "session.time_limit_reached"})
    except ValueError:
        await send_json({"type": "error", "code": "invalid_request",
                         "message": "İstek sınırı aşıldı. Odayı yeniden açabilirsin.", "retryable": False})
    except Exception:
        logger.warning("Voice session ended unexpectedly", exc_info=True)
    finally:
        if turn_task:
            turn_task.cancel()
            await asyncio.gather(turn_task, return_exceptions=True)
        await recognition.close()
        _active_users.discard(user_id)
        try:
            await websocket.close()
        except RuntimeError:
            pass
    return history
