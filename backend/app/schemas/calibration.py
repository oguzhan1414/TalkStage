from pydantic import BaseModel


class CalibrationAnswerResult(BaseModel):
    question_index: int
    transcript: str


class CalibrationResult(BaseModel):
    cefr_level: str
    summary_tr: str
    reasons: list[str]
    answers: list[CalibrationAnswerResult]
