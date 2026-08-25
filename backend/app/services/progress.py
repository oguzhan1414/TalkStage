from datetime import date

from app.api.deps import AuthContext
from app.services.scorecard import next_streak_state


def record_progress(ctx: AuthContext, duration_minutes: int) -> bool:
    """Upserts today's practice row. Returns True if this was the first
    practice logged today, so callers can gate one-time daily rewards."""
    today = date.today().isoformat()
    existing = (
        ctx.db.table("progress")
        .select("*")
        .eq("user_id", ctx.user.id)
        .eq("practice_date", today)
        .execute()
        .data
    )
    if existing:
        row = existing[0]
        ctx.db.table("progress").update(
            {
                "minutes_practiced": row["minutes_practiced"] + duration_minutes,
                "scenarios_completed": row["scenarios_completed"] + 1,
            }
        ).eq("id", row["id"]).execute()
        return False
    ctx.db.table("progress").insert(
        {
            "user_id": ctx.user.id,
            "practice_date": today,
            "minutes_practiced": duration_minutes,
            "scenarios_completed": 1,
        }
    ).execute()
    return True


def update_streak_and_xp(ctx: AuthContext, xp_gained: int) -> None:
    profile = ctx.db.table("profiles").select("*").eq("id", ctx.user.id).single().execute().data
    last_practice_date = (
        date.fromisoformat(profile["last_practice_date"]) if profile["last_practice_date"] else None
    )
    new_state = next_streak_state(
        current_streak=profile["streak_count"],
        longest_streak=profile["longest_streak"],
        last_practice_date=last_practice_date,
    )
    ctx.db.table("profiles").update(
        {
            "streak_count": new_state.streak_count,
            "longest_streak": new_state.longest_streak,
            "last_practice_date": new_state.last_practice_date.isoformat(),
            "xp": profile["xp"] + xp_gained,
        }
    ).eq("id", ctx.user.id).execute()
