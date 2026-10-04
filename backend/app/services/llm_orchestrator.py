import asyncio
import json
import logging
import re
from dataclasses import dataclass

from openai import OpenAI
from pydantic import BaseModel, Field

from app.core.config import settings

logger = logging.getLogger(__name__)

#: gpt-5-nano: $0.05/$0.40 per 1M tokens vs gpt-4o-mini's $0.15/$0.60 — cheaper
#: on a feature where OpenAI was already costing fractions of a cent per
#: conversation. It's a reasoning model (like Groq's gpt-oss-120b below), so
#: every call site passes reasoning_effort="minimal" — this is a short
#: conversational reply/structured extraction task, not something that
#: benefits from deliberation, and skipping real reasoning keeps latency low.
CHAT_MODEL = "gpt-5.6-luna"
_REASONING_EFFORT = "none"

_SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")


#: Shared across the OpenAI structured-output Field descriptions below AND
#: the Groq fallback's plain-text prompts (generate_reply/analyze_turn) —
#: broadens "mistake" past pure grammar (a native speaker ordering "Give me a
#: burger" makes zero grammar errors, but it reads as a demand — "Can I get a
#: burger?" is what's actually expected) and sets the correction's tone: a
#: friendly, lightly teasing explanation, never a clinical rule or anything
#: that could read as mocking.
_CORRECTION_GUIDANCE = (
    "Look beyond grammar for anything worth correcting: also flag phrasing "
    "that's grammatically fine but socially off for the setting — too blunt "
    "or demanding, the wrong word for the specific context (e.g. 'big fries' "
    "instead of 'large' at a counter), or just not what a native speaker "
    "would actually say (e.g. 'Give me a burger' instead of the politer "
    "'Can I get a burger?'). Write explanation_tr in a warm, lightly "
    "playful, friendly tone — like a patient friend gently teasing you, "
    "never a cold textbook rule and never harsh or mocking. When the issue "
    "is cultural/register rather than a grammar error, say so explicitly "
    "and explain the social nuance, don't just call it 'more correct.'\n"
    "IMPORTANT exception for A1/A2 learners (see the learner's CEFR level "
    "stated above): be lenient. At this stage the goal is building the "
    "confidence to communicate at all, not polish — only set has_error true "
    "when the mistake actually breaks or confuses the meaning. A sentence "
    "like 'I is a student' is understood just fine, so leave it uncorrected; "
    "don't nitpick minor grammar slips a listener would have no trouble "
    "understanding. Apply the full guidance above (including register/"
    "cultural nuance) more strictly from B1 upward."
)

#: A1/A2-only real-time nudge, distinct from `correction` (which only reacts
#: to something the user already said). This is proactive: a short, warm
#: Turkish hint pointing at the next concrete thing to try saying, aimed
#: squarely at true beginners who might otherwise freeze up mid-scenario and
#: churn out of the app. Deliberately Turkish (not English, unlike
#: suggested_replies) — a beginner stuck on what a scene even wants from
#: them needs the explanation in their own language, not another thing to
#: decode in English.
_COACH_TIP_GUIDANCE = (
    "If the learner's CEFR level is A1 or A2: you are ALSO their teacher, not "
    "just a roleplay character — ALWAYS fill coach_tip_tr, on every single "
    "turn, with a short, warm, encouraging tip IN TURKISH, like a patient "
    "teacher whispering in their ear. Default to one of these two shapes:\n"
    "  1. If the user's last message was usable but incomplete or could be "
    "more natural, point at the ONE specific next thing to add or say "
    "better, tied to this exact exchange — e.g. the user just said 'I am "
    "Ali' so you write \"Güzel! Şimdi topu ona at ve 'And you?' diye "
    "sormayı dene.\", or they ordered 'a big coffee' so you write \"Harika "
    "sipariş! Bir dahaki sefere 'big' yerine 'large' demeyi dene, kahve "
    "dükkanlarında öyle denir.\"\n"
    "  2. If there's truly nothing to add right now (e.g. right after your "
    "own opening line, before the user has said anything), give a short "
    "heads-up about what to try saying next, e.g. \"Şimdi kendini "
    "tanıtabilirsin: 'Hi, I'm...' diyerek başla.\"\n"
    "Only leave coach_tip_tr null in the rare case where the user's message "
    "was already a genuinely complete, natural, well-formed response AND "
    "the scenario is fully wrapping up — don't invent a tip when the user "
    "is clearly fine, but default strongly toward writing one. For B1 and "
    "above, always leave coach_tip_tr null — those learners get no "
    "real-time coaching by design."
)


