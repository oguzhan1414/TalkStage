from pydantic import BaseModel, Field

from app.schemas.profile import LEARNING_GOAL_PATTERN, PERSONA_PATTERN


class OnboardingCompleteRequest(BaseModel):
    """Single atomic payload for the new 8-step onboarding flow (V2.0) — fired
    once, from the 'AI Plan Hazırlığı' (Magic Moment) screen, instead of each
    of the 8 screens hitting the network independently."""

    display_name: str = Field(min_length=1, max_length=60)
    persona_id: str = Field(pattern=PERSONA_PATTERN)
    learning_goal: str = Field(pattern=LEARNING_GOAL_PATTERN)
    cefr_level: str = Field(pattern="^(A1|A2|B1|B2|C1|C2)$")
    daily_target_minutes: int = Field(ge=1, le=180)
