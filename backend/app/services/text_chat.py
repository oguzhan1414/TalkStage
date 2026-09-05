import json
import re

from openai import OpenAI

from app.core.config import settings
from app.schemas.chat import ChatCorrection, ChatMessageResponse, ChatTurn

# Groq exposes an OpenAI-compatible API, so the same `openai` client the rest
# of the backend already depends on works here too — just pointed at Groq's
# base URL with `GROQ_API_KEY` instead of OpenAI's.
GROQ_BASE_URL = "https://api.groq.com/openai/v1"
# `llama-3.3-70b-versatile` was decommissioned by Groq on 2026-08-16; this is
# their recommended replacement (see console.groq.com/docs/deprecations).
CHAT_MODEL = "openai/gpt-oss-120b"

# Bounds token usage/cost on an otherwise-unbounded free-form chat — old
# messages beyond this just age out of what the model sees, they aren't deleted.
MAX_HISTORY_TURNS = 20

_SIMPLE_LEVELS = {"A1", "A2"}

# How many user turns a Study Path mission gets before it's force-completed.
# A1 survival exchanges are short by CEFR definition; higher levels are
# expected to sustain longer, more substantive discourse, so the cap scales
# up with level instead of forcing every mission (A1 through C2 alike) into
# the same fixed shape.
_TURN_CAP_BY_LEVEL = {"A1": 3, "A2": 4, "B1": 5, "B2": 6, "C1": 7, "C2": 8}
_DEFAULT_TURN_CAP = 3
# Extra raw turns allowed beyond the cap if the user keeps failing the
# "genuine English attempt" check below — guarantees the mission still
# terminates eventually (avoiding a repeat of the old "never ends" bug)
# even if someone refuses to ever write real English.
_VALID_TURN_GRACE = 3

_TURKISH_CHARS = set("çğıöşüÇĞİÖŞÜ")
# Small set of very common ASCII-only Turkish words (no Turkish-specific
# letters, so the character check above wouldn't catch them) — not
# exhaustive, just enough to catch the obvious "typed Turkish to coast
# through the turn count" pattern users actually hit.
_COMMON_TURKISH_WORDS = {
    "selam", "naber", "tamam", "evet", "merhaba", "yok", "var", "bende",
    "nasilsin", "iyiyim", "bilmiyorum", "anlamadim", "hayir",
}
_VOWELS = set("aeiou")


def _looks_like_english_attempt(message: str) -> bool:
    """Cheap, deterministic heuristic — not real language detection, just
    enough to stop the two concrete abuse patterns reported: typing Turkish,
    or keyboard-mashing gibberish, to coast through the turn count without
    ever attempting the task. Deliberately conservative (favors letting
    genuine short answers like "Istanbul" or "yes" through over flagging
    them) since a false positive here blocks real progress for a real user.
    """
    stripped = message.strip().lower()
    if len(stripped) < 2:
        return False
    if any(ch in _TURKISH_CHARS for ch in stripped):
        return False
    words = re.findall(r"[a-z']+", stripped)
    if any(w in _COMMON_TURKISH_WORDS for w in words):
        return False
    letters = [c for c in stripped if c.isalpha()]
    if len(letters) >= 4 and not any(c in _VOWELS for c in letters):
        return False  # e.g. "asdkjqwrty" — no real English text is this long with zero vowels
    return True


def _client() -> OpenAI:
    # Same reasoning as llm_orchestrator.py's voice-turn client: the SDK's own
    # default timeout (600s) is far too long for a chat reply the user is
    # actively waiting on — fail fast so the app can show a real error
    # instead of an indefinite spinner.
    return OpenAI(api_key=settings.groq_api_key, base_url=GROQ_BASE_URL, timeout=20.0, max_retries=1)


