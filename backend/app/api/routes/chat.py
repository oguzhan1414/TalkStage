import logging

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse, TranscribeResponse
from app.services.chat_memory import format_memory_context, load_memory
from app.services.stt import transcribe_audio
from app.services.text_chat import generate_chat_reply

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/message", response_model=ChatMessageResponse)
def send_message(
    payload: ChatMessageRequest, ctx: AuthContext = Depends(get_auth_context)
) -> ChatMessageResponse:
    """Stateless: the client keeps the running conversation and resends it each
    turn (see `ChatMessageRequest.history`) — there's no server-side chat table
    for this lightweight daily-practice mode, unlike the full voice `sessions`."""
    try:
        profile = (
            ctx.db.table("profiles")
            .select("*")
            .eq("id", ctx.user.id)
            .single()
            .execute()
            .data
        )
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found") from exc

    memory_context = None
    if not payload.role_context:
        memory_context = format_memory_context(load_memory(ctx.db, ctx.user.id))

    try:
        response = generate_chat_reply(
            payload.history,
            payload.message,
            profile.get("cefr_level"),
            payload.role_context,
            profile.get("display_name"),
            payload.topic_context,
            profile.get("native_language"),
            memory_context,
        )
    except RuntimeError as exc:
        # GROQ_API_KEY not configured — same "not set up yet" shape as the other AI keys.
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except Exception as exc:  # Groq network/parsing failures — an external service boundary
        logger.exception("Groq chat completion failed")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="Sohbet cevabı alınamadı"
        ) from exc

    if response.correction.has_error and response.correction.corrected:
        # Best-effort: a logging failure (e.g. migration 0011 not applied yet,
        # matching several other not-yet-applied migrations in this repo)
        # must never break the chat reply the user is waiting on.
        try:
            ctx.db.table("grammar_mistakes").insert(
                {
                    "user_id": ctx.user.id,
                    "topic_code": payload.topic_code,
                    "wrong_text": payload.message,
                    "corrected_text": response.correction.corrected,
                    "explanation_tr": response.correction.explanation_tr,
                    "source": "text_chat",
                }
            ).execute()
        except Exception:
            logger.exception("Failed to log grammar mistake")

    return response


@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_message(
    audio: UploadFile = File(...),
    ctx: AuthContext = Depends(get_auth_context),
) -> TranscribeResponse:
    """One-shot speech-to-text for the voice-first chat room — tap-record a
    single turn, transcribe it, then feed the text into the exact same
    `POST /chat/message` flow a typed message would use. Mirrors
    `POST /onboarding/calibrate`'s transcription step (same underlying
    `transcribe_audio`, same Groq-Whisper-first/Deepgram-fallback behavior).
    """
    audio_bytes = await audio.read()
    content_type = audio.content_type or "audio/m4a"
    try:
        async with httpx.AsyncClient() as http_client:
            transcript = await transcribe_audio(http_client, audio_bytes, content_type)
    except RuntimeError as exc:
        # Neither GROQ_API_KEY nor DEEPGRAM_API_KEY configured.
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except httpx.HTTPError as exc:
        logger.exception("Transcription request failed")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="Ses yazıya çevrilemedi"
        ) from exc

    return TranscribeResponse(transcript=transcript.strip())
