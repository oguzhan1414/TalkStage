"""Live voice practice session.

Client -> Server (wss://.../ws/session/{scenario_slug}?token=<supabase_jwt>):
  - binary frames: raw linear16 PCM audio, 16kHz mono, forwarded live to Deepgram
  - text frame {"type": "end_session"}: user is done, close the turn gracefully

Server -> Client (text frames unless noted):
  - {"type": "transcript.interim", "text": str}
  - {"type": "transcript.final", "text": str}
  - {"type": "correction", "data": {has_error, user_said, corrected, explanation_tr}}
  - {"type": "fluency_score", "value": int}
  - {"type": "reply.sentence", "text": str}   — immediately followed by one binary
    frame with that sentence's synthesized audio (only if CARTESIA_VOICE_ID is set).
    Streamed sentence-by-sentence as the LLM generates them (Ek 34) — the first one
    typically arrives well before the model has finished the whole reply, which is
    what actually fixes "Düşünüyor…" latency (time-to-first-audio, not total
    generation time). `correction`/`fluency_score` now arrive AFTER all
    reply.sentence messages instead of before (they come from a second, structured
    call that runs concurrently with the streaming+TTS above, see `_run_turn` in
    this file) — order changed, message shapes did not, no mobile changes needed.
  - {"type": "turn.complete", "user_text": str, "assistant_text": str} — client
    accumulates these to build the transcript it later posts to /sessions/end
  - {"type": "scene.complete", "summary_tr": str | None} — sent right after a
    turn.complete where the model judged the scenario's objectives (from
    `scenarios.objectives`, baked into the system prompt by
    `rag.py::_build_objectives_block`) meaningfully covered. Purely a soft
    UX nudge (mobile shows a "wrap up?" banner) — the conversation is NOT
    force-ended, the user can keep talking and may receive this again later.
  - {"type": "session.time_limit_reached"} — free-tier only, sent right before the
    server force-closes the connection at the 5-minute cap
  - {"type": "error", "message": str}

If the scenario has a non-empty `opening_line`, it's sent as a `reply.sentence`
(same shape as a normal AI turn, TTS included) immediately after accept() —
before Deepgram is even connected — so the user always has something to
respond to instead of facing silence. This costs no LLM call, so it works
even without OPENAI_API_KEY configured.

`session_id` in the path is the scenario slug (from GET /scenarios), not a
pre-existing `sessions` row — that row is only created at the end of the
conversation, by POST /sessions/end (Görev 10).

Free tier gets 1 voice session/day (checked before accepting the connection —
close code 1008, reason "quota_exceeded") and a 5-minute cap per session once
connected (see app/services/entitlements.py). Pro/trial subscribers are unlimited.

Reconnect-after-drop mid-conversation is out of scope here; see Görev 11.
"""

import asyncio
import json
import logging

import httpx
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status
from postgrest.exceptions import APIError
from starlette.websockets import WebSocketState
from websockets.asyncio.client import connect as ws_connect
from websockets.exceptions import ConnectionClosed

from app.core.config import settings
from app.core.security import user_from_token
from app.core.supabase_client import get_service_client
from app.services.cache import get_cached_reply, set_cached_reply
from app.services.entitlements import FREE_SESSION_MAX_SECONDS, can_start_session, is_pro
from app.services.llm_orchestrator import (
    OrchestratorReply,
    TurnMessage,
    analyze_turn,
    extract_complete_sentences,
    split_into_sentences,
    stream_voice_reply,
)
from app.services.rag import build_enriched_system_prompt
from app.services.stt_stream import (
    CLOSE_STREAM_MESSAGE,
    DEEPGRAM_LIVE_URL,
    deepgram_auth_headers,
    parse_transcript_event,
)
from app.services.tts_stream import synthesize_speech

logger = logging.getLogger(__name__)

router = APIRouter(tags=["voice"])


class SessionTimeLimitReached(Exception):
    pass


