from pydantic import BaseModel, Field


class ProfileOut(BaseModel):
    id: str
    display_name: str | None = None
    cefr_level: str | None = None
    interests: list[str] = Field(default_factory=list)
    streak_count: int = 0
    longest_streak: int = 0
    last_practice_date: str | None = None
    xp: int = 0
    avatar_id: str | None = None
    created_at: str
    updated_at: str


class ProfileUpdate(BaseModel):
    display_name: str | None = None
    cefr_level: str | None = Field(default=None, pattern="^(A1|A2|B1|B2|C1|C2)$")
    interests: list[str] | None = None
    avatar_id: str | None = Field(
        default=None,
        pattern="^(dev|lead|traveler|designer|engineer|entrepreneur)$",
    )
