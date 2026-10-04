"""Live voice practice session — push-to-talk with explicit turn confirmation.

Client -> Server (wss://.../ws/session/{scenario_slug}):
  - first text frame: {"type": "auth", "access_token": "<supabase_jwt>"}
  - binary frames: raw linear16 PCM audio, 16kHz mono, forwarded live to
    Deepgram — the client is expected to only send these while the user is
    actively holding/toggled "recording" (push-to-talk, not continuous).
  - text frame {"type": "end_turn"}: user tapped "Konuşmayı Bitir" — forces
    Deepgram to immediately finalize the current utterance (no more waiting
    on silence-based endpointing) via the Finalize control message.
  - text frame {"type": "confirm_turn", "text": "<reviewed/edited text>"}:
    user reviewed the transcript (editable client-side, see
    `transcript.final` below) and confirmed it — THIS is what actually
    triggers the AI's reply. The transcript the model responds to is always
    whatever the client sends here, not anything the server cached, so a
    user-edited correction of a misheard word is what the AI actually sees.
  - text frame {"type": "end_session"}: user is done, close the turn gracefully

Server -> Client (text frames unless noted):
  - {"type": "session.ready"} — auth + scenario setup + opening line + Deepgram
    connection are all done; safe for the client to start its microphone.
  - {"type": "transcript.interim", "text": str, "words": [...]}
  - {"type": "transcript.final", "text": str, "words": [...], "metrics": {...}}
    — sent for every Deepgram-finalized segment (including the one produced by
    an "end_turn"-triggered Finalize). Purely informational now: it does NOT
    advance the turn by itself, it's what the client shows on its transcript
    review card. The client decides when to actually proceed via "confirm_turn".
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
  - {"type": "turn.complete", "user_text": str, "assistant_text": str,
    "suggested_replies": [str, ...], "coach_tip_tr": str | None} — client
    accumulates user_text/assistant_text to build the transcript it later posts
    to /sessions/end. suggested_replies is 2-3 short example replies (English)
    tailored to the AI's last question (same pattern as text chat's
    ChatMessageResponse.suggested_replies) — refreshed every turn. coach_tip_tr
    is a proactive, A1/A2-only Turkish coaching hint pointing at the next
    concrete thing to try saying (vs. correction, which only reacts to a
    mistake already made) — null at B1 and above by design.
  - {"type": "scene.complete", "summary_tr": str | None} — sent right after a
    turn.complete where the model judged the scenario's objectives (from
    `scenarios.objectives`, baked into the system prompt by
    `rag.py::_build_objectives_block`) meaningfully covered. Purely a soft
    UX nudge (mobile shows a "wrap up?" banner) — the conversation is NOT
    force-ended, the user can keep talking and may receive this again later.
  - {"type": "session.time_limit_reached"} — free-tier only, sent right before the
    server force-closes the connection at the 5-minute cap
  - {"type": "error", "code": str, "message": str, "retryable": bool}

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
    Correction,
    OrchestratorReply,
    TurnAnalysis,
    TurnMessage,
    analyze_turn,
    extract_complete_sentences,
    generate_suggested_replies,
    split_into_sentences,
    stream_voice_reply,
)
from app.services.rag import build_enriched_system_prompt
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

router = APIRouter(tags=["voice"])


class SessionTimeLimitReached(Exception):
    pass


AUTH_TIMEOUT_SECONDS = 10
DEEPGRAM_KEEPALIVE_SECONDS = 4


def _uses_beginner_teacher_mode(scenario: dict) -> bool:
    return (scenario.get("cefr_level") or "").upper() in {"A1", "A2"}


def _teacher_opening_line(scenario: dict) -> str:
    situation = (scenario.get("situation") or scenario.get("description") or "bu günlük konuşma sahnesi").strip()
    objectives = scenario.get("objectives") or []
    first_step = next((item.get("text_tr") for item in objectives if item.get("text_tr")), None)
    if first_step:
        return f"Bu sahnede {situation[:180]} İlk adımın şu: {first_step} Hazır olduğunda butona basılı tutup İngilizce söyle."
    return f"Bu sahnede {situation[:180]} Hazır olduğunda butona basılı tut ve ilk İngilizce cümleni söyle."


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

    def __init__(self, websocket: WebSocket, http_client: httpx.AsyncClient, send_json, language: str = "en") -> None:
        self._websocket = websocket
        self._http_client = http_client
        self._send_json = send_json
        self._voice_id = settings.cartesia_voice_id
        self._language = language
        self._queue: asyncio.Queue = asyncio.Queue()
        self._sender_task = asyncio.create_task(self._drain()) if self._voice_id else None

    async def _drain(self) -> None:
        while True:
            task = await self._queue.get()
            if task is None:
                return
            try:
                await self._websocket.send_bytes(await task)
            except (httpx.HTTPError, TimeoutError):
                # Text was already delivered by reply.sentence. A transient
                # TTS failure should degrade to text-only for this sentence,
                # not tear down the entire live conversation.
                logger.warning("TTS sentence failed; continuing text-only", exc_info=True)

    async def speak(self, sentence: str) -> None:
        await self._send_json({
            "type": "reply.sentence",
            "text": sentence,
            "speaker": "teacher" if self._language == "tr" else "character",
            "language": self._language,
        })
        if not self._voice_id:
            return
        task = asyncio.create_task(
            synthesize_speech(self._http_client, sentence, self._voice_id, language=self._language)
        )
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
    teacher_mode = _uses_beginner_teacher_mode(scenario)
    # Existing cache entries contain the old English in-character replies.
    # Beginner teacher mode deliberately bypasses them.
    cached = await get_cached_reply(scenario["id"], user_transcript) if is_first_turn and not teacher_mode else None
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

    speaker = _SentenceSpeaker(
        websocket, http_client, send_json, language="tr" if teacher_mode else "en"
    )

    if teacher_mode:
        # Same streaming-first architecture as the standard path below (Ek
        # 34) — this used to be a single blocking generate_reply() call,
        # specifically because Maya's spoken Turkish reply narrates the
        # correction/praise inline (see rag.py's
        # _build_beginner_teacher_block), and two fully independent calls
        # risked disagreeing about what the learner said. Streaming the
        # reply first, then running analysis AFTER it (fed the already-
        # spoken reply as context — see analyze_turn's ai_reply_for_
        # consistency param) keeps that same consistency guarantee while
        # fixing time-to-first-audio, which was the actual complaint: A1/A2
        # learners (this mode's entire audience) were waiting longest of
        # anyone for Maya to start talking.
        # No try/except around the stream itself — a real provider error here
        # propagates up to confirm_turn's handler same as the standard path
        # (a clean voice_reply_failed, retryable), rather than silently
        # swallowing partially-spoken audio and risking a reply/history
        # mismatch. Only the "model returned literally nothing" case (not an
        # exception) gets a recovery line below — less jarring for a
        # beginner than an empty turn.
        voice_reply_parts: list[str] = []
        buffer = ""
        chunk_count = 0
        async for delta in stream_voice_reply(system_prompt, history, user_transcript):
            if chunk_count == 0:
                logger.info(
                    "_run_turn: first stream delta received (teacher_mode) for scenario=%s",
                    scenario.get("slug"),
                )
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
        if chunk_count == 0:
            logger.error(
                "_run_turn: teacher_mode stream yielded ZERO chunks for scenario=%s, transcript=%r",
                scenario.get("slug"), user_transcript,
            )

        full_voice_reply = " ".join(voice_reply_parts).strip()
        if not full_voice_reply:
            full_voice_reply = (
                "Cümleni aldım ama bu turdaki yanıtımı hazırlarken kısa bir sorun yaşadım. "
                "Aynı cümleyi bir kez daha İngilizce söylemeyi dener misin?"
            )
            await speaker.speak(full_voice_reply)
        await speaker.flush()

        analysis_task = asyncio.create_task(
            asyncio.to_thread(analyze_turn, system_prompt, history, user_transcript, full_voice_reply)
        )
        suggestions_task = asyncio.create_task(
            asyncio.to_thread(generate_suggested_replies, system_prompt, history, full_voice_reply)
        )
        try:
            beginner_analysis = await analysis_task
        except Exception:
            logger.exception(
                "Beginner teacher analysis failed for scenario=%s; completing without scoring",
                scenario.get("slug"),
            )
            beginner_analysis = TurnAnalysis(
                correction=Correction(has_error=False),
                fluency_score=0,
                is_scene_complete=False,
                completion_summary_tr=None,
                coach_tip_tr=None,
            )
        await send_json({"type": "correction", "data": beginner_analysis.correction.model_dump()})
        await send_json({"type": "fluency_score", "value": beginner_analysis.fluency_score})
        correction = beginner_analysis.correction
        is_scene_complete = beginner_analysis.is_scene_complete
        completion_summary_tr = beginner_analysis.completion_summary_tr
        suggested_replies = await suggestions_task
        coach_tip_tr = None
    elif cached is not None:
        for sentence in split_into_sentences(cached.voice_reply):
            await speaker.speak(sentence)
        await speaker.flush()
        await send_json({"type": "correction", "data": cached.correction.model_dump()})
        await send_json({"type": "fluency_score", "value": cached.fluency_score})
        full_voice_reply = cached.voice_reply
        correction = cached.correction
        is_scene_complete = cached.is_scene_complete
        completion_summary_tr = cached.completion_summary_tr
        suggested_replies = cached.suggested_replies
        coach_tip_tr = cached.coach_tip_tr
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
        # Fired as soon as the AI's own reply text is known — needs it as
        # context (see generate_suggested_replies' docstring for why this
        # can't just be a field on analyze_turn). Runs concurrently with
        # whatever's left of analysis_task instead of adding to
        # time-to-first-audio, since TTS has already started by this point.
        suggestions_task = asyncio.create_task(
            asyncio.to_thread(generate_suggested_replies, system_prompt, history, full_voice_reply)
        )
        try:
            analysis = await analysis_task
        except Exception:
            # The learner may already be hearing a perfectly valid streamed
            # reply. A secondary scoring/correction failure must not turn
            # that successful conversational turn into a red error state.
            logger.exception(
                "Turn analysis failed for scenario=%s; completing without scoring",
                scenario.get("slug"),
            )
            analysis = TurnAnalysis(
                correction=Correction(has_error=False),
                fluency_score=0,
                is_scene_complete=False,
                completion_summary_tr=None,
                coach_tip_tr=None,
            )
        logger.info(
            "_run_turn: analysis done for scenario=%s — has_error=%s is_scene_complete=%s",
            scenario.get("slug"), analysis.correction.has_error, analysis.is_scene_complete,
        )
        await send_json({"type": "correction", "data": analysis.correction.model_dump()})
        await send_json({"type": "fluency_score", "value": analysis.fluency_score})
        correction = analysis.correction
        is_scene_complete = analysis.is_scene_complete
        completion_summary_tr = analysis.completion_summary_tr
        coach_tip_tr = None if teacher_mode else analysis.coach_tip_tr
        suggested_replies = await suggestions_task

        if is_first_turn and not teacher_mode:
            await set_cached_reply(
                scenario["id"],
                user_transcript,
                OrchestratorReply(
                    voice_reply=full_voice_reply,
                    correction=analysis.correction,
                    fluency_score=analysis.fluency_score,
                    is_scene_complete=is_scene_complete,
                    completion_summary_tr=completion_summary_tr,
                    suggested_replies=suggested_replies,
                    coach_tip_tr=coach_tip_tr,
                ),
            )

    _log_mistake_if_any(db, user_id, user_transcript, correction)

    await send_json({
        "type": "turn.complete",
        "user_text": user_transcript,
        "assistant_text": full_voice_reply,
        "suggested_replies": suggested_replies,
        "coach_tip_tr": coach_tip_tr,
    })
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

    try:
        scenario = await asyncio.to_thread(_load_scenario, session_id)
    except ValueError:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="scenario_not_found")
        return

    service_db = get_service_client()
    if settings.voice_quota_enabled and not await asyncio.to_thread(
        can_start_session, service_db, user.id
    ):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="quota_exceeded")
        return
    user_is_pro = not settings.voice_quota_enabled or await asyncio.to_thread(
        is_pro, service_db, user.id
    )

    history: list[TurnMessage] = []

    async def send_json(payload: dict) -> None:
        await websocket.send_text(json.dumps(payload))

    try:
        async with httpx.AsyncClient() as http_client:
            teacher_mode = _uses_beginner_teacher_mode(scenario)
            opening_line = _teacher_opening_line(scenario) if teacher_mode else scenario.get("opening_line")
            if opening_line:
                await send_json({
                    "type": "reply.sentence",
                    "text": opening_line,
                    "speaker": "teacher" if teacher_mode else "character",
                    "language": "tr" if teacher_mode else "en",
                })
                voice_id = settings.cartesia_voice_id
                if voice_id:
                    try:
                        audio = await synthesize_speech(
                            http_client,
                            opening_line,
                            voice_id,
                            language="tr" if teacher_mode else "en",
                        )
                        await websocket.send_bytes(audio)
                    except (httpx.HTTPError, TimeoutError):
                        logger.warning(
                            "Opening-line TTS failed for scenario=%s; continuing text-only",
                            scenario.get("slug"),
                            exc_info=True,
                        )
                history.append(TurnMessage(role="assistant", content=opening_line))

            async with ws_connect(
                DEEPGRAM_LIVE_URL, additional_headers=deepgram_auth_headers()
            ) as deepgram_ws:
                # Only let the client start its microphone once auth,
                # scenario setup, the opening prompt, and STT are ready.
                await send_json({
                    "type": "session.ready",
                    "teacher_mode": teacher_mode,
                    "cefr_level": scenario.get("cefr_level"),
                })

                async def forward_client_audio() -> None:
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
                                # Push-to-talk: user explicitly ended their
                                # turn, so force Deepgram to finalize right
                                # now instead of waiting on silence-based
                                # endpointing. The resulting speech_final
                                # event arrives on handle_transcripts() as
                                # usual, but no longer triggers _run_turn by
                                # itself — that now waits for confirm_turn.
                                await deepgram_ws.send(FINALIZE_MESSAGE)
                            elif control_type == "confirm_turn":
                                confirmed_text = (control.get("text") or "").strip()
                                if not confirmed_text:
                                    continue
                                try:
                                    await _run_turn(
                                        websocket,
                                        http_client,
                                        service_db,
                                        user.id,
                                        scenario,
                                        history,
                                        confirmed_text,
                                        send_json,
                                    )
                                except Exception:
                                    logger.exception(
                                        "Voice reply failed for scenario=%s", scenario.get("slug")
                                    )
                                    await send_json({
                                        "type": "error",
                                        "code": "voice_reply_failed",
                                        "message": "AI yanıtı şu anda oluşturulamadı. Tekrar konuşabilirsin.",
                                        "retryable": True,
                                    })

                async def keep_deepgram_alive() -> None:
                    while True:
                        await asyncio.sleep(DEEPGRAM_KEEPALIVE_SECONDS)
                        await deepgram_ws.send(KEEP_ALIVE_MESSAGE)

                async def handle_transcripts() -> None:
                    final_segments: list[str] = []
                    final_words: list[dict] = []
                    total_duration = 0.0
                    total_fillers = 0
                    confidence_sum = 0.0
                    confidence_word_count = 0

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
                                "words": [*final_words, *event.words],
                            })
                            continue

                        if event.text:
                            final_segments.append(event.text)
                            final_words.extend(event.words)
                        total_duration += event.duration_sec
                        total_fillers += event.filler_count
                        confidence_sum += sum(float(word.get("confidence", 0.0)) for word in event.words)
                        confidence_word_count += len(event.words)

                        full_transcript = " ".join(final_segments).strip()
                        if not event.from_finalize:
                            # Deepgram's silence endpoint may mark a segment
                            # speech_final after a short pause while the user
                            # is still holding the button. Push-to-talk owns
                            # the real turn boundary: only the Results event
                            # produced by our explicit Finalize may complete
                            # the turn. Until then, accumulate every segment.
                            await send_json({
                                "type": "transcript.interim",
                                "text": full_transcript,
                                "words": final_words,
                            })
                            continue

                        word_count = len(final_words)
                        wpm = round(word_count / (total_duration / 60.0), 1) if total_duration > 0.4 else 0.0
                        avg_confidence = (
                            round(confidence_sum / confidence_word_count, 2)
                            if confidence_word_count
                            else 0.0
                        )
                        await send_json({
                            "type": "transcript.final",
                            "text": full_transcript,
                            "words": final_words,
                            "metrics": {
                                "wpm": wpm,
                                "filler_count": total_fillers,
                                "avg_confidence": avg_confidence,
                                "duration_sec": round(total_duration, 2),
                            },
                        })

                        # Turn end is no longer decided here — the client
                        # reviews this transcript and sends back either
                        # confirm_turn (possibly edited) or asks to redo.
                        # _run_turn is triggered from forward_client_audio()'s
                        # confirm_turn branch instead.
                        final_segments = []
                        final_words = []
                        total_duration = 0.0
                        total_fillers = 0
                        confidence_sum = 0.0
                        confidence_word_count = 0

                async def enforce_free_time_limit() -> None:
                    await asyncio.sleep(FREE_SESSION_MAX_SECONDS)
                    await send_json({"type": "session.time_limit_reached"})
                    raise SessionTimeLimitReached

                async with asyncio.TaskGroup() as tg:
                    tg.create_task(forward_client_audio())
                    tg.create_task(handle_transcripts())
                    tg.create_task(keep_deepgram_alive())
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
                await send_json({
                    "type": "error",
                    "code": "session_error",
                    "message": "Canlı konuşma bağlantısında beklenmeyen bir hata oluştu.",
                    "retryable": False,
                })
            except Exception:
                pass
    finally:
        if websocket.client_state != WebSocketState.DISCONNECTED:
            try:
                await websocket.close()
            except RuntimeError:
                # Starlette tracks "did we already send a close frame"
                # (application_state) separately from client_state — with
                # several concurrent tasks (audio forwarding, transcript
                # handling, the free-tier timer) all able to end the session,
                # a sibling path can already have closed it right before this
                # runs. The connection ending up closed is all that matters
                # here, not which path got there first.
                pass
