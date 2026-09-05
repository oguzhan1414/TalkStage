from pydantic import BaseModel


class ChatTurn(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatMessageRequest(BaseModel):
    # Client keeps the running conversation locally and resends it each turn —
    # no server-side chat session/table for this lightweight daily-practice mode.
    history: list[ChatTurn] = []
    message: str
    # Optional roleplay instruction for Study Path daily tasks (e.g. "You are
    # playing Barista Mert in a cafe..."). Resent every turn since nothing is
    # persisted server-side — without it the model only has generic "Yankı"
    # framing and won't actually stay in character.
    role_context: str | None = None
    # Curriculum grammar topic this chat is practicing (e.g. "A1_G01"), if
    # any — used purely for attribution when a correction gets logged to
    # `grammar_mistakes`, has no effect on the model's behavior.
    topic_code: str | None = None
    # Soft topic anchor for the free-form "Günlük Sohbet" mode (e.g. "Weekend
    # plans and free time activities") — unlike `role_context`, this never
    # triggers the strict mission/turn-cap rules, it's just something for the
    # model to naturally open with and drift back to if the chat stalls.
    # Mutually exclusive with `role_context` in practice (a Study Path
    # mission already has its own goals).
    topic_context: str | None = None


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
