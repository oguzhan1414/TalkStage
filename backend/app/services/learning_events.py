"""Day-stamped learning events and the per-day activity behind the progress views.

Vocab reviews are logged here by the review endpoint; finished path steps and scenes come from the app
(POST /progress/events). Words added (vocab_cards.created_at) and practice minutes (progress) are already stored
elsewhere, so `daily_activity` reads them from there, which also gives them a history from before this log existed.
Writes are best effort: a missing table (migration 0037 not applied yet) must never break a review or a lesson.
"""

import logging
from datetime import datetime, timedelta

from app.api.deps import AuthContext
from app.core.clock import local_today, local_tz

logger = logging.getLogger(__name__)

EVENT_KINDS = {"vocab_review", "episode", "step", "scene"}


def log_event(ctx: AuthContext, kind: str, ref: str | None = None) -> None:
    """Writes one event for the learner's today. Path steps and scenes count once per day per ref."""
    if kind not in EVENT_KINDS:
        return
    today = local_today().isoformat()
    try:
        if ref and kind != "vocab_review":
            existing = (
                ctx.db.table("learning_events")
                .select("id")
                .eq("user_id", ctx.user.id)
                .eq("kind", kind)
                .eq("ref", ref)
                .eq("day", today)
                .limit(1)
                .execute()
                .data
            )
            if existing:
                return
        ctx.db.table("learning_events").insert({"user_id": ctx.user.id, "kind": kind, "ref": ref, "day": today}).execute()
    except Exception:  # noqa: BLE001 - progress tracking must never break the action that triggered it
        logger.warning("learning event %s not recorded", kind, exc_info=True)


def daily_activity(ctx: AuthContext, days: int) -> list[dict]:
    """One row per day for the last `days` days (oldest first), each source read where it is actually stored."""
    days = max(1, min(days, 120))
    today = local_today()
    start = today - timedelta(days=days - 1)
    rows = {
        (start + timedelta(days=i)).isoformat(): {
            "day": (start + timedelta(days=i)).isoformat(),
            "words_added": 0,
            "vocab_reviews": 0,
            "steps": 0,
            "scenes": 0,
            "minutes": 0,
        }
        for i in range(days)
    }

    try:
        events = (
            ctx.db.table("learning_events")
            .select("kind, day")
            .eq("user_id", ctx.user.id)
            .gte("day", start.isoformat())
            .execute()
            .data
        )
        for e in events:
            row = rows.get(str(e["day"])[:10])
            if not row:
                continue
            if e["kind"] == "vocab_review":
                row["vocab_reviews"] += 1
            elif e["kind"] in ("episode", "step"):
                row["steps"] += 1
            elif e["kind"] == "scene":
                row["scenes"] += 1
    except Exception:  # noqa: BLE001 - the table may not exist yet
        logger.warning("learning events not readable", exc_info=True)

    # Words added: the card's creation time, on the learner's local day.
    tz = local_tz()
    since = datetime.combine(start, datetime.min.time(), tzinfo=tz).isoformat()
    try:
        cards = ctx.db.table("vocab_cards").select("created_at").eq("user_id", ctx.user.id).gte("created_at", since).execute().data
        for c in cards:
            created = datetime.fromisoformat(str(c["created_at"]).replace("Z", "+00:00")).astimezone(tz).date().isoformat()
            if created in rows:
                rows[created]["words_added"] += 1
    except Exception:  # noqa: BLE001
        logger.warning("vocab cards not readable for activity", exc_info=True)

    try:
        practice = (
            ctx.db.table("progress")
            .select("practice_date, minutes_practiced")
            .eq("user_id", ctx.user.id)
            .gte("practice_date", start.isoformat())
            .execute()
            .data
        )
        for p in practice:
            row = rows.get(str(p["practice_date"])[:10])
            if row:
                row["minutes"] += int(p.get("minutes_practiced") or 0)
    except Exception:  # noqa: BLE001
        logger.warning("progress not readable for activity", exc_info=True)

    return list(rows.values())
