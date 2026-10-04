import asyncio
import logging
from copy import deepcopy

from openai import OpenAI

from app.core.config import settings
from app.schemas.tutor import TutorCorrection, TutorTurnRequest, TutorTurnResponse

logger = logging.getLogger(__name__)

# Primary OpenAI Models
FAST_MODEL = "gpt-5.6-luna"  # Ultra-fast, low-cost conversational tier
DEEP_MODEL = "gpt-5-sol"    # Advanced evaluation tier for unit exams / placement

# Fallback Groq Provider
GROQ_BASE_URL = "https://api.groq.com/openai/v1"
GROQ_MODEL = "openai/gpt-oss-120b"

_TIMEOUT_SECONDS = 20.0
_SIMPLE_LEVELS = {"A1", "A2"}


def _build_system_prompt(req: TutorTurnRequest) -> str:
    level = req.cefr_level.upper() if req.cefr_level else "A1"
    name_str = f"The student's name is {req.display_name}. Address them warmly by name when appropriate." if req.display_name else ""

    level_guidance = (
        "Level A1-A2 (Beginner): Use very simple, short sentences (4-7 words), present tense, high-frequency words. "
        "Be very lenient: do NOT correct tiny grammar slips if the meaning is understood. Only correct mistakes that genuinely break communication."
        if level in _SIMPLE_LEVELS
        else f"Level {level} (Intermediate/Advanced): Speak naturally with everyday idioms and varied sentence structures. "
        "Point out subtle register and social phrasing nuances (e.g. polite phrasing vs blunt demands)."
    )

    lesson_context = ""
    if req.task_goal:
        if req.is_strict_mission:
            lesson_context += f"\nTASK GOAL: {req.task_goal}\nFocus on guiding the student to achieve this goal."
        else:
            lesson_context += (
                f"\nSuggested conversation topic for today: {req.task_goal}\n"
                "Use this as a natural opening/anchor, but this is a casual, low-pressure chat — "
                "follow the user's lead, allow tangents, and gently steer back to this topic only "
                "if the conversation stalls."
            )
    if req.target_grammar_rule:
        lesson_context += f"\nTARGET GRAMMAR / FOCUS: {req.target_grammar_rule}\nEnsure you give the student natural opportunities to practice this."

    if req.is_strict_mission:
        lesson_context += f"\nCURRENT TURN: {req.turn_index} of {req.max_turns} max turns."
        if req.turn_index >= req.max_turns:
            lesson_context += "\nThis is the final turn: warmly wrap up the lesson, praise their effort, and set is_task_complete to true."
        lesson_context += (
            "\nNever end your reply with just a flat statement — almost always close with a "
            "genuine follow-up question. If the user's last message was very short or vague, "
            "offer exactly 2 concrete sub-topics to pick from instead of a generic question."
        )
    else:
        lesson_context += (
            "\nThis is a free-form, low-pressure conversation — there is no turn limit and no "
            "required ending, so do not rush toward wrapping up. Never end your reply with just "
            "a flat statement — almost always close with a genuine follow-up question so the "
            "user always has something concrete to respond to. If the user's last message was "
            "very short, vague, or suggests they don't know what to say, offer exactly 2 "
            "concrete sub-topics they could pick from (e.g. \"Do you mean X, or more like Y?\"). "
            "Only set is_task_complete to true if the user clearly wants to end the chat."
        )

    completion_rule = (
        f"Set to true if the lesson goal is fulfilled or this is turn {req.max_turns}."
        if req.is_strict_mission
        else "Set to true only if the user clearly wants to end the chat — otherwise always false."
    )

    # Named "Yankı" to match the one live, user-facing caller of this engine
    # (the Yazarak Sohbet / TextChatScreen flow, branded Yankı throughout the
    # app — coffee-cup mascot, "Yankı ile Günlük Sohbet" header). The other,
    # currently-unreachable caller (DailyLessonModal.tsx's dead `/tutor/turn`
    # flow) assumes a "Maya" identity instead — if that screen is ever wired
    # back in, its own UI copy ("Maya'ya Kontrol Ettir" etc.) needs revisiting
    # too, not just this prompt.
    return f"""You are Yankı, a warm, lively, patient native American English coach and conversation partner in the TalkStage app.
You are helping a Turkish learner of English at CEFR level {level}.
{name_str}
{level_guidance}
{lesson_context}

RULES FOR YOUR OUTPUT:
1. 'spoken_reply_en': Keep your English reply concise (1-2 sentences), friendly, and conversational. Always end with an easy question or prompt so the student knows how to respond.
2. 'reply_tr_hint': A brief, natural Turkish translation/gist of what you just said in English.
3. 'correction':
   - If user wrote or said something incorrect or socially awkward for the setting:
     - has_error = true
     - user_said = exact flawed phrase
     - corrected = natural English equivalent
     - explanation_tr = Warm, encouraging, playful Turkish explanation (like a supportive friend, never a robotic rule)
     - category = 'grammar' | 'vocabulary' | 'register' | 'pronunciation'
   - If user's sentence was acceptable: has_error = false, other fields null.
4. 'coach_tip_tr': A short proactive Turkish micro-tip whispering in the student's ear what to say next (e.g. "Şimdi şunu dene: 'How much is it?'").
5. 'suggested_replies': Exactly 2-3 short, natural English replies (3-8 words) answering your question, ready for the user to speak or tap.
6. 'is_task_complete': {completion_rule}
7. 'summary_tr': If is_task_complete is true, a 1-sentence congratulatory Turkish recap of what they learned today.

Return strictly structured output adhering to the schema."""


