import asyncio
import json
import logging

import httpx
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status
from websockets.asyncio.client import connect as ws_connect

from app.core.config import settings
from app.core.security import user_from_token
from app.core.supabase_client import get_service_client
from app.schemas.burger_order import BurgerOrderState
from app.services.burger_orchestrator import generate_burger_turn
from app.services.stt_stream import (
    CLOSE_STREAM_MESSAGE,
    DEEPGRAM_LIVE_URL,
    FINALIZE_MESSAGE,
    KEEP_ALIVE_MESSAGE,
    deepgram_auth_headers,
    parse_transcript_event,
)
from app.services.tts_stream import synthesize_speech

logger = logging.getLogger(__name__)

router = APIRouter(tags=["burger_order"])

AUTH_TIMEOUT_SECONDS = 10
DEEPGRAM_KEEPALIVE_SECONDS = 4
OPENING_LINE = "Welcome to Maya's Burgers! What can I get started for you today?"


@router.websocket("/ws/burger-order")
async def burger_order_session(websocket: WebSocket) -> None:
    await websocket.accept()

    try:
        auth_message = await asyncio.wait_for(websocket.receive_json(), AUTH_TIMEOUT_SECONDS)
        token = auth_message.get("access_token") if auth_message.get("type") == "auth" else None
    except (TimeoutError, ValueError, json.JSONDecodeError, WebSocketDisconnect):
        token = None

    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="auth_required")
        return

    try:
        user = await asyncio.to_thread(user_from_token, token)
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="auth_invalid")
        return

    current_order = BurgerOrderState()
    history: list[dict] = []
    finalize_requested = asyncio.Event()

    async def send_json(payload: dict) -> None:
        await websocket.send_text(json.dumps(payload))

    try:
        async with httpx.AsyncClient() as http_client:
            voice_id = settings.cartesia_voice_id

            # 1. Send initial order tray state
            await send_json({"type": "order.update", "order_state": current_order.model_dump()})

            # 2. Maya greets the customer
            await send_json({
                "type": "reply.sentence",
                "text": OPENING_LINE,
                "speaker": "maya",
                "is_coach": False,
            })
            if voice_id:
                try:
                    audio = await synthesize_speech(http_client, OPENING_LINE, voice_id, language="en")
                    await websocket.send_bytes(audio)
                except Exception:
                    logger.warning("Opening-line TTS failed in burger_session; continuing text-only", exc_info=True)
            history.append({"role": "assistant", "content": OPENING_LINE})

            # 3. Connect to Deepgram STT
            async with ws_connect(
                DEEPGRAM_LIVE_URL, additional_headers=deepgram_auth_headers()
            ) as deepgram_ws:
                await send_json({"type": "session.ready"})

                async def forward_client_audio() -> None:
                    nonlocal current_order
                    while True:
                        message = await websocket.receive()
                        if message["type"] == "websocket.disconnect":
                            raise WebSocketDisconnect
                        if (data := message.get("bytes")) is not None:
                            await deepgram_ws.send(data)
                        elif (text := message.get("text")) is not None:
                            control = json.loads(text)
                            control_type = control.get("type")
                            if control_type == "end_session":
                                await deepgram_ws.send(CLOSE_STREAM_MESSAGE)
                                return
                            if control_type == "end_turn":
                                finalize_requested.set()
                                await deepgram_ws.send(FINALIZE_MESSAGE)
                            elif control_type == "reset_order":
                                current_order = BurgerOrderState()
                                history.clear()
                                finalize_requested.clear()
                                await send_json({"type": "order.update", "order_state": current_order.model_dump()})
                                await send_json({"type": "session.reset"})
                            elif control_type == "confirm_turn":
                                confirmed_text = (control.get("text") or "").strip()
                                if not confirmed_text:
                                    continue

                                try:
                                    await send_json({"type": "turn.processing"})
                                    # Process turn with Burger Orchestrator
                                    result = await generate_burger_turn(
                                        current_order, history, confirmed_text
                                    )
                                    current_order = result.order_state

                                    # Both lines' texts are already known at this point — kick off
                                    # BOTH TTS syntheses concurrently instead of sequentially
                                    # (coach-then-await-then-maya-then-await), so total latency is
                                    # max(synth_coach, synth_maya) instead of their sum. Audio is
                                    # still SENT in a fixed coach-then-maya order (matching playback
                                    # order on the client's FIFO queue), regardless of which
                                    # synthesis actually finishes first.
                                    coach_audio_task = (
                                        asyncio.create_task(
                                            synthesize_speech(http_client, result.spoken_coach_tr, voice_id, language="tr")
                                        )
                                        if result.spoken_coach_tr and voice_id
                                        else None
                                    )
                                    maya_audio_task = (
                                        asyncio.create_task(
                                            synthesize_speech(http_client, result.spoken_reply_en, voice_id, language="en")
                                        )
                                        if voice_id
                                        else None
                                    )

                                    # First: if there's a spoken Turkish coaching tip, speak it!
                                    if result.spoken_coach_tr:
                                        await send_json({
                                            "type": "reply.sentence",
                                            "text": result.spoken_coach_tr,
                                            "speaker": "coach",
                                            "is_coach": True,
                                        })
                                        if coach_audio_task is not None:
                                            try:
                                                await websocket.send_bytes(await coach_audio_task)
                                            except Exception:
                                                logger.warning("Coach TTS failed; continuing", exc_info=True)

                                    # Second: speak Maya's in-character cashier reply in English
                                    await send_json({
                                        "type": "reply.sentence",
                                        "text": result.spoken_reply_en,
                                        "speaker": "maya",
                                        "is_coach": False,
                                    })
                                    if maya_audio_task is not None:
                                        try:
                                            await websocket.send_bytes(await maya_audio_task)
                                        except Exception:
                                            logger.warning("Maya TTS failed; continuing", exc_info=True)

                                    # Send live order tray update
                                    await send_json({
                                        "type": "order.update",
                                        "order_state": result.order_state.model_dump(),
                                    })

                                    # Send coach tip card if applicable
                                    if result.coach_card and result.coach_card.has_tip:
                                        await send_json({
                                            "type": "coach.tip",
                                            "data": result.coach_card.model_dump(),
                                        })

                                    # Send completion if order is finished
                                    if result.is_order_completed:
                                        await send_json({
                                            "type": "order.completed",
                                            "receipt": result.order_state.model_dump(),
                                            "summary_tr": result.completion_summary_tr,
                                            "order_number": result.receipt_order_number or 42,
                                            "fluency_score": result.fluency_score,
                                        })

                                    # Complete the turn
                                    await send_json({
                                        "type": "turn.complete",
                                        "user_text": confirmed_text,
                                        "assistant_text": result.spoken_reply_en,
                                        "suggested_replies": result.suggested_replies,
                                        "fluency_score": result.fluency_score,
                                    })

                                    history.append({"role": "user", "content": confirmed_text})
                                    history.append({"role": "assistant", "content": result.spoken_reply_en})

                                except Exception:
                                    logger.exception("Error processing burger turn")
                                    await send_json({
                                        "type": "error",
                                        "code": "turn_failed",
                                        "message": "Sipariş işlenirken bir sorun oluştu. Lütfen tekrar dene.",
                                        "retryable": True,
                                    })

                async def keep_deepgram_alive() -> None:
                    while True:
                        await asyncio.sleep(DEEPGRAM_KEEPALIVE_SECONDS)
                        await deepgram_ws.send(KEEP_ALIVE_MESSAGE)

                async def handle_transcripts() -> None:
                    final_segments: list[str] = []
                    async for raw in deepgram_ws:
                        event = parse_transcript_event(raw)
                        if event is None:
                            continue
                        if not event.is_final:
                            stable_prefix = " ".join(final_segments).strip()
                            interim_text = f"{stable_prefix} {event.text}".strip()
                            await send_json({
                                "type": "transcript.interim",
                                "text": interim_text,
                            })
                            continue

                        final_segments.append(event.text)
                        full_transcript = " ".join(final_segments).strip()

                        if not event.from_finalize and not finalize_requested.is_set():
                            await send_json({
                                "type": "transcript.interim",
                                "text": full_transcript,
                            })
                            continue

                        # When finalized
                        await send_json({
                            "type": "transcript.final",
                            "text": full_transcript,
                            "avg_confidence": event.avg_confidence,
                            "words": event.words,
                        })
                        final_segments.clear()
                        finalize_requested.clear()

                tasks = [
                    asyncio.create_task(forward_client_audio()),
                    asyncio.create_task(handle_transcripts()),
                    asyncio.create_task(keep_deepgram_alive()),
                ]
                done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
                for t in pending:
                    t.cancel()
                for t in done:
                    if exc := t.exception():
                        if not isinstance(exc, (WebSocketDisconnect, asyncio.CancelledError)):
                            logger.error("Burger session background task error: %s", exc)

    except WebSocketDisconnect:
        logger.info("Burger session disconnected for user %s", user.id)
    except Exception:
        logger.exception("Unexpected error in burger_order_session")
        try:
            await websocket.close(code=status.WS_1011_INTERNAL_ERROR)
        except Exception:
            pass
