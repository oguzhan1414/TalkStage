from dataclasses import dataclass
from datetime import date, timedelta
from typing import Literal

Grade = Literal["again", "good", "easy"]

# Maps the 3-button mobile UI (Tekrar Gör / İyi / Kolay) onto the classic
# SM-2 0-5 quality scale.
_GRADE_QUALITY: dict[Grade, int] = {"again": 2, "good": 4, "easy": 5}

MIN_EASE_FACTOR = 1.3


@dataclass
class SM2State:
    repetitions: int
    ease_factor: float
    interval_days: int
    next_review_date: date


def review_card(
    repetitions: int,
    ease_factor: float,
    interval_days: int,
    grade: Grade,
    today: date | None = None,
) -> SM2State:
    """Classic SM-2 (SuperMemo 2) update, given the card's current state and a review grade."""
    today = today or date.today()
    quality = _GRADE_QUALITY[grade]

    if quality < 3:
        new_repetitions = 0
        new_interval = 1
    else:
        new_repetitions = repetitions + 1
        if new_repetitions == 1:
            new_interval = 1
        elif new_repetitions == 2:
            new_interval = 6
        else:
            new_interval = round(interval_days * ease_factor)

    new_ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    new_ease_factor = max(MIN_EASE_FACTOR, new_ease_factor)

    return SM2State(
        repetitions=new_repetitions,
        ease_factor=round(new_ease_factor, 2),
        interval_days=new_interval,
        next_review_date=today + timedelta(days=new_interval),
    )
