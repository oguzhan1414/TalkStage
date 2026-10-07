from datetime import date, datetime, timezone

from supabase import Client

from app.core.config import settings

FREE_DAILY_SESSION_LIMIT = 1
FREE_SESSION_MAX_SECONDS = 5 * 60

_ENTITLED_STATUSES = {"active", "trial"}


def is_pro(db: Client, user_id: str) -> bool:
    # Testing-only bypass (TEST_MODE_UNLIMITED=true) — see config.py. Short-
    # circuits both of this function's callers in ws_session.py: the daily
    # quota check (can_start_session below) and the 5-minute free-session
    # timer (only scheduled when `not user_is_pro`).
    if settings.test_mode_unlimited:
        return True
    rows = db.table("subscriptions").select("status, current_period_end").eq("user_id", user_id).execute().data
    if not rows:
        return False
    row = rows[0]
    # `cancelled` = otomatik yenileme kapatıldı, ödenen dönem bitene kadar hak sürer.
    if row["status"] == "cancelled":
        if row["current_period_end"] is None:
            return False
    elif row["status"] not in _ENTITLED_STATUSES:
        return False
    if row["current_period_end"] is None:
        return True
    return datetime.fromisoformat(row["current_period_end"]) > datetime.now(timezone.utc)


def free_sessions_used_today(db: Client, user_id: str) -> int:
    today_start = f"{date.today().isoformat()}T00:00:00"
    result = (
        db.table("sessions")
        .select("id", count="exact")
        .eq("user_id", user_id)
        .gte("started_at", today_start)
        .execute()
    )
    return result.count or 0


def can_start_session(db: Client, user_id: str) -> bool:
    """Enforces the plan's freemium rule: 1 free voice scenario/day, unlimited for
    active/trial subscribers. (The other free-tier promise — unlimited vocab review
    and reading — needs no gating since it's already effectively free to serve.)"""
    if is_pro(db, user_id):
        return True
    return free_sessions_used_today(db, user_id) < FREE_DAILY_SESSION_LIMIT
