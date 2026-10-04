from typing import Literal

from pydantic import BaseModel, Field, field_validator


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2_000)


class ChatMessageRequest(BaseModel):
    # Client keeps the running conversation locally and resends it each turn —
    # no server-side chat session/table for this lightweight daily-practice mode.
    history: list[ChatTurn] = Field(default_factory=list, max_length=40)
    message: str = Field(min_length=1, max_length=2_000)
    # Optional roleplay instruction for Study Path daily tasks (e.g. "You are
    # playing Barista Mert in a cafe..."). Resent every turn since nothing is
    # persisted server-side — without it the model only has generic "Yankı"
    # framing and won't actually stay in character.
    role_context: str | None = Field(default=None, max_length=2_000)
    # Curriculum grammar topic this chat is practicing (e.g. "A1_G01"), if
    # any — used purely for attribution when a correction gets logged to
    # `grammar_mistakes`, has no effect on the model's behavior.
    topic_code: str | None = Field(default=None, max_length=64)
    # Soft topic anchor for the free-form "Günlük Sohbet" mode (e.g. "Weekend
    # plans and free time activities") — unlike `role_context`, this never
    # triggers the strict mission/turn-cap rules, it's just something for the
    # model to naturally open with and drift back to if the chat stalls.
    # Mutually exclusive with `role_context` in practice (a Study Path
    # mission already has its own goals).
    topic_context: str | None = Field(default=None, max_length=1_000)

    @field_validator("message", "role_context", "topic_code", "topic_context")
    @classmethod
    def reject_blank_strings(cls, value: str | None) -> str | None:
        if value is not None and not value.strip():
            raise ValueError("must not be blank")
        return value.strip() if value is not None else None


class ChatCorrection(BaseModel):
    has_error: bool
    corrected: str | None = None
    explanation_tr: str | None = None


class ChatMessageResponse(BaseModel):
    reply_en: str
    reply_tr_hint: str
    correction: ChatCorrection
    is_completed: bool = False
    completion_summary_tr: str | None = None
    # 2-3 short example replies tailored to the question just asked — the
    # concrete answer to "I don't know what to say next", refreshed every
    # turn instead of a fixed client-side chip list.
    suggested_replies: list[str] = []
