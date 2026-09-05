from pydantic import BaseModel, Field

Category = str  # "tech" | "career" | "visa" | "b2b" | "travel" | "daily"


class ScenarioObjective(BaseModel):
    text: str
    text_tr: str


class ScenarioKeyPhrase(BaseModel):
    en: str
    tr: str


class ScenarioVocabItem(BaseModel):
    term: str
    tr: str


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
    # Live Conversation Room's "İpuçları" (Ne Söyleyebilirsin?) guide card —
    # real, scene-specific content (not the old hardcoded/mismatched local list).
    ai_name: str | None = None
    ai_role: str | None = None
    situation: str | None = None
    objectives: list[ScenarioObjective] = Field(default_factory=list)
    key_phrases: list[ScenarioKeyPhrase] = Field(default_factory=list)
    suggested_vocab: list[ScenarioVocabItem] = Field(default_factory=list)
