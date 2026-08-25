import logging

from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse
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
        profile = ctx.db.table("profiles").select("cefr_level").eq("id", ctx.user.id).single().execute().data
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found") from exc

    try:
        response = generate_chat_reply(
            payload.history, payload.message, profile.get("cefr_level"), payload.role_context
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