def _load_scenario(slug: str) -> dict:
    db = get_service_client()
    try:
        result = db.table("scenarios").select("*").eq("slug", slug).single().execute()
    except APIError as exc:
        raise ValueError(f"Unknown scenario: {slug}") from exc
    return result.data


class _SentenceSpeaker:
    """Sends each sentence's text the instant it's ready, and PIPELINES TTS
    synthesis: sentence N+1's synthesis starts as soon as its text exists,
    without waiting for sentence N's synthesis to finish first.

    A first version of this (Ek 34) got this wrong in a way only a timing
    test caught: it created sentence N+1's task before AWAITING sentence N's
    task, which does start them concurrently, but it only ever sent sentence
    N's audio at the START of the NEXT call to speak() — meaning if the LLM
    stream paused between sentences (completely normal — sentence 2 often
    isn't ready for a second or more after sentence 1), sentence 1's audio
    sat fully-synthesized-and-ready but UNSENT for that entire gap, actively
    working against the "hear the first sentence ASAP" goal it was built for.

    The fix: a dedicated background task drains a queue of synthesis tasks
    and sends each one's audio the moment IT finishes, completely
    independent of when the next sentence's text arrives. `speak()` only
    ever enqueues; it never blocks on a previous sentence's audio."""

    def __init__(self, websocket: WebSocket, http_client: httpx.AsyncClient, send_json) -> None:
        self._websocket = websocket
        self._http_client = http_client
        self._send_json = send_json
        self._voice_id = settings.cartesia_voice_id
        self._queue: asyncio.Queue = asyncio.Queue()
        self._sender_task = asyncio.create_task(self._drain()) if self._voice_id else None

    async def _drain(self) -> None:
        while True:
            task = await self._queue.get()
            if task is None:
                return
            await self._websocket.send_bytes(await task)

    async def speak(self, sentence: str) -> None:
        await self._send_json({"type": "reply.sentence", "text": sentence})
        if not self._voice_id:
            return
        task = asyncio.create_task(synthesize_speech(self._http_client, sentence, self._voice_id))
        await self._queue.put(task)

    async def flush(self) -> None:
        if self._sender_task is None:
            return
        await self._queue.put(None)
        await self._sender_task


def _log_mistake_if_any(db, user_id: str, user_transcript: str, correction) -> None:
    """Voice sessions detected+displayed corrections but never persisted them
    — unlike text chat (`chat.py`), which logs to `grammar_mistakes` so they
    show up in the Hata Defterim notebook. Same best-effort shape as chat.py:
    a logging failure must never break the turn the user is waiting on."""
    if not (correction.has_error and correction.corrected):
        return
    try:
        db.table("grammar_mistakes").insert(
            {
                "user_id": user_id,
                "topic_code": None,
                "wrong_text": user_transcript,
                "corrected_text": correction.corrected,
                "explanation_tr": correction.explanation_tr,
                "source": "voice_session",
            }
        ).execute()
    except Exception:
        logger.exception("Failed to log grammar mistake from voice session")


