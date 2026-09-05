import asyncio
import json
import logging
import re
from dataclasses import dataclass

from openai import OpenAI
from pydantic import BaseModel, Field

from app.core.config import settings

logger = logging.getLogger(__name__)

CHAT_MODEL = "gpt-4o-mini"

_SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")


class Correction(BaseModel):
    has_error: bool
    user_said: str | None = None
    corrected: str | None = None
    explanation_tr: str | None = None


class OrchestratorReply(BaseModel):
    """The combined shape cached for a scenario's first turn (see
    `app/services/cache.py`) — a cache hit has zero LLM latency already, so
    it's sent as one complete reply rather than through the streaming path
    below (see Ek 34: streaming only helps when there's an actual LLM call
    to overlap with TTS)."""

    voice_reply: str = Field(description="The AI role-play character's spoken reply, in English.")
    correction: Correction
    fluency_score: int = Field(ge=0, le=100)
    is_scene_complete: bool = Field(default=False)
    completion_summary_tr: str | None = Field(default=None)


class TurnAnalysis(BaseModel):
    """Everything about a turn EXCEPT the conversational reply itself —
    deliberately excludes voice_reply so this call depends only on
    {system_prompt, history, user_transcript}, never on what the AI is about
    to say back. That's what makes it safe to run concurrently with the
    streaming voice_reply call (Ek 34): the two calls query disjoint
    information, so there's no ordering dependency between them."""

    correction: Correction
    fluency_score: int = Field(ge=0, le=100)
    #: Driven by the objectives block in rag.py's `_build_objectives_block` —
    #: gives the voice scenario a real "done" signal instead of running
    #: open-ended forever (see backend CLAUDE.md Ek 32).
    is_scene_complete: bool = Field(
        default=False,
        description="True once the user has meaningfully engaged with most of the roleplay's objectives.",
    )
    completion_summary_tr: str | None = Field(
        default=None,
        description="Short encouraging Turkish summary of what the user did well — only set when is_scene_complete is true.",
    )


@dataclass
class TurnMessage:
    role: str  # "user" | "assistant"
    content: str


GROQ_BASE_URL = "https://api.groq.com/openai/v1"
GROQ_MODEL = "openai/gpt-oss-120b"


#: The SDK's own default (600s, plus its own retry backoff) is far longer than
#: a live voice turn can tolerate — a slow/hanging provider call used to leave
#: the user staring at "Düşünüyor…" with no way out except leaving the screen.
#: Failing fast here lets the WS handler's existing error path (`{"type":
#: "error"}`) reach the client quickly instead.
_LLM_TIMEOUT_SECONDS = 20.0

_ANALYSIS_TASK_SUFFIX = (
    "\n\n--- IMPORTANT — output override for THIS response only ---\n"
    "Do NOT write an in-character conversational reply here. Instead, silently "
    "analyze the user's last message and the conversation so far, and return "
    "ONLY the structured analysis fields: whether their last message had an "
    "English mistake (correction), a fluency_score, and whether the roleplay "
    "objectives above feel meaningfully covered by the user across the "
    "conversation so far (is_scene_complete + completion_summary_tr). Base "
    "is_scene_complete only on what the USER has said, not on any reply."
)


def _client() -> tuple[OpenAI, str, bool]:
    """Returns (client, model_name, is_openai)."""
    if settings.openai_api_key:
        return (
            OpenAI(api_key=settings.openai_api_key, timeout=_LLM_TIMEOUT_SECONDS, max_retries=1),
            CHAT_MODEL,
            True,
        )
    if settings.groq_api_key:
        return (
            OpenAI(
                api_key=settings.groq_api_key,
                base_url=GROQ_BASE_URL,
                timeout=_LLM_TIMEOUT_SECONDS,
                max_retries=1,
            ),
            GROQ_MODEL,
            False,
        )
    raise RuntimeError("Neither OPENAI_API_KEY nor GROQ_API_KEY is configured")


def _build_messages(system_prompt: str, history: list[TurnMessage], user_transcript: str) -> list[dict]:
    messages = [{"role": "system", "content": system_prompt}]
    messages += [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "user", "content": user_transcript})
    return messages


def generate_reply(
    system_prompt: str,
    history: list[TurnMessage],
    user_transcript: str,
) -> OrchestratorReply:
    """Single blocking structured call producing voice_reply + analysis together
    — only used for the cached-first-turn fast path now (see cache.py). The
    live/uncached path uses stream_voice_reply()+analyze_turn() instead so TTS
    can start on the first sentence instead of waiting for the whole reply."""
    client, model, is_openai = _client()
    messages = _build_messages(system_prompt, history, user_transcript)

    if is_openai:
        completion = client.beta.chat.completions.parse(
            model=model,
            messages=messages,
            response_format=OrchestratorReply,
        )
        parsed = completion.choices[0].message.parsed
        if parsed is None:
            raise RuntimeError("LLM did not return a parseable structured reply")
        return parsed

    json_system_prompt = (
        f"{system_prompt}\n\n"
        "IMPORTANT: You must return ONLY valid JSON matching this exact schema:\n"
        "{\n"
        '  "voice_reply": "Your spoken conversational English reply",\n'
        '  "correction": {\n'
        '    "has_error": true/false,\n'
        '    "user_said": "what user said or null",\n'
        '    "corrected": "better sentence or null",\n'
        '    "explanation_tr": "Turkish grammar tip or null"\n'
        "  },\n"
        '  "fluency_score": 90,\n'
        '  "is_scene_complete": true/false,\n'
        '  "completion_summary_tr": "short Turkish summary or null"\n'
        "}"
    )
    messages[0]["content"] = json_system_prompt

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.7,
    )
    raw_content = completion.choices[0].message.content or "{}"
    data = json.loads(raw_content)
    return OrchestratorReply.model_validate(data)


