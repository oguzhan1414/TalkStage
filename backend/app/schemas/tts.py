from pydantic import BaseModel, Field


class PronounceRequest(BaseModel):
    text: str = Field(min_length=1, max_length=1500)
    language: str | None = Field(default=None, description="Language code: 'en', 'tr', or None for auto-detect")
