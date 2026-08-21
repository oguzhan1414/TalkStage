from pydantic import BaseModel

from app.services.sm2 import Grade


class VocabCardOut(BaseModel):
    id: str
    term: str
    translation: str | None = None
    example_sentence: str | None = None
    source_scenario_id: str | None = None
    sm2_repetitions: int
    sm2_ease_factor: float
    sm2_interval_days: int
    next_review_date: str
    created_at: str


class VocabCardCreate(BaseModel):
    term: str
    translation: str | None = None
    example_sentence: str | None = None
    source_scenario_id: str | None = None


class VocabReviewRequest(BaseModel):
    grade: Grade
