from pydantic import BaseModel


class ReadingPassageOut(BaseModel):
    id: str
    scenario_id: str | None = None
    slug: str
    title: str
    body_text: str
    cefr_level: str | None = None
    estimated_minutes: int
    sort_order: int
