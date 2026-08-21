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
    frame with that sentence's synthesized audio (only if CARTESIA_VOICE_ID is set)
  - {"type": "turn.complete", "user_text": str, "assistant_text": str} — client
    accumulates these to build the transcript it later posts to /sessions/end
  - {"type": "session.time_limit_reached"} — free-tier only, sent right before the
    server force-closes the connection at the 5-minute cap
  - {"type": "error", "message": str}

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
from app.services.llm_orchestrator import TurnMessage, generate_reply, split_into_sentences
from app.services.rag import build_enriched_system_prompt
from app.services.stt_stream import (
    CLOSE_STREAM_MESSAGE,
    DEEPGRAM_LIVE_URL,
    deepgram_auth_headers,
    parse_transcript_event,
)
from app.services.tts_stream import synthesize_speech

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


async def _run_turn(
    websocket: WebSocket,
    http_client: httpx.AsyncClient,
    scenario: dict,
    history: list[TurnMessage],
    user_transcript: str,
    send_json,
) -> None:
    is_first_turn = not history
    reply = await get_cached_reply(scenario["id"], user_transcript) if is_first_turn else None

    if reply is None:
        system_prompt = await asyncio.to_thread(
            build_enriched_system_prompt,
            scenario["id"],
            scenario["title"],
            scenario["system_prompt"],
            scenario.get("cefr_level"),
            user_transcript,
        )
        reply = await asyncio.to_thread(generate_reply, system_prompt, history, user_transcript)
        if is_first_turn:
            await set_cached_reply(scenario["id"], user_transcript, reply)

    await send_json({"type": "correction", "data": reply.correction.model_dump()})
    await send_json({"type": "fluency_score", "value": reply.fluency_score})

    voice_id = settings.cartesia_voice_id
    for sentence in split_into_sentences(reply.voice_reply):
        await send_json({"type": "reply.sentence", "text": sentence})
        if voice_id:
            audio = await synthesize_speech(http_client, sentence, voice_id)
            await websocket.send_bytes(audio)

    await send_json(
        {"type": "turn.complete", "user_text": user_transcript, "assistant_text": reply.voice_reply}
    )
    history.append(TurnMessage(role="user", content=user_transcript))
    history.append(TurnMessage(role="assistant", content=reply.voice_reply))


@router.websocket("/ws/session/{session_id}")
async def voice_session(websocket: WebSocket, session_id: str) -> None:
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Missing token")
        return
    try:
        user = await asyncio.to_thread(user_from_token, token)
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Invalid token")
        return

    try:
        scenario = await asyncio.to_thread(_load_scenario, session_id)
    except ValueError:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Unknown scenario")
        return

    service_db = get_service_client()
    if not await asyncio.to_thread(can_start_session, service_db, user.id):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="quota_exceeded")
        return
    user_is_pro = await asyncio.to_thread(is_pro, service_db, user.id)

    await websocket.accept()
    history: list[TurnMessage] = []

    async def send_json(payload: dict) -> None:
        await websocket.send_text(json.dumps(payload))

    try:
        async with ws_connect(DEEPGRAM_LIVE_URL, additional_headers=deepgram_auth_headers()) as deepgram_ws:

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
                async with httpx.AsyncClient() as http_client:
                    async for raw in deepgram_ws:
                        event = parse_transcript_event(raw)
                        if event is None:
                            continue
                        if not event.is_final:
                            await send_json({"type": "transcript.interim", "text": event.text})
                            continue

                        await send_json({"type": "transcript.final", "text": event.text})
                        if not event.speech_final:
                            continue

                        await _run_turn(
                            websocket, http_client, scenario, history, event.text, send_json
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
        pass
    except* ConnectionClosed:
        pass
    except* SessionTimeLimitReached:
        pass
    except* Exception as eg:
        for exc in eg.exceptions:
            try:
                await send_json({"type": "error", "message": str(exc)})
            except Exception:
                pass
    finally:
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()