async def _run_turn(
    websocket: WebSocket,
    http_client: httpx.AsyncClient,
    db,
    user_id: str,
    scenario: dict,
    history: list[TurnMessage],
    user_transcript: str,
    send_json,
) -> None:
    """Ek 34: two paths depending on whether this turn's reply is already
    cached (first-turn greetings repeat a lot, see cache.py).

    - Cache hit: zero LLM latency already, so the complete reply is just sent
      as sentences immediately — no reason to stream something we already
      have in full.
    - Cache miss (the common case): `stream_voice_reply()` streams the AI's
      in-character reply token-by-token, flushed to TTS sentence-by-sentence
      as soon as each one completes — this is what actually fixes
      "Düşünüyor…" latency (time-to-first-audio, not total generation time).
      `analyze_turn()` (correction/fluency/is_scene_complete) runs
      CONCURRENTLY as a background task, because it only depends on
      {system_prompt, history, user_transcript} — never on what the AI is
      about to say back — so it has the entire TTS-speaking duration to
      finish and adds essentially zero perceived latency.
    """
    is_first_turn = not history
    cached = await get_cached_reply(scenario["id"], user_transcript) if is_first_turn else None
    logger.info(
        "_run_turn start: scenario=%s turn=%d cached=%s transcript=%r",
        scenario.get("slug"), len(history) // 2 + 1, cached is not None, user_transcript,
    )

    system_prompt = await build_enriched_system_prompt(
        scenario["id"],
        scenario["title"],
        scenario["system_prompt"],
        scenario.get("cefr_level"),
        user_transcript,
        objectives=scenario.get("objectives"),
    )

    speaker = _SentenceSpeaker(websocket, http_client, send_json)

    if cached is not None:
        for sentence in split_into_sentences(cached.voice_reply):
            await speaker.speak(sentence)
        await speaker.flush()
        await send_json({"type": "correction", "data": cached.correction.model_dump()})
        await send_json({"type": "fluency_score", "value": cached.fluency_score})
        full_voice_reply = cached.voice_reply
        correction = cached.correction
        is_scene_complete = cached.is_scene_complete
        completion_summary_tr = cached.completion_summary_tr
    else:
        analysis_task = asyncio.create_task(
            asyncio.to_thread(analyze_turn, system_prompt, history, user_transcript)
        )

        voice_reply_parts: list[str] = []
        buffer = ""
        chunk_count = 0
        async for delta in stream_voice_reply(system_prompt, history, user_transcript):
            if chunk_count == 0:
                logger.info("_run_turn: first stream delta received for scenario=%s", scenario.get("slug"))
            chunk_count += 1
            buffer += delta
            sentences, buffer = extract_complete_sentences(buffer)
            for sentence in sentences:
                voice_reply_parts.append(sentence)
                await speaker.speak(sentence)
        remainder = buffer.strip()
        if remainder:
            voice_reply_parts.append(remainder)
            await speaker.speak(remainder)
        await speaker.flush()
        logger.info(
            "_run_turn: stream done, %d chunks, %d sentences for scenario=%s",
            chunk_count, len(voice_reply_parts), scenario.get("slug"),
        )
        if chunk_count == 0:
            # The model returned literally nothing — surface this loudly
            # instead of silently sending an empty turn.complete, which is
            # indistinguishable from "the AI chose not to reply" client-side.
            logger.error(
                "_run_turn: stream_voice_reply yielded ZERO chunks for scenario=%s, "
                "transcript=%r — check the provider response directly.",
                scenario.get("slug"), user_transcript,
            )

        full_voice_reply = " ".join(voice_reply_parts)
        analysis = await analysis_task
        logger.info(
            "_run_turn: analysis done for scenario=%s — has_error=%s is_scene_complete=%s",
            scenario.get("slug"), analysis.correction.has_error, analysis.is_scene_complete,
        )
        await send_json({"type": "correction", "data": analysis.correction.model_dump()})
        await send_json({"type": "fluency_score", "value": analysis.fluency_score})
        correction = analysis.correction
        is_scene_complete = analysis.is_scene_complete
        completion_summary_tr = analysis.completion_summary_tr

        if is_first_turn:
            await set_cached_reply(
                scenario["id"],
                user_transcript,
                OrchestratorReply(
                    voice_reply=full_voice_reply,
                    correction=analysis.correction,
                    fluency_score=analysis.fluency_score,
                    is_scene_complete=is_scene_complete,
                    completion_summary_tr=completion_summary_tr,
                ),
            )

    _log_mistake_if_any(db, user_id, user_transcript, correction)

    await send_json(
        {"type": "turn.complete", "user_text": user_transcript, "assistant_text": full_voice_reply}
    )
    if is_scene_complete:
        await send_json({"type": "scene.complete", "summary_tr": completion_summary_tr})
    history.append(TurnMessage(role="user", content=user_transcript))
    history.append(TurnMessage(role="assistant", content=full_voice_reply))
    logger.info("_run_turn complete: scenario=%s reply=%r", scenario.get("slug"), full_voice_reply)


