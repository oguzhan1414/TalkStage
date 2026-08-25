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
