import re
from dataclasses import dataclass

from openai import OpenAI
from pydantic import BaseModel, Field

from app.core.config import settings

CHAT_MODEL = "gpt-4o-mini"

_SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")


class Correction(BaseModel):
    has_error: bool
    user_said: str | None = None
    corrected: str | None = None
    explanation_tr: str | None = None


class OrchestratorReply(BaseModel):
    """The single structured LLM output: voice reply + grammar correction + fluency
    score, produced in one call so a second analysis call never adds latency/cost."""

    voice_reply: str = Field(description="The AI role-play character's spoken reply, in English.")
    correction: Correction
    fluency_score: int = Field(ge=0, le=100)


@dataclass
class TurnMessage:
    role: str  # "user" | "assistant"
    content: str


def _client() -> OpenAI:
    return OpenAI(api_key=settings.openai_api_key)


def generate_reply(
    system_prompt: str,
    history: list[TurnMessage],
    user_transcript: str,
) -> OrchestratorReply:
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    messages = [{"role": "system", "content": system_prompt}]
    messages += [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "user", "content": user_transcript})

    completion = _client().beta.chat.completions.parse(
        model=CHAT_MODEL,
        messages=messages,
        response_format=OrchestratorReply,
    )
    parsed = completion.choices[0].message.parsed
    if parsed is None:
        raise RuntimeError("LLM did not return a parseable structured reply")
    return parsed


def split_into_sentences(text: str) -> list[str]:
    """Splits voice_reply into sentence chunks so each can be handed to TTS as soon
    as it's ready, instead of waiting for the whole reply to synthesize at once."""
    return [s.strip() for s in _SENTENCE_SPLIT_RE.split(text) if s.strip()]