def analyze_turn(
    system_prompt: str,
    history: list[TurnMessage],
    user_transcript: str,
) -> TurnAnalysis:
    """The structured half of a live turn — correction, fluency, and objective
    coverage. Deliberately blocking (called via asyncio.to_thread + wrapped in
    an asyncio.Task by the caller) so it can run concurrently with
    stream_voice_reply()'s TTS pipeline instead of adding sequential latency."""
    client, model, is_openai = _client()
    messages = _build_messages(f"{system_prompt}{_ANALYSIS_TASK_SUFFIX}", history, user_transcript)

    if is_openai:
        completion = client.beta.chat.completions.parse(
            model=model,
            messages=messages,
            response_format=TurnAnalysis,
        )
        parsed = completion.choices[0].message.parsed
        if parsed is None:
            raise RuntimeError("LLM did not return a parseable structured analysis")
        return parsed

    json_system_prompt = (
        f"{messages[0]['content']}\n\n"
        "IMPORTANT: You must return ONLY valid JSON matching this exact schema:\n"
        "{\n"
        '  "correction": {\n'
        '    "has_error": true/false,\n'
        '    "user_said": "what user said or null",\n'
        '    "corrected": "better sentence or null",\n'
        '    "explanation_tr": "Turkish grammar tip or null"\n'
        "  },\n"
        '  "fluency_score": 90,\n'
        '  "is_scene_complete": true/false,\n'
        '  "completion_summary_tr": "short Turkish summary or null"\n'
        "}"
    )
    messages[0]["content"] = json_system_prompt

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.3,
    )
    raw_content = completion.choices[0].message.content or "{}"
    data = json.loads(raw_content)
    return TurnAnalysis.model_validate(data)


async def stream_voice_reply(
    system_prompt: str,
    history: list[TurnMessage],
    user_transcript: str,
):
    """Async generator yielding plain-text deltas of the AI character's reply
    as the model generates them — the core latency fix in Ek 34. The OpenAI
    SDK's streaming iterator is synchronous, so it's driven in a background
    thread (via the default executor, same pool `asyncio.to_thread` uses) and
    each chunk is relayed into an asyncio.Queue for the async caller to
    consume without blocking the event loop."""
    client, model, _ = _client()
    messages = _build_messages(system_prompt, history, user_transcript)

    loop = asyncio.get_running_loop()
    queue: asyncio.Queue = asyncio.Queue()
    _DONE = object()

    def _produce() -> None:
        try:
            stream = client.chat.completions.create(
                model=model,
                messages=messages,
                stream=True,
                temperature=0.7,
            )
            for chunk in stream:
                # Some chunks legitimately carry an empty `choices` list (e.g.
                # a trailing usage-only chunk) — indexing [0] unconditionally
                # would raise IndexError and abort the whole stream silently
                # from the caller's perspective (the exception surfaces, but
                # with no obvious clue it was this).
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta.content
                if delta:
                    loop.call_soon_threadsafe(queue.put_nowait, delta)
        except Exception as exc:
            logger.exception("stream_voice_reply: provider stream raised")
            loop.call_soon_threadsafe(queue.put_nowait, exc)
        finally:
            loop.call_soon_threadsafe(queue.put_nowait, _DONE)

    loop.run_in_executor(None, _produce)

    while True:
        item = await queue.get()
        if item is _DONE:
            return
        if isinstance(item, Exception):
            raise item
        yield item


def split_into_sentences(text: str) -> list[str]:
    """Splits voice_reply into sentence chunks so each can be handed to TTS as soon
    as it's ready, instead of waiting for the whole reply to synthesize at once."""
    return [s.strip() for s in _SENTENCE_SPLIT_RE.split(text) if s.strip()]


def extract_complete_sentences(buffer: str) -> tuple[list[str], str]:
    """Splits a growing text buffer into complete sentences + the trailing
    incomplete fragment — used to flush finished sentences to TTS as soon as
    they appear in the stream, without waiting for the whole reply (Ek 34)."""
    parts = _SENTENCE_SPLIT_RE.split(buffer)
    if len(parts) <= 1:
        return [], buffer
    *complete, remainder = parts
    return [p for p in complete if p.strip()], remainder
