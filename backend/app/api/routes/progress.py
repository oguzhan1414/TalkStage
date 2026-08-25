from datetime import date

from fastapi import APIRouter, Depends

from app.api.deps import AuthContext, get_auth_context
from app.schemas.progress import ProgressOut
from app.services.progress import record_progress, update_streak_and_xp

router = APIRouter(prefix="/progress", tags=["progress"])

# Flat reward for the Study Path's daily writing task — deliberately smaller
# than a real voice session (`calculate_session_xp`) since there's no
# fluency grading here, just "did something happen today".
DAILY_TASK_XP = 8
DAILY_TASK_MINUTES = 5


@router.get("", response_model=list[ProgressOut])
def list_progress(limit: int = 90, ctx: AuthContext = Depends(get_auth_context)) -> list[ProgressOut]:
    """Daily practice log — backs the mobile Calendar/Streak screen (Görev 15).
    Written by `POST /sessions/end`, was never exposed for reading until now."""
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
    """Generic 'meaningful practice happened today' signal for activities that
    don't go through `/sessions/end` — currently the Study Path's daily
    writing task (see mobile `TextChatScreen`'s `dailyTask` flow). Without
    this, only voice sessions ever counted toward the streak/calendar, so a
    day spent entirely on a writing task would wrongly show as 'missed'.
    Idempotent per day: only the first call of the day awards XP/extends the
    streak — reopening today's already-done task just returns the same row.
    """
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
