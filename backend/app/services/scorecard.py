import re
from dataclasses import dataclass
from datetime import date, timedelta

from app.schemas.session import TranscriptTurn

_WORD_RE = re.compile(r"[a-zA-Z']+")


def count_unique_words(transcript: list[TranscriptTurn]) -> int:
    """Unique words the learner used — assistant turns don't count towards fluency."""
    words = set()
    for turn in transcript:
        if turn.role != "user":
            continue
        words.update(w.lower() for w in _WORD_RE.findall(turn.text))
    return len(words)


def average_fluency_score(scores: list[int]) -> int | None:
    if not scores:
        return None
    return round(sum(scores) / len(scores))


def average_float(values: list[float], ndigits: int = 1) -> float | None:
    """Same shape as average_fluency_score but for wpm/confidence, which
    aren't meaningfully rounded to whole numbers."""
    if not values:
        return None
    return round(sum(values) / len(values), ndigits)


def count_user_turns(transcript: list[TranscriptTurn]) -> int:
    """Denominator for an honest grammar-accuracy ratio (correct turns /
    total turns) instead of an arbitrary `100 - corrections*7` formula."""
    return sum(1 for turn in transcript if turn.role == "user")


#: Flat XP for reviewing a vocab card (any grade) — rewards daily engagement
#: with the SM-2 queue independently of session-based XP.
VOCAB_REVIEW_XP = 2

#: Flat XP for finishing a reading passage's scenes + speaking step, awarded
#: once (the mobile completion celebration displays this same number, so it
#: must actually be granted rather than just shown).
READING_COMPLETION_XP = 15


def calculate_session_xp(fluency_score: int | None) -> int:
    """10 XP for finishing a scenario, plus up to 10 more scaled by fluency."""
    return 10 + round((fluency_score or 0) / 10)


@dataclass
class StreakUpdate:
    streak_count: int
    longest_streak: int
    last_practice_date: date


def next_streak_state(
    current_streak: int,
    longest_streak: int,
    last_practice_date: date | None,
    today: date | None = None,
) -> StreakUpdate:
    today = today or date.today()

    if last_practice_date == today:
        new_streak = current_streak  # already practiced today, no double-count
    elif last_practice_date == today - timedelta(days=1):
        new_streak = current_streak + 1
    else:
        new_streak = 1  # gap in practice, or first ever session

    return StreakUpdate(
        streak_count=new_streak,
        longest_streak=max(longest_streak, new_streak),
        last_practice_date=today,
    )
