from typing import Optional
from pydantic import BaseModel


class ProgressOut(BaseModel):
    id: str
    practice_date: str
    minutes_practiced: int
    scenarios_completed: int


class GrammarMistakeCreate(BaseModel):
    topic_code: Optional[str] = None
    wrong_text: str
    corrected_text: str
    explanation_tr: Optional[str] = None
    source: Optional[str] = "mini_quiz"


class GrammarMistakeOut(BaseModel):
    id: str
    user_id: str
    topic_code: Optional[str] = None
    wrong_text: str
    corrected_text: str
    explanation_tr: Optional[str] = None
    source: Optional[str] = "text_chat"
    created_at: Optional[str] = None

