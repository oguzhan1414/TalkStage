"""Who may open which voice room (the free plan), and the usage record behind it.

Free plan (decided 2026-11-01):
  * free_chat  - Mivo free chat: one trial per account, ever
  * scene      - a voice scene from the Scenes tab: one a day
  * path_scene - the unit-end scene of the learning path: one a day, separate from the Scenes allowance
  * live       - the live room: Pro only
Pro has no per-kind limit; everyone shares the daily voice-minute cost guard (usage_guard.DAILY_VOICE_SECONDS).

A room counts once it lasted COUNTS_AFTER_SECONDS or the learner spoke, so a dropped connection does not use the
allowance. Lookups fail open: a database problem (or the 0033 migration not run yet) never locks a learner out.
"""
import logging
from typing import Literal

from supabase import Client

from app.core.clock import local_today

logger = logging.getLogger(__name__)

Kind = Literal["free_chat", "scene", "path_scene", "live"]

FREE_CHAT_TRIALS = 1
FREE_SCENES_PER_DAY = 1
FREE_PATH_SCENES_PER_DAY = 1
COUNTS_AFTER_SECONDS = 60

# Close reasons the app turns into an offer (FreeChatRoomScreen / LiveConversationRoomScreen).
REASONS: dict[Kind, str] = {
    "free_chat": "free_chat_trial_used",
    "scene": "daily_scene_used",
    "path_scene": "daily_path_scene_used",
    "live": "pro_only",
}


def _count(db: Client, user_id: str, kind: Kind, today_only: bool) -> int:
    query = db.table("voice_usage").select("id", count="exact").eq("user_id", user_id).eq("kind", kind)
    if today_only:
        query = query.eq("local_day", local_today().isoformat())
    return query.limit(1).execute().count or 0


def free_block_reason(db: Client, user_id: str, kind: Kind) -> str | None:
    """None when a free learner may open this room now, otherwise the close reason."""
    if kind == "live":
        return REASONS["live"]
    try:
        if kind == "free_chat":
            used, allowed = _count(db, user_id, kind, today_only=False), FREE_CHAT_TRIALS
        elif kind == "scene":
            used, allowed = _count(db, user_id, kind, today_only=True), FREE_SCENES_PER_DAY
        else:
            used, allowed = _count(db, user_id, kind, today_only=True), FREE_PATH_SCENES_PER_DAY
    except Exception:
        logger.warning("voice_usage lookup failed; allowing the room", exc_info=True)
        return None
    return REASONS[kind] if used >= allowed else None


def record_voice_usage(db: Client, user_id: str, kind: Kind, seconds: float, turns: int, pro: bool) -> None:
    """Writes the room to voice_usage when it counts (long enough, or the learner spoke). Best effort."""
    if seconds < COUNTS_AFTER_SECONDS and turns <= 0:
        return
    try:
        db.table("voice_usage").insert(
            {
                "user_id": user_id,
                "kind": kind,
                "local_day": local_today().isoformat(),
                "seconds": int(seconds),
                "turns": int(turns),
                "pro": pro,
            }
        ).execute()
    except Exception:
        logger.warning("voice_usage insert failed", exc_info=True)


def learner_turns(history) -> int:
    return sum(1 for m in history or [] if getattr(m, "role", None) == "user")
