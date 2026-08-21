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
