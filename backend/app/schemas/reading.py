from pydantic import BaseModel


class ReadingScene(BaseModel):
    title: str
    image_key: str
    sentence_en: str
    sentence_tr: str


class ReadingQuizQuestion(BaseModel):
    question: str
    options: list[str]
    correct_index: int


class ReadingSpeakingPrompt(BaseModel):
    yanki_ask: str
    expected_answer: str


class ReadingPassageOut(BaseModel):
    id: str
    scenario_id: str | None = None
    slug: str
    title: str
    body_text: str
    cefr_level: str | None = None
    estimated_minutes: int
    sort_order: int
    scenes: list[ReadingScene] = []
    quiz: list[ReadingQuizQuestion] = []
    speaking_prompt: ReadingSpeakingPrompt | None = None