def _system_prompt(
    cefr_level: str | None,
    role_context: str | None,
    user_turn_count: int,
    turn_cap: int,
    display_name: str | None = None,
    topic_context: str | None = None,
) -> str:
    level = cefr_level or "A1"
    name_line = (
        f"The user's name is {display_name}. Address them by name occasionally "
        "(e.g. in a greeting or a follow-up question) to feel personal — but not "
        "in every single message, that would feel unnatural.\n"
        if display_name
        else ""
    )

    strict_mission_rules = (
        f"""
STRICT ROLEPLAY MISSION RULES:
1. Role Context: {role_context}
2. STAY ON TOPIC AT ALL COSTS: Never derail into unrelated topics (like food, hobbies, etc.) unless the scenario specifically asks for it. Always steer the conversation toward the scenario goals.
3. IF USER WRITES IN TURKISH: Do NOT converse in Turkish. Reply in simple English, give the English translation in 'reply_tr_hint', and encourage them: "Please try in English! Say: 'My name is ...'".
4. PACE YOURSELF TOWARD A NATURAL CONCLUSION (this level gets {turn_cap} exchanges):
   - Current Turn: {user_turn_count}/{turn_cap}.
   - Turn 1: Greet the user and open the scenario with your first question.
   - Middle turns: Progress through the scenario goals one at a time, going a little deeper each turn (ask follow-up questions, react to specifics) — don't rush through all goals in one turn.
   - Final turn ({turn_cap}): Conclude the conversation warmly and say goodbye in character. Set "is_completed": true.
   Note: even if you don't set "is_completed" yourself, the app will end the mission after turn {turn_cap} regardless — so use the turns you have to actually work through the scenario goals rather than stalling.
"""
        if role_context
        else ""
    )

    # Casual free-chat ("Günlük Sohbet") has no role_context and no turn cap
    # by design — but that also meant nothing ever pushed the conversation
    # forward, leaving the user staring at a blank input with no idea what
    # to say. These two blocks only apply when there's no strict mission.
    topic_hint = (
        f"\nSuggested conversation topic for today: {topic_context}\n"
        "Use this as a natural opening/anchor, but this is a casual, low-pressure chat — "
        "follow the user's lead, allow tangents, and gently steer back to this topic only "
        "if the conversation stalls. There is no turn limit and no completion goal here.\n"
        if topic_context and not role_context
        else ""
    )
    conversation_driving = (
        "\nKEEP THE CONVERSATION ALIVE: Never end your reply with just a flat statement — "
        "almost always close with a genuine follow-up question so the user always has "
        "something concrete to respond to. If the user's last message was very short, "
        "vague, or suggests they don't know what to say, offer exactly 2 concrete, specific "
        "sub-topics they could pick from (e.g. \"Do you mean X, or more like Y?\") instead of "
        "a generic open question.\n"
        if not role_context
        else ""
    )

    complexity = (
        "Use only very simple, short sentences (4-7 words), present tense, and common "
        "everyday words. Never use complex grammar or long sentences."
        if level in _SIMPLE_LEVELS
        else f"Use natural, everyday English appropriate for a {level} CEFR learner — "
        "richer vocabulary and more complex sentence structure is expected and encouraged at this level."
    )

    return (
        f"You are an AI roleplay character inside the TalkStage app, guiding a Turkish learner of English "
        f"at CEFR level {level}.\n"
        f"{name_line}"
        f"{strict_mission_rules}"
        f"{topic_hint}"
        f"{conversation_driving}\n"
        f"Language Level ({level}): {complexity}\n\n"
        "Keep your English reply short (1-3 sentences). Be friendly and encouraging.\n\n"
        "Check the user's message for English mistakes. If there is a mistake (e.g. 'I like eat' -> 'I like to eat'), "
        "provide the corrected version and a short Turkish explanation. If correct, set has_error: false.\n\n"
        "Always fill \"suggested_replies\" with 2-3 short (3-8 word) example replies, in English, that directly "
        "answer the question you just asked — this is what a learner who doesn't know what to say next will tap "
        "to reply, so make them concrete and specific to your question, not generic.\n\n"
        "Respond with ONLY a JSON object in exactly this format:\n"
        "{\n"
        '  "reply_en": "<your reply, in English>",\n'
        '  "reply_tr_hint": "<Turkish translation of your reply for guidance>",\n'
        f'  "is_completed": <true if this is turn {turn_cap} or the task is naturally done, false otherwise>,\n'
        '  "completion_summary_tr": "<short Turkish congratulatory summary if completed, or null>",\n'
        '  "suggested_replies": ["<short example reply>", "<another short alternative>"],\n'
        '  "correction": {\n'
        '    "has_error": <true or false>,\n'
        '    "corrected": "<the corrected sentence, or null>",\n'
        '    "explanation_tr": "<short Turkish explanation of the grammar mistake, or null>"\n'
        "  }\n"
        "}"
    )