class Correction(BaseModel):
    has_error: bool = Field(
        description=(
            "True for ANY mistake worth flagging — grammar, but also "
            "phrasing that's grammatically correct yet culturally/socially "
            "off (wrong register, too blunt, not what a native speaker "
            "would say here). See the system prompt's correction guidance."
        )
    )
    user_said: str | None = None
    corrected: str | None = None
    explanation_tr: str | None = Field(
        default=None,
        description=(
            "Warm, lightly playful Turkish explanation of why the "
            "correction is better — never clinical, never harsh. If it's a "
            "cultural/register issue rather than a grammar error, say so."
        ),
    )


class OrchestratorReply(BaseModel):
    """The combined shape cached for a scenario's first turn (see
    `app/services/cache.py`) — a cache hit has zero LLM latency already, so
    it's sent as one complete reply rather than through the streaming path
    below (see Ek 34: streaming only helps when there's an actual LLM call
    to overlap with TTS)."""

    voice_reply: str = Field(
        description="The spoken reply in the language and teaching/roleplay mode required by the system prompt."
    )
    correction: Correction
    fluency_score: int = Field(ge=0, le=100)
    is_scene_complete: bool = Field(default=False)
    completion_summary_tr: str | None = Field(default=None)
    #: Same pattern as text chat's ChatMessageResponse.suggested_replies — 2-3
    #: short example replies tailored to this reply's own question, refreshed
    #: every turn, for the push-to-talk redesign's "ne söyleyeceğimi bilmiyorum"
    #: safety net (replaces static per-scenario key phrases as the primary hint).
    suggested_replies: list[str] = Field(default_factory=list)
    #: A1/A2-only proactive Turkish coaching nudge — see _COACH_TIP_GUIDANCE.
    #: Always null at B1+ by prompt instruction (no code-level gate yet; one
    #: can be added once B1-B2 scenarios with a deliberately different,
    #: no-live-coaching experience actually exist).
    coach_tip_tr: str | None = Field(default=None)


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
    coach_tip_tr: str | None = Field(
        default=None,
        description=(
            "A1/A2 ONLY: a short, warm, encouraging Turkish hint pointing "
            "at the next concrete thing to try saying, based on the "
            "roleplay objectives vs what's already been covered. Null for "
            "B1 and above."
        ),
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
    "ONLY the structured analysis fields: whether their last message had a "
    f"mistake worth flagging (correction — {_CORRECTION_GUIDANCE}), a "
    "fluency_score, whether the roleplay objectives above feel meaningfully "
    "covered by the user across the conversation so far (is_scene_complete + "
    "completion_summary_tr — base this only on what the USER has said, not "
    f"on any reply), and the proactive coach tip ({_COACH_TIP_GUIDANCE})"
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
            reasoning_effort=_REASONING_EFFORT,
        )
        parsed = completion.choices[0].message.parsed
        if parsed is None:
            raise RuntimeError("LLM did not return a parseable structured reply")
        return parsed

    json_system_prompt = (
        f"{system_prompt}\n\n"
        f"CORRECTION GUIDANCE: {_CORRECTION_GUIDANCE}\n\n"
        f"COACH TIP GUIDANCE: {_COACH_TIP_GUIDANCE}\n\n"
        "IMPORTANT: You must return ONLY valid JSON matching this exact schema:\n"
        "{\n"
        '  "voice_reply": "Your spoken reply in the language required by the system prompt",\n'
        '  "correction": {\n'
        '    "has_error": true/false,\n'
        '    "user_said": "what user said or null",\n'
        '    "corrected": "better sentence or null",\n'
        '    "explanation_tr": "warm, lightly playful Turkish explanation or null"\n'
        "  },\n"
        '  "fluency_score": 90,\n'
        '  "is_scene_complete": true/false,\n'
        '  "completion_summary_tr": "short Turkish summary or null",\n'
        '  "suggested_replies": ["<short example reply>", "<another>"],\n'
        '  "coach_tip_tr": "short warm Turkish coaching hint, A1/A2 only, or null"\n'
        "}"
    )
    messages[0]["content"] = json_system_prompt

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.7,
        # Same fix as text_chat.py's generate_chat_reply for this exact model
        # (gpt-oss-120b is a reasoning model — an unbudgeted/low max_tokens
        # lets it spend its whole budget on invisible reasoning and return an
        # empty completion, see backend CLAUDE.md Ek 21). This Groq branch
        # only runs when OPENAI_API_KEY is absent, but it had never gotten
        # this fix, so it was one missing key away from repeating that bug.
        reasoning_effort="low",
        max_completion_tokens=700,
    )
    raw_content = completion.choices[0].message.content or "{}"
    data = json.loads(raw_content)
    return OrchestratorReply.model_validate(data)


