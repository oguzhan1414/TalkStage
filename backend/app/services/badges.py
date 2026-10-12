"""Rozet (başarı) değerlendirmesi — tamamen sunucuda, DB'deki gerçek verilerden.

Kaynaklar: `learning_flags` (sahne/podcast/ders/telaffuz bayrakları, cihazlardan senkronlanır), `vocab_cards`,
`reading_progress`, `sessions`, `chat_memory.session_count`, `profiles` (seri, seviye). Her rozet (current, target)
döndürür; current >= target ise kazanılmıştır. Kazanılan rozet kalıcıdır (user_badges), koşul sonradan bozulsa da gitmez.

Rozet seti 16 rozete indirildi (2026-10-11); eski id'ler (zero_freeze, star_collector, early_bird …) veritabanında kalabilir, listelenmez.
"""
import logging
from dataclasses import dataclass
from datetime import date, datetime

logger = logging.getLogger(__name__)

LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]

@dataclass(frozen=True)
class BadgeDef:
    id: str
    target: int


BADGE_DEFS: list[BadgeDef] = [
    BadgeDef("first_mic", 1),
    BadgeDef("vocab_hunter", 100),
    BadgeDef("pronunciation_prodigy", 20),
    BadgeDef("7day_flame", 7),
    BadgeDef("30day_master", 30),
    BadgeDef("100day_legend", 100),
    BadgeDef("perfect_take", 1),
    BadgeDef("mivo_friend", 5),
    BadgeDef("bookworm", 5),
    BadgeDef("podcast_fan", 10),
    BadgeDef("lesson_graduate", 10),
    BadgeDef("level_a2", 1),
    BadgeDef("level_b1", 1),
    BadgeDef("level_b2", 1),
    BadgeDef("level_c1", 1),
    BadgeDef("level_c2", 1),
]
BADGE_IDS = {b.id for b in BADGE_DEFS}


def _rows(db, table: str, columns: str, user_id: str, limit: int = 5000) -> list[dict]:
    try:
        return db.table(table).select(columns).eq("user_id", user_id).limit(limit).execute().data or []
    except Exception:
        logger.warning("badges: could not read %s", table, exc_info=True)
        return []


def _day(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).date()
    except ValueError:
        return None


def gather_stats(db, user_id: str) -> dict:
    flags = _rows(db, "learning_flags", "flag_key,created_at", user_id)
    vocab = _rows(db, "vocab_cards", "created_at", user_id)
    reading = _rows(db, "reading_progress", "completed_at", user_id)
    try:
        sessions = db.table("sessions").select("id", count="exact").eq("user_id", user_id).limit(1).execute().count or 0
    except Exception:
        sessions = 0
    memory = _rows(db, "chat_memory", "session_count", user_id, limit=1)
    try:
        profile = (
            db.table("profiles").select("longest_streak,streak_count,cefr_level").eq("id", user_id).limit(1).execute().data
            or []
        )
    except Exception:
        logger.warning("badges: could not read profile", exc_info=True)
        profile = []
    return {"flags": flags, "vocab": vocab, "reading": reading, "sessions": sessions, "memory": memory, "profile": profile}


def _flag_ids(flags: list[dict], prefix: str) -> set[str]:
    return {f["flag_key"][len(prefix):] for f in flags if f["flag_key"].startswith(prefix)}


def evaluate(stats: dict, *, after_activity: bool, local_hour: int | None) -> dict[str, int]:
    """Her rozet için `current` değeri (target ile kıyaslanır)."""
    flags = stats["flags"]
    completed = _flag_ids(flags, "scene_completed_")
    star2 = _flag_ids(flags, "scene_star2_")
    star3 = _flag_ids(flags, "scene_star3_")
    played = completed | star2 | star3
    profile = (stats["profile"] or [{}])[0]
    longest_streak = max(int(profile.get("longest_streak") or 0), int(profile.get("streak_count") or 0))
    level = (profile.get("cefr_level") or "A1").upper()
    level_idx = LEVELS.index(level) if level in LEVELS else 0
    memory_sessions = int((stats["memory"] or [{}])[0].get("session_count") or 0)
    any_activity = bool(played or stats["sessions"] or memory_sessions)

    # `after_activity` / `local_hour` are accepted for API compatibility; the time-of-day badges were retired.
    return {
        "first_mic": 1 if any_activity else 0,
        "vocab_hunter": len(stats["vocab"]),
        "pronunciation_prodigy": len(_flag_ids(flags, "pron_practiced_")),
        "7day_flame": longest_streak,
        "30day_master": longest_streak,
        "100day_legend": longest_streak,
        "perfect_take": min(1, len(star3)),
        "mivo_friend": memory_sessions,
        "bookworm": len(stats["reading"]),
        "podcast_fan": len(_flag_ids(flags, "podcast_completed_")),
        "lesson_graduate": len(_flag_ids(flags, "lesson_quiz_done_")),
        # Seviye rozetleri yalnızca en az bir etkinlik yapıldıktan sonra (yerleştirme testi tek başına vermesin).
        "level_a2": 1 if any_activity and level_idx >= 1 else 0,
        "level_b1": 1 if any_activity and level_idx >= 2 else 0,
        "level_b2": 1 if any_activity and level_idx >= 3 else 0,
        "level_c1": 1 if any_activity and level_idx >= 4 else 0,
        "level_c2": 1 if any_activity and level_idx >= 5 else 0,
    }
