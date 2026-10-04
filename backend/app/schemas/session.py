from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, model_validator


class TranscriptTurn(BaseModel):
    role: Literal["user", "assistant"]
    text: str = Field(min_length=1, max_length=5_000)


class SessionEndRequest(BaseModel):
    scenario_id: str
    started_at: datetime
    ended_at: datetime
    transcript: list[TranscriptTurn] = Field(min_length=1, max_length=200)
    corrections_count: int = Field(default=0, ge=0, le=1_000)
    fluency_scores: list[int] = Field(default_factory=list, max_length=100)
    #: Per-turn WPM/avg_confidence, straight from Deepgram's own
    #: `transcript.final` metrics (see stt_stream.py) — real signals that
    #: were already computed live but never persisted past the turn. Backing
    #: the Scorecard's "pronunciation"/"speed" radar axes, which used to be
    #: fabricated from fluency_score with arbitrary multipliers.
    wpm_values: list[float] = Field(default_factory=list, max_length=100)
    confidence_values: list[float] = Field(default_factory=list, max_length=100)

    @model_validator(mode="after")
    def validate_session_bounds(self):
        if self.ended_at <= self.started_at:
            raise ValueError("ended_at must be after started_at")
        if (self.ended_at - self.started_at).total_seconds() > 6 * 60 * 60:
            raise ValueError("session duration is too long")
        if any(score < 0 or score > 100 for score in self.fluency_scores):
            raise ValueError("fluency scores must be between 0 and 100")
        if any(wpm < 0 or wpm > 400 for wpm in self.wpm_values):
            raise ValueError("wpm values out of plausible range")
        if any(conf < 0 or conf > 1 for conf in self.confidence_values):
            raise ValueError("confidence values must be between 0 and 1")
        return self


class SessionOut(BaseModel):
    id: str
    scenario_id: str
    started_at: str
    ended_at: str | None = None
    duration_seconds: int | None = None
    fluency_score: int | None = None
    unique_words_count: int
    corrections_count: int
    #: Null for sessions saved before this field existed — the client falls
    #: back to hiding the affected radar axis rather than guessing.
    avg_wpm: float | None = None
    avg_pronunciation_confidence: float | None = None
    user_turns_count: int = 0
    created_at: str