@router.websocket("/ws/session/{session_id}")
async def voice_session(websocket: WebSocket, session_id: str) -> None:
    # A close code/reason sent before `.accept()` is a rejected opening
    # handshake, not a WS close frame — per RFC 6455 there's no established
    # connection yet to carry it, so clients (browsers in particular) only
    # ever observe a generic HTTP 403 / close code 1006 with an empty reason.
    # Every rejection path below must accept first so its real reason (most
    # importantly "quota_exceeded", which the Paywall upsell button keys off)
    # actually reaches the client.
    token = websocket.query_params.get("token")
    if not token:
        await websocket.accept()
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Missing token")
        return
    try:
        user = await asyncio.to_thread(user_from_token, token)
    except Exception:
        await websocket.accept()
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Invalid token")
        return

    try:
        scenario = await asyncio.to_thread(_load_scenario, session_id)
    except ValueError:
        await websocket.accept()
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Unknown scenario")
        return

    service_db = get_service_client()
    if not await asyncio.to_thread(can_start_session, service_db, user.id):
        await websocket.accept()
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="quota_exceeded")
        return
    user_is_pro = await asyncio.to_thread(is_pro, service_db, user.id)

    await websocket.accept()
    history: list[TurnMessage] = []

    async def send_json(payload: dict) -> None:
        await websocket.send_text(json.dumps(payload))

    try:
        async with httpx.AsyncClient() as http_client:
            opening_line = scenario.get("opening_line")
            if opening_line:
                await send_json({"type": "reply.sentence", "text": opening_line})
                voice_id = settings.cartesia_voice_id
                if voice_id:
                    audio = await synthesize_speech(http_client, opening_line, voice_id)
                    await websocket.send_bytes(audio)
                history.append(TurnMessage(role="assistant", content=opening_line))

            async with ws_connect(
                DEEPGRAM_LIVE_URL, additional_headers=deepgram_auth_headers()
            ) as deepgram_ws:

                async def forward_client_audio() -> None:
                    while True:
                        message = await websocket.receive()
                        if message["type"] == "websocket.disconnect":
                            raise WebSocketDisconnect
                        if (data := message.get("bytes")) is not None:
                            await deepgram_ws.send(data)
                        elif (text := message.get("text")) is not None:
                            control = json.loads(text)
                            if control.get("type") == "end_session":
                                await deepgram_ws.send(CLOSE_STREAM_MESSAGE)
                                return

                async def handle_transcripts() -> None:
                    async for raw in deepgram_ws:
                        event = parse_transcript_event(raw)
                        if event is None:
                            continue
                        if not event.is_final:
                            await send_json({
                                "type": "transcript.interim",
                                "text": event.text,
                                "words": event.words,
                            })
                            continue

                        await send_json({
                            "type": "transcript.final",
                            "text": event.text,
                            "words": event.words,
                            "metrics": {
                                "wpm": event.wpm,
                                "filler_count": event.filler_count,
                                "avg_confidence": event.avg_confidence,
                                "duration_sec": event.duration_sec,
                            },
                        })
                        if not event.speech_final:
                            continue

                        await _run_turn(
                            websocket, http_client, service_db, user.id, scenario, history, event.text, send_json
                        )

                async def enforce_free_time_limit() -> None:
                    await asyncio.sleep(FREE_SESSION_MAX_SECONDS)
                    await send_json({"type": "session.time_limit_reached"})
                    raise SessionTimeLimitReached

                async with asyncio.TaskGroup() as tg:
                    tg.create_task(forward_client_audio())
                    tg.create_task(handle_transcripts())
                    if not user_is_pro:
                        tg.create_task(enforce_free_time_limit())

    except* WebSocketDisconnect:
        logger.info("Client disconnected voice session %r", session_id)
    except* ConnectionClosed:
        logger.info("Deepgram connection closed for voice session %r", session_id)
    except* SessionTimeLimitReached:
        pass
    except* Exception as eg:
        for exc in eg.exceptions:
            logger.exception("Unhandled error in voice session %r", session_id, exc_info=exc)
            try:
                await send_json({"type": "error", "message": str(exc)})
            except Exception:
                pass
    finally:
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()
