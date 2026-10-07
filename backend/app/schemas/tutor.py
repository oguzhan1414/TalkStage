from typing import Literal
from pydantic import BaseModel, Field


class TutorCorrection(BaseModel):
    has_error: bool = Field(
        description="True if the user made an error in grammar, vocabulary, or polite register/context."
    )
    user_said: str | None = Field(
        default=None,
        description="The flawed phrase or sentence the user wrote/said, or null if no error."
    )
    corrected: str | None = Field(
        default=None,
        description="The natural, grammatically correct English version, or null if no error."
    )
    explanation_tr: str | None = Field(
        default=None,
        description="Warm, patient, encouraging explanation, written in the learner's native language, of why this correction is better. Never clinical or harsh."
    )
    category: str | None = Field(
        default=None,
        description="Category: 'grammar', 'vocabulary', 'register', or 'pronunciation'."
    )


class TutorTurnResponse(BaseModel):
    spoken_reply_en: str = Field(
        description="Maya's spoken English response. Natural, engaging, appropriate for learner's level (1-2 sentences)."
    )
    reply_tr_hint: str = Field(
        description="Translation or intuitive gist (in the learner's native language) of the English phrase being practiced, to help the learner understand."
    )
    correction: TutorCorrection = Field(
        description="Immediate analysis of the user's input with warm feedback if needed."
    )
    coach_tip_tr: str | None = Field(
        default=None,
        description="Proactive micro-coaching tip, in the learner's native language, whispering in the student's ear what to say or try next."
    )
    fluency_score: int = Field(
        default=85,
        ge=0,
        le=100,
        description="Overall confidence/fluency score of user's turn (0-100)."
    )
    suggested_replies: list[str] = Field(
        default_factory=list,
        description="2-3 short (3-8 word) example replies in English answering Maya's question."
    )
    suggested_replies_tr: list[str] = Field(
        default_factory=list,
        description="Translation of each suggested_replies entry into the learner's native language, same order and length."
    )
    is_task_complete: bool = Field(
        default=False,
        description="True if all scenario/lesson objectives have been successfully met or turn cap reached."
    )
    summary_tr: str | None = Field(
        default=None,
        description="Short, encouraging summary (in the learner's native language) of user's performance if task is completed."
    )

    # Dynamic properties for backward compatibility with existing ChatMessageResponse clients
    @property
    def reply_en(self) -> str:
        return self.spoken_reply_en

    @property
    def is_completed(self) -> bool:
        return self.is_task_complete

    @property
    def completion_summary_tr(self) -> str | None:
        return self.summary_tr


class TutorTurnRequest(BaseModel):
    history: list[dict] = Field(default_factory=list)
    user_input: str
    cefr_level: str = "A1"
    lesson_type: Literal["daily_lesson", "roleplay", "free_chat", "grammar_drill", "placement"] = "daily_lesson"
    task_goal: str | None = None
    # True for a real Study Path / focusTopic mission — turns on the turn-cap
    # pacing and forced completion. False for a soft `topic_context` anchor
    # or fully free chat, which `task_goal` alone can't distinguish (both can
    # set it) but which must stay unlimited/low-pressure. Defaults to True
    # (the original, always-paced behavior) so direct `/tutor/turn` callers
    # that don't know this field exists get the same pacing they always did;
    # `text_chat.py` is the only caller that deliberately opts out.
    is_strict_mission: bool = True
    target_grammar_rule: str | None = None
    display_name: str | None = None
    #: Önceki serbest sohbetlerden hafıza özeti (services/chat_memory.py). Kullanıcı kaynaklı veri.
    memory_context: str | None = None
    #: Öğrenenin ana dili (profiles.native_language) — açıklamaların dili.
    native_language: str = "tr"
    turn_index: int = 1
    max_turns: int = 4
