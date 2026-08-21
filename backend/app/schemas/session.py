from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class TranscriptTurn(BaseModel):
    role: Literal["user", "assistant"]
    text: str


class SessionEndRequest(BaseModel):
    scenario_id: str
    started_at: datetime
    ended_at: datetime
    transcript: list[TranscriptTurn]
    corrections_count: int = 0
    fluency_scores: list[int] = Field(default_factory=list)


class SessionOut(BaseModel):
    id: str
    scenario_id: str
    started_at: str
    ended_at: str | None = None
    duration_seconds: int | None = None
    fluency_score: int | None = None
    unique_words_count: int
    corrections_count: int
    created_at: str
