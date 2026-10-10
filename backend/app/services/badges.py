"""Rozet (başarı) değerlendirmesi — tamamen sunucuda, DB'deki gerçek verilerden.

Kaynaklar: `learning_flags` (sahne/podcast/ders/telaffuz bayrakları, cihazlardan senkronlanır), `vocab_cards`,
`reading_progress`, `sessions`, `chat_memory.session_count`, `profiles` (seri, seviye). Her rozet (current, target)
döndürür; current >= target ise kazanılmıştır. Kazanılan rozet kalıcıdır (user_badges), koşul sonradan bozulsa da gitmez.

İki rozet zaman-olay tabanlıdır (Early Bird, Night Owl): yalnızca bir etkinlikten hemen sonra istemcinin yolladığı
yerel saatle (`after_activity` + `local_hour`) verilir. Küçük bir güven varsayımı; rozetler parasal değer taşımıyor.
"""
import logging
from dataclasses import dataclass
from datetime import date, datetime

logger = logging.getLogger(__name__)

LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]

# Video sahnelerin kategorileri (packages/shared-data/scenariosData.ts ile aynı tutulmalı).
TRAVEL_SCENES = {
    "airport-travel", "hotel-checkin", "taxi-ride", "train-ticket", "street-directions",
    "istanbul-tour", "car-rental", "airport-transit-trouble",
}
CAREER_SCENES = {"job-interview", "colleague-break"}  # Kariyer rozeti: ikisini de bitir
BARGAIN_SCENE = "flea-market"


@dataclass(frozen=True)
class BadgeDef:
    id: str
    target: int


BADGE_DEFS: list[BadgeDef] = [
    BadgeDef("first_mic", 1),
    BadgeDef("zero_freeze", 1),
    BadgeDef("vocab_hunter", 100),
    BadgeDef("pronunciation_prodigy", 20),
    BadgeDef("visa_approved", 3),  # Gezgin
    BadgeDef("negotiator", 1),
    BadgeDef("standup_hero", 2),  # Kariyer
    BadgeDef("7day_flame", 7),
    BadgeDef("30day_master", 30),
    BadgeDef("100day_legend", 100),
    BadgeDef("early_bird", 1),
    BadgeDef("night_owl", 1),
    BadgeDef("star_collector", 15),
    BadgeDef("perfect_take", 1),
    BadgeDef("mivo_friend", 5),
    BadgeDef("bookworm", 5),
    BadgeDef("podcast_fan", 10),
    BadgeDef("lesson_graduate", 10),
    BadgeDef("full_day", 1),
    BadgeDef("level_a1", 1),
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
    stars_total = sum(3 if sid in star3 else 2 if sid in star2 else 1 for sid in played)
    profile = (stats["profile"] or [{}])[0]
    longest_streak = max(int(profile.get("longest_streak") or 0), int(profile.get("streak_count") or 0))
    level = (profile.get("cefr_level") or "A1").upper()
    level_idx = LEVELS.index(level) if level in LEVELS else 0
    memory_sessions = int((stats["memory"] or [{}])[0].get("session_count") or 0)
    any_activity = bool(played or stats["sessions"] or memory_sessions)

    # "Tam Gün": aynı (UTC) günde bir sahne + bir kelime + bir ders/podcast/okuma.
    scene_days = {_day(f["created_at"]) for f in flags if f["flag_key"].startswith("scene_")}
    study_days = {
        _day(f["created_at"])
        for f in flags
        if f["flag_key"].startswith(("podcast_completed_", "lesson_quiz_done_"))
    } | {_day(r.get("completed_at")) for r in stats["reading"]}
    word_days = {_day(v["created_at"]) for v in stats["vocab"]}
    full_day = bool((scene_days & word_days & study_days) - {None})

    hour = local_hour if after_activity and local_hour is not None else None
    return {
        "first_mic": 1 if any_activity else 0,
        "zero_freeze": min(1, len(star2 | star3)),
        "vocab_hunter": len(stats["vocab"]),
        "pronunciation_prodigy": len(_flag_ids(flags, "pron_practiced_")),
        "visa_approved": len(played & TRAVEL_SCENES),
        "negotiator": 1 if (BARGAIN_SCENE in star2 or BARGAIN_SCENE in star3) else 0,
        "standup_hero": len(played & CAREER_SCENES),
        "7day_flame": longest_streak,
        "30day_master": longest_streak,
        "100day_legend": longest_streak,
        "early_bird": 1 if hour is not None and hour < 9 else 0,
        "night_owl": 1 if hour is not None and hour >= 21 else 0,
        "star_collector": stars_total,
        "perfect_take": min(1, len(star3)),
        "mivo_friend": memory_sessions,
        "bookworm": len(stats["reading"]),
        "podcast_fan": len(_flag_ids(flags, "podcast_completed_")),
        "lesson_graduate": len(_flag_ids(flags, "lesson_quiz_done_")),
        "full_day": 1 if full_day else 0,
        # Seviye rozetleri yalnızca en az bir etkinlik yapıldıktan sonra (yerleştirme testi tek başına vermesin).
        "level_a1": 1 if any_activity else 0,
        "level_a2": 1 if any_activity and level_idx >= 1 else 0,
        "level_b1": 1 if any_activity and level_idx >= 2 else 0,
        "level_b2": 1 if any_activity and level_idx >= 3 else 0,
        "level_c1": 1 if any_activity and level_idx >= 4 else 0,
        "level_c2": 1 if any_activity and level_idx >= 5 else 0,
    }