def generate_chat_reply(
    history: list[ChatTurn],
    user_message: str,
    cefr_level: str | None,
    role_context: str | None = None,
    display_name: str | None = None,
    topic_context: str | None = None,
) -> ChatMessageResponse:
    if not settings.groq_api_key:
        raise RuntimeError("GROQ_API_KEY is not configured")

    level = cefr_level or "A1"
    turn_cap = _TURN_CAP_BY_LEVEL.get(level, _DEFAULT_TURN_CAP)
    user_turn_count = (len(history) // 2) + 1  # 1st turn, 2nd turn, 3rd turn...

    # Only turns that look like genuine English attempts count toward
    # completion — otherwise spamming gibberish/Turkish would still
    # "complete" the mission for free once the raw turn count is hit.
    past_user_messages = [t.content for t in history if t.role == "user"]
    valid_turn_count = sum(1 for m in past_user_messages if _looks_like_english_attempt(m))
    current_is_valid = _looks_like_english_attempt(user_message)
    if current_is_valid:
        valid_turn_count += 1

    messages = [
        {
            "role": "system",
            "content": _system_prompt(
                cefr_level, role_context, user_turn_count, turn_cap, display_name, topic_context
            ),
        }
    ]
    messages += [{"role": t.role, "content": t.content} for t in history[-MAX_HISTORY_TURNS:]]
    messages.append({"role": "user", "content": user_message})

    completion = _client().chat.completions.create(
        model=CHAT_MODEL,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.7,
        # gpt-oss-120b is a reasoning model: it spends part of its token
        # budget on internal reasoning before writing the final JSON. The
        # old `max_tokens=400` (below Groq's own 1024 default) let it burn
        # the entire budget on reasoning with nothing left for the answer,
        # producing an empty completion that failed JSON validation (500
        # errors surfaced to the client as a 502). `reasoning_effort="low"`
        # keeps reasoning short (this is a friendly 1-3 sentence chat reply,
        # not a task that needs deep reasoning) and `max_completion_tokens`
        # (Groq's documented param for reasoning models, as opposed to the
        # legacy `max_tokens`) gives enough headroom for both.
        reasoning_effort="low",
        max_completion_tokens=700,
    )
    raw = completion.choices[0].message.content
    if not raw:
        raise RuntimeError("Groq returned an empty reply")

    data = json.loads(raw)
    correction_data = data.get("correction") or {"has_error": False}

    # Deterministic backstop: don't rely on the model to reliably count turns
    # and honor a hard cutoff from prompt text alone — in practice it often
    # just keeps steering toward the scenario goals instead of ever setting
    # this to true. Once the level's real turn cap is reached, force
    # completion in code regardless of what Groq returned. The model can
    # still end earlier on its own if the conversation naturally wraps up —
    # but only if the message that triggered it was itself a real attempt,
    # not gibberish/Turkish the model happened to wave through.
    model_completed = bool(data.get("is_completed", False)) and current_is_valid
    is_completed = (
        model_completed
        or (role_context is not None and valid_turn_count >= turn_cap)
        or (role_context is not None and user_turn_count >= turn_cap + _VALID_TURN_GRACE)
    )

    suggested_replies = data.get("suggested_replies") or []
    if not isinstance(suggested_replies, list):
        suggested_replies = []
    suggested_replies = [str(s) for s in suggested_replies if isinstance(s, str)][:3]

    return ChatMessageResponse(
        reply_en=data["reply_en"],
        reply_tr_hint=data.get("reply_tr_hint", ""),
        is_completed=is_completed,
        completion_summary_tr=data.get("completion_summary_tr"),
        correction=ChatCorrection(**correction_data),
        suggested_replies=suggested_replies,
    )
