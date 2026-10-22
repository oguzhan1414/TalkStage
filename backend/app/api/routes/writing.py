import asyncio
import logging
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context
from app.services.grammar_topics import normalize_topic
from app.services.mistake_log import insert_mistake
from app.services.usage_guard import rate_limit
from app.services.writing_check import WritingFeedback, check_writing_sync

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/writing", tags=["writing"])


class WritingCheckRequest(BaseModel):
    task_id: str = Field(min_length=1, max_length=40)
    text: str = Field(min_length=1, max_length=1500)
    situation_en: str = Field(min_length=1, max_length=900)
    recipient_en: str = Field(min_length=1, max_length=120)
    tone: Literal["friendly", "polite", "formal"]
    #: Required points, in the learner's language (shown on the task card).
    points: list[str] = Field(default_factory=list, max_length=5)
    #: CEFR level of the task itself (the learner's own level moves silently inside a stage).
    level: Literal["A1", "A2", "B1", "B2", "C1", "C2"] | None = None


@router.post("/check", response_model=WritingFeedback, dependencies=[Depends(rate_limit("writing_check", 15))])
async def check_writing(payload: WritingCheckRequest, ctx: AuthContext = Depends(get_auth_context)) -> WritingFeedback:
    """'Gerçek mesaj yaz': grammar + tone feedback on one short real-life text. Corrections are also logged to
    `grammar_mistakes` (source `writing`) so they show up in the Mistakes Notebook."""
    try:
        profile = ctx.db.table("profiles").select("cefr_level, native_language").eq("id", ctx.user.id).single().execute().data
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found") from exc

    try:
        feedback = await asyncio.to_thread(
            check_writing_sync,
            text=payload.text,
            situation_en=payload.situation_en,
            recipient_en=payload.recipient_en,
            tone=payload.tone,
            points=[p[:120] for p in payload.points],
            level=(payload.level or profile.get("cefr_level") or "A2"),
            native=(profile.get("native_language") or "tr"),
        )
    except Exception as exc:  # model/network failure at an external service boundary
        logger.exception("writing check failed")
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="writing_check_unavailable") from exc

    _log_corrections(ctx, feedback)
    return feedback


def _log_corrections(ctx: AuthContext, feedback: WritingFeedback) -> None:
    """Best-effort: a logging failure must never break the feedback the learner is waiting on."""
    for c in feedback.corrections:
        if not (c.wrong.strip() and c.corrected.strip()):
            continue
        try:
            insert_mistake(
                ctx.db,
                {
                    "user_id": ctx.user.id,
                    "wrong_text": c.wrong,
                    "corrected_text": c.corrected,
                    "explanation_tr": c.explanation,
                    "topic_code": normalize_topic(c.grammar_topic),
                    "source": "writing",
                    "category": c.category,
                },
            )
        except Exception:
            logger.exception("Failed to log writing correction")