def _get_client() -> tuple[OpenAI, str, bool]:
    """Returns (client, model_name, is_openai).

    Deliberately OpenAI-first, Groq as a fallback only — not the other way
    around. Groq's free tier has tighter/less predictable rate limits, and
    this engine now powers the most-used, highest-traffic chat surface in
    the app (Yazarak Sohbet), so reliability was chosen over Groq's lower
    cost here. Groq still kicks in automatically if OPENAI_API_KEY is unset,
    or as a mid-request fallback below if OpenAI's structured parse fails.
    """
    if settings.openai_api_key:
        return (
            OpenAI(api_key=settings.openai_api_key, timeout=_TIMEOUT_SECONDS, max_retries=1),
            FAST_MODEL,
            True,
        )
    if settings.groq_api_key:
        return (
            OpenAI(api_key=settings.groq_api_key, base_url=GROQ_BASE_URL, timeout=_TIMEOUT_SECONDS, max_retries=1),
            GROQ_MODEL,
            False,
        )
    raise RuntimeError("Neither OPENAI_API_KEY nor GROQ_API_KEY is configured")


def generate_tutor_turn_sync(req: TutorTurnRequest) -> TutorTurnResponse:
    """Executes a unified Maya tutoring turn with OpenAI Structured Outputs or Groq fallback."""
    client, model, is_openai = _get_client()
    system_prompt = _build_system_prompt(req)

    messages = [{"role": "system", "content": system_prompt}]
    for t in req.history[-10:]:
        role = t.get("role", "user")
        content = t.get("content", "")
        if content:
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": req.user_input})

    if is_openai:
        try:
            completion = client.beta.chat.completions.parse(
                model=model,
                messages=messages,
                response_format=TutorTurnResponse,
            )
            result = completion.choices[0].message.parsed
            if result is None:
                raise ValueError("Structured parsing returned None")
        except Exception as exc:
            logger.warning("OpenAI Structured Outputs failed, trying fallback: %s", exc)
            if settings.groq_api_key:
                groq_client = OpenAI(api_key=settings.groq_api_key, base_url=GROQ_BASE_URL, timeout=_TIMEOUT_SECONDS, max_retries=1)
                comp = groq_client.chat.completions.create(
                    model=GROQ_MODEL,
                    messages=messages,
                    response_format={"type": "json_object"},
                    max_completion_tokens=1500,
                )
                result = TutorTurnResponse.model_validate_json(comp.choices[0].message.content or "{}")
            else:
                raise
    else:
        # Groq JSON mode path
        comp = client.chat.completions.create(
            model=model,
            messages=messages,
            response_format={"type": "json_object"},
            max_completion_tokens=1500,
        )
        result = TutorTurnResponse.model_validate_json(comp.choices[0].message.content or "{}")

    # Backend deterministic state enforcement — only for an actual paced
    # mission. A free/topic-anchored chat (is_strict_mission=False) must
    # never be force-completed just because the model happened to generate
    # a lot of turns; it ends only if the model itself decides to (e.g. the
    # user says goodbye).
    if req.is_strict_mission and req.turn_index >= req.max_turns:
        result.is_task_complete = True
        if not result.summary_tr:
            result.summary_tr = "Harika bir çalışma oldu! Bugünün hedefini başarıyla tamamladın."

    return result


async def generate_tutor_turn(req: TutorTurnRequest) -> TutorTurnResponse:
    """Asynchronous wrapper for generate_tutor_turn_sync."""
    try:
        return await asyncio.to_thread(generate_tutor_turn_sync, req)
    except Exception as exc:
        logger.exception("TutorEngine turn generation failed")
        # Graceful fallback response so the user is never left hanging
        return TutorTurnResponse(
            spoken_reply_en="Nice try! Let's keep practicing. Could you tell me more?",
            reply_tr_hint="Güzel deneme! Pratik yapmaya devam edelim. Biraz daha anlatır mısın?",
            correction=TutorCorrection(has_error=False),
            coach_tip_tr="Cümle kurmaya devam et, Yankı seni dinliyor.",
            fluency_score=75,
            suggested_replies=["Yes, I can!", "Sure, let's practice."],
            is_task_complete=(req.turn_index >= req.max_turns),
            summary_tr="Günün pratiğini tamamladın!" if req.turn_index >= req.max_turns else None,
        )
