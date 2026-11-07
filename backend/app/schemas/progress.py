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
    #: grammar | vocabulary | register | spelling | pronunciation (migration 0031); null for older rows.
    category: Optional[str] = None
    created_at: Optional[str] = None



class LearningEventIn(BaseModel):
    """One finished thing from the app: a path step ('episode' for a story episode, 'step' for any other) or a scene."""

    kind: str
    ref: Optional[str] = None


class DailyActivityOut(BaseModel):
    day: str
    words_added: int
    vocab_reviews: int
    steps: int
    scenes: int
    minutes: int
