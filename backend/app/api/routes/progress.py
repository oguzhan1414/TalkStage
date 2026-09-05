import logging
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import AuthContext, get_auth_context
from app.schemas.progress import GrammarMistakeCreate, GrammarMistakeOut, ProgressOut
from app.services.progress import record_progress, update_streak_and_xp

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/progress", tags=["progress"])

DAILY_TASK_XP = 8
DAILY_TASK_MINUTES = 5


@router.get("", response_model=list[ProgressOut])
def list_progress(limit: int = 90, ctx: AuthContext = Depends(get_auth_context)) -> list[ProgressOut]:
    """Daily practice log — backs the mobile Calendar/Streak screen."""
    result = (
        ctx.db.table("progress")
        .select("*")
        .eq("user_id", ctx.user.id)
        .order("practice_date", desc=True)
        .limit(limit)
        .execute()
    )
    return [ProgressOut(**row) for row in result.data]


@router.post("/log-practice", response_model=ProgressOut, status_code=201)
def log_practice(ctx: AuthContext = Depends(get_auth_context)) -> ProgressOut:
    """Generic 'meaningful practice happened today' signal."""
    is_first_today = record_progress(ctx, DAILY_TASK_MINUTES)
    if is_first_today:
        update_streak_and_xp(ctx, DAILY_TASK_XP)
    today = date.today().isoformat()
    row = (
        ctx.db.table("progress")
        .select("*")
        .eq("user_id", ctx.user.id)
        .eq("practice_date", today)
        .single()
        .execute()
        .data
    )
    return ProgressOut(**row)


@router.get("/mistakes", response_model=list[GrammarMistakeOut])
def list_grammar_mistakes(
    limit: int = 100, ctx: AuthContext = Depends(get_auth_context)
) -> list[GrammarMistakeOut]:
    """Returns the user's recorded grammar mistakes for the 'Hata Defterim' screen."""
    try:
        result = (
            ctx.db.table("grammar_mistakes")
            .select("*")
            .eq("user_id", ctx.user.id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return [GrammarMistakeOut(**row) for row in result.data]
    except Exception:
        # If table is not created yet or error, return empty list gracefully
        return []


@router.post("/mistakes", response_model=GrammarMistakeOut, status_code=status.HTTP_201_CREATED)
def record_grammar_mistake(
    payload: GrammarMistakeCreate, ctx: AuthContext = Depends(get_auth_context)
) -> GrammarMistakeOut:
    """Records a user's mistake from mini-quizzes, sentence-ordering, or chat."""
    try:
        data = {
            "user_id": ctx.user.id,
            "topic_code": payload.topic_code,
            "wrong_text": payload.wrong_text,
            "corrected_text": payload.corrected_text,
            "explanation_tr": payload.explanation_tr,
            "source": payload.source or "mini_quiz",
        }
        res = ctx.db.table("grammar_mistakes").insert(data).execute()
        if res.data and len(res.data) > 0:
            return GrammarMistakeOut(**res.data[0])
        return GrammarMistakeOut(
            id="temp-id",
            user_id=ctx.user.id,
            topic_code=payload.topic_code,
            wrong_text=payload.wrong_text,
            corrected_text=payload.corrected_text,
            explanation_tr=payload.explanation_tr,
            source=payload.source,
        )
    except Exception as exc:
        logger.exception("Failed to record grammar mistake")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record mistake",
        ) from exc


@router.delete("/mistakes/{mistake_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_grammar_mistake(
    mistake_id: str, ctx: AuthContext = Depends(get_auth_context)
) -> None:
    """Removes a cleared/learned mistake from the user's notebook."""
    try:
        ctx.db.table("grammar_mistakes").delete().eq("id", mistake_id).eq("user_id", ctx.user.id).execute()
    except Exception:
        pass

