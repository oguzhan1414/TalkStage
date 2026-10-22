from typing import Literal

from pydantic import BaseModel, Field, field_validator

from app.core.language import NATIVE_LANGUAGE_PATTERN


PERSONA_PATTERN = "^(student|corporate|tech|traveler|adult_hobby|service)$"
LEARNING_GOAL_PATTERN = "^(freeze_barrier|exams_school|work_career|travel_life|no_partner)$"
GENDER_PATTERN = "^(female|male|other)$"
AGE_RANGE_PATTERN = "^(u17|18_24|25_34|35_44|45_plus)$"

LearningSkill = Literal["speaking", "vocab", "reading", "listening", "writing"]


class LearningPlan(BaseModel):
    """What the learner wants on their Bugün path (migration 0031)."""

    preset: Literal["speaking", "balanced", "exam", "custom"]
    skills: list[LearningSkill] = Field(min_length=1, max_length=5)
    #: full = the topic-by-topic grammar path; mistakes = only short lessons suggested by their own
    #: mistakes; off = no grammar tasks at all.
    grammar_mode: Literal["full", "mistakes", "off"]

    @field_validator("skills")
    @classmethod
    def _unique_skills(cls, skills: list[str]) -> list[str]:
        return list(dict.fromkeys(skills))


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
    #: Onboarding'de isteğe bağlı alınır (boş olabilir).
    gender: str | None = None
    age_range: str | None = None
    #: null = plan not chosen yet (accounts from before the plan existed).
    learning_plan: LearningPlan | None = None
    onboarding_completed_at: str | None = None
    created_at: str
    updated_at: str

    @field_validator("learning_plan", mode="before")
    @classmethod
    def _tolerate_bad_plan(cls, value):
        # A malformed stored plan must never break GET /me: treat it as "not chosen".
        if value is None or isinstance(value, LearningPlan):
            return value
        try:
            return LearningPlan.model_validate(value)
        except Exception:
            return None


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
    #: Kişisel öğrenme planı ("Planımı düzenle").
    learning_plan: LearningPlan | None = None