def analyze_turn(
    system_prompt: str,
    history: list[TurnMessage],
    user_transcript: str,
    ai_reply_for_consistency: str | None = None,
) -> TurnAnalysis:
    """The structured half of a live turn — correction, fluency, and objective
    coverage. Deliberately blocking (called via asyncio.to_thread + wrapped in
    an asyncio.Task by the caller) so it can run concurrently with
    stream_voice_reply()'s TTS pipeline instead of adding sequential latency.

    `ai_reply_for_consistency`: beginner teacher_mode's spoken Turkish reply
    already narrates praise/correction inline (see rag.py's
    `_build_beginner_teacher_block`) — unlike the standard in-character
    voice_reply, which never touches correctness at all. Running this call
    fully blind to that reply (as the standard path safely does) risked the
    correction CARD disagreeing with what Maya's voice just said. Passed in,
    called AFTER the stream finishes (not concurrently, same timing
    generate_suggested_replies already uses) instead of before/during it —
    doesn't add to time-to-first-audio, just to when the (already
    non-blocking) correction card appears a moment later.
    """
    client, model, is_openai = _client()
    task_suffix = _ANALYSIS_TASK_SUFFIX
    if ai_reply_for_consistency:
        task_suffix += (
            "\n\nMaya's reply this turn (already decided and spoken to the "
            f"learner) was:\n\"{ai_reply_for_consistency}\"\nYour correction/"
            "fluency/is_scene_complete verdict MUST be consistent with what "
            "Maya already said — don't flag an error Maya's reply treated as "
            "fine, and don't praise/reference something Maya's reply didn't "
            "actually mention."
        )
    messages = _build_messages(f"{system_prompt}{task_suffix}", history, user_transcript)

    if is_openai:
        completion = client.beta.chat.completions.parse(
            model=model,
            messages=messages,
            response_format=TurnAnalysis,
            reasoning_effort=_REASONING_EFFORT,
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
        '    "explanation_tr": "warm, lightly playful Turkish explanation or null"\n'
        "  },\n"
        '  "fluency_score": 90,\n'
        '  "is_scene_complete": true/false,\n'
        '  "completion_summary_tr": "short Turkish summary or null",\n'
        '  "coach_tip_tr": "short warm Turkish coaching hint, A1/A2 only, or null"\n'
        "}"
    )
    messages[0]["content"] = json_system_prompt

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.3,
        # Same reasoning-budget fix as generate_reply's Groq branch above.
        reasoning_effort="low",
        max_completion_tokens=700,
    )
    raw_content = completion.choices[0].message.content or "{}"
    data = json.loads(raw_content)
    return TurnAnalysis.model_validate(data)


