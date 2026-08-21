from pydantic import BaseModel, Field


class PronounceRequest(BaseModel):
    text: str = Field(min_length=1, max_length=200)
