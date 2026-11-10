import logging

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import AuthContext, get_auth_context
from app.core.clock import local_today
from app.schemas.progress import DailyActivityOut, GrammarMistakeCreate, GrammarMistakeOut, LearningEventIn, ProgressOut
from app.services.learning_events import EVENT_KINDS, daily_activity, log_event
from app.services.progress import award_xp, record_progress, update_streak_and_xp
from app.services.scorecard import ACTIVITY_XP, FIRST_PRACTICE_BONUS_XP

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/progress", tags=["progress"])

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
    """One completed activity: logs today's practice and pays ACTIVITY_XP every time
    (+ a small hidden bonus and the streak update on the first practice of the day)."""
    is_first_today = record_progress(ctx, DAILY_TASK_MINUTES)
    if is_first_today:
        update_streak_and_xp(ctx, ACTIVITY_XP + FIRST_PRACTICE_BONUS_XP)
    else:
        award_xp(ctx, ACTIVITY_XP)
    today = local_today().isoformat()
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



@router.post("/events", status_code=status.HTTP_204_NO_CONTENT)
def record_learning_event(payload: LearningEventIn, ctx: AuthContext = Depends(get_auth_context)) -> None:
    """A finished path step or scene, for the progress views (no XP: that comes from /log-practice)."""
    if payload.kind not in EVENT_KINDS or payload.kind == "vocab_review":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown event kind")
    log_event(ctx, payload.kind, (payload.ref or "")[:120] or None)


@router.get("/activity", response_model=list[DailyActivityOut])
def get_daily_activity(days: int = 28, ctx: AuthContext = Depends(get_auth_context)) -> list[DailyActivityOut]:
    """Per-day activity for the last `days` days, oldest first: words added, vocab reviews, path steps, scenes,
    practice minutes. Backs the Kelimeler tab's "Bu hafta" and the profile's "Gelişimim"."""
    return [DailyActivityOut(**row) for row in daily_activity(ctx, days)]