class SuggestedReplies(BaseModel):
    suggested_replies: list[str] = Field(default_factory=list)


_SUGGESTIONS_PROMPT_SUFFIX = (
    "\n\n--- IMPORTANT — output override for THIS response only ---\n"
    "Do NOT write an in-character conversational reply here. The assistant's "
    "most recent message in the conversation history above is what you (the "
    "AI character) just said. Based ONLY on that, silently generate 2-3 short "
    "(3-8 word) example replies, in English, that a learner could directly "
    "send as their next answer — concrete and specific to that exact "
    "question/statement, not generic filler."
)


def generate_suggested_replies(
    system_prompt: str,
    history: list[TurnMessage],
    ai_reply: str,
) -> list[str]:
    """Push-to-talk redesign's per-turn suggestion chips (same pattern as
    text chat's ChatMessageResponse.suggested_replies) — replaces the static
    per-scenario key phrases as the primary "what do I say" hint.

    Deliberately its OWN small call instead of a field on analyze_turn():
    analyze_turn() runs CONCURRENTLY with stream_voice_reply() specifically so
    it never depends on what the AI is about to say (Ek 34) — but good
    suggestions genuinely need the AI's own just-finished reply as context.
    Called from `_run_turn` right after the stream completes, so it overlaps
    with whatever's left of analyze_turn() instead of adding to the
    time-to-first-audio critical path. Best-effort: any failure here degrades
    to an empty suggestion list, never breaks the turn the user is waiting on.
    """
    try:
        client, model, is_openai = _client()
    except RuntimeError:
        return []

    messages = [{"role": "system", "content": f"{system_prompt}{_SUGGESTIONS_PROMPT_SUFFIX}"}]
    messages += [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "assistant", "content": ai_reply})

    try:
        if is_openai:
            completion = client.beta.chat.completions.parse(
                model=model,
                messages=messages,
                response_format=SuggestedReplies,
                reasoning_effort=_REASONING_EFFORT,
            )
            parsed = completion.choices[0].message.parsed
            return parsed.suggested_replies[:3] if parsed else []

        json_system_prompt = (
            f"{messages[0]['content']}\n\n"
            "IMPORTANT: Return ONLY valid JSON matching this exact schema:\n"
            '{"suggested_replies": ["<short example reply>", "<another>"]}'
        )
        messages[0]["content"] = json_system_prompt
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.5,
            reasoning_effort="low",
            max_completion_tokens=300,
        )
        raw_content = completion.choices[0].message.content or "{}"
        data = json.loads(raw_content)
        replies = data.get("suggested_replies") or []
        return [str(r) for r in replies if isinstance(r, str)][:3]
    except Exception:
        logger.exception("generate_suggested_replies failed; continuing without suggestions")
        return []


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
    client, model, is_openai = _client()
    messages = _build_messages(system_prompt, history, user_transcript)
    # gpt-5-nano (and reasoning models generally) reject any non-default
    # `temperature` — "Only the default (1) value is supported" — so it's
    # omitted entirely on the OpenAI path instead of the unconditional 0.7
    # this used to send down both branches. Groq's gpt-oss-120b has no such
    # restriction (text_chat.py already uses 0.7 with it successfully).
    extra_kwargs: dict = (
        {"reasoning_effort": _REASONING_EFFORT}
        if is_openai
        # Same reasoning-budget fix as the other two Groq branches above.
        else {"temperature": 0.7, "reasoning_effort": "low", "max_completion_tokens": 700}
    )

    loop = asyncio.get_running_loop()
    queue: asyncio.Queue = asyncio.Queue()
    _DONE = object()

    def _produce() -> None:
        try:
            stream = client.chat.completions.create(
                model=model,
                messages=messages,
                stream=True,
                **extra_kwargs,
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
