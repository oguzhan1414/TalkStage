import re

# This module used to call Groq directly (see git history / CLAUDE.md Ek
# 15-21 for that chapter) — it now delegates the actual reply generation to
# `tutor_engine.py` (OpenAI-first, Groq-fallback; see that module's
# `_get_client()` docstring for why). What's left here is the turn-pacing
# layer tutor_engine doesn't know about: the per-level turn budget and the
# "is this a genuine English attempt" gate that stops a user from
# free-completing a mission by typing Turkish or keyboard-mashing gibberish
# until the turn cap is hit (see `_looks_like_english_attempt` below).
from app.schemas.chat import ChatCorrection, ChatMessageResponse, ChatTurn

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


def generate_chat_reply(
    history: list[ChatTurn],
    user_message: str,
    cefr_level: str | None,
    role_context: str | None = None,
    display_name: str | None = None,
    topic_context: str | None = None,
) -> ChatMessageResponse:
    from app.schemas.tutor import TutorTurnRequest
    from app.services.tutor_engine import generate_tutor_turn_sync

    level = cefr_level or "A1"
    # Only a real Study Path / focusTopic mission (role_context set) gets
    # turn-capped and force-completed — a bare topic_context anchor or fully
    # free chat must stay unlimited (see ChatMessageRequest.topic_context's
    # docstring / CLAUDE.md Ek 28). This used to be enforced in this file's
    # own prompt; now it has to be threaded through to tutor_engine.py via
    # `is_strict_mission` since that's what actually builds the prompt.
    is_strict_mission = bool(role_context)

    if is_strict_mission:
        turn_cap = _TURN_CAP_BY_LEVEL.get(level, _DEFAULT_TURN_CAP)
        raw_turn_count = (len(history) // 2) + 1

        # Ek19 protection: only turns that look like a genuine English
        # attempt advance the mission toward completion — typing Turkish or
        # keyboard-mashing gibberish no longer coasts through the turn
        # count for free. The raw count still provides a hard ceiling
        # (+ grace) so someone who never once attempts English isn't stuck
        # forever either.
        valid_turn_count = sum(
            1 for t in history if t.role == "user" and _looks_like_english_attempt(t.content)
        )
        if _looks_like_english_attempt(user_message):
            valid_turn_count += 1
        hard_cap_hit = raw_turn_count >= turn_cap + _VALID_TURN_GRACE

        turn_index = turn_cap if hard_cap_hit else min(valid_turn_count, turn_cap)
        max_turns = turn_cap
    else:
        turn_index, max_turns = 1, 9999

    req = TutorTurnRequest(
        history=[{"role": t.role, "content": t.content} for t in history],
        user_input=user_message,
        cefr_level=level,
        lesson_type="roleplay" if role_context else "free_chat",
        task_goal=role_context or topic_context,
        is_strict_mission=is_strict_mission,
        display_name=display_name,
        turn_index=turn_index,
        max_turns=max_turns,
    )

    tutor_res = generate_tutor_turn_sync(req)

    return ChatMessageResponse(
        reply_en=tutor_res.spoken_reply_en,
        reply_tr_hint=tutor_res.reply_tr_hint,
        is_completed=tutor_res.is_task_complete,
        completion_summary_tr=tutor_res.summary_tr,
        correction=ChatCorrection(
            has_error=tutor_res.correction.has_error,
            corrected=tutor_res.correction.corrected,
            explanation_tr=tutor_res.correction.explanation_tr,
        ),
        suggested_replies=tutor_res.suggested_replies,
    )
