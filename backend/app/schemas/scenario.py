from pydantic import BaseModel

Category = str  # "tech" | "career" | "visa" | "b2b" | "travel" | "daily"


class ScenarioOut(BaseModel):
    # system_prompt is intentionally omitted — it's the LLM's internal instructions,
    # never sent to the client. The orchestrator reads it server-side by scenario id.
    id: str
    slug: str
    title: str
    category: Category
    description: str | None = None
    cefr_level: str | None = None
    estimated_minutes: int
    is_premium: bool
    cover_image_url: str | None = None
    sort_order: int
