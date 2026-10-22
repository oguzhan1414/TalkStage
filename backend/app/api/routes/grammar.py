import asyncio
import logging
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context
from app.services.grammar_check import GrammarCheckResult, check_grammar_answer_sync
from app.services.usage_guard import rate_limit

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/grammar", tags=["grammar"])


class GrammarCheckRequest(BaseModel):
    lesson_code: str = Field(min_length=1, max_length=40)
    lesson_title: str = Field(min_length=1, max_length=120)
    target: str = Field(min_length=1, max_length=300)
    task: str = Field(min_length=1, max_length=600)
    expected: str = Field(default="", max_length=600)
    answer: str = Field(min_length=1, max_length=600)
    mode: Literal["text", "spoken"] = "text"


@router.post("/check", response_model=GrammarCheckResult, dependencies=[Depends(rate_limit("grammar_check", 30))])
async def check_grammar_answer(payload: GrammarCheckRequest, ctx: AuthContext = Depends(get_auth_context)) -> GrammarCheckResult:
    """Judges one grammar-lesson exercise answer the device could not decide locally (typed or transcribed)."""
    try:
        profile = ctx.db.table("profiles").select("cefr_level, native_language").eq("id", ctx.user.id).single().execute().data
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found") from exc

    try:
        return await asyncio.to_thread(
            check_grammar_answer_sync,
            lesson_title=payload.lesson_title,
            target=payload.target,
            task=payload.task,
            expected=payload.expected,
            answer=payload.answer,
            mode=payload.mode,
            level=(profile.get("cefr_level") or "A2"),
            native=(profile.get("native_language") or "tr"),
        )
    except Exception as exc:  # model/network failure at an external service boundary
        logger.exception("grammar check failed")
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="grammar_check_unavailable") from exc
