from pydantic import BaseModel, Field

from app.core.language import NATIVE_LANGUAGE_PATTERN


PERSONA_PATTERN = "^(student|corporate|tech|traveler|adult_hobby|service)$"
LEARNING_GOAL_PATTERN = "^(freeze_barrier|exams_school|work_career|travel_life|no_partner)$"


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
    persona_id: str | None = None
    learning_goal: str | None = None
    daily_target_minutes: int = 10
    study_days: list[int] | None = None
    native_language: str = "tr"
    onboarding_completed_at: str | None = None
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
    persona_id: str | None = Field(default=None, pattern=PERSONA_PATTERN)
    learning_goal: str | None = Field(default=None, pattern=LEARNING_GOAL_PATTERN)
    daily_target_minutes: int | None = Field(default=None, ge=1, le=180)
    #: Haftanın hangi günlerinde çalışma planlandığı (0=Pazartesi..6=Pazar).
    #: Takvim ekranının düzenlenebilir plan özelliği için — boş liste veya
    #: null, "plan seçilmedi" demektir ve hiçbir günü "planlandı" göstermez.
    study_days: list[int] | None = Field(default=None)
    #: Arayüz + açıklama dili (tr/en/es/pt/de).
    native_language: str | None = Field(default=None, pattern=NATIVE_LANGUAGE_PATTERN)
