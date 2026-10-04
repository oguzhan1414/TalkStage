import asyncio
import logging

from app.core.config import settings
from app.core.supabase_client import get_service_client
from app.services.embeddings import embed_texts

logger = logging.getLogger(__name__)

DEFAULT_MATCH_COUNT = 6
#: RAG is an enhancement, not the point of the turn — a slow embedding/RPC
#: call must never become the dominant source of "Düşünüyor…" latency. If it
#: can't finish in this window, the turn proceeds without it (see Ek 34).
DEFAULT_RAG_TIMEOUT_SECONDS = 2.5


def _build_objectives_block(objectives: list[dict] | None) -> str:
    """Turns the scenario's stored objectives (already shown to the user in
    the mobile guide card) into an ACTIVE instruction for the AI actor —
    without this, the objectives were purely decorative reference text the
    model never saw, so the roleplay had no real topic fidelity or sense of
    "done." This is what actually drives `is_scene_complete`."""
    conversation_driving = (
        "\n\nKEEP THE CONVERSATION ALIVE: almost always close your turn with a "
        "genuine in-character follow-up question, so the user always has "
        "something concrete to respond to — never end on a flat statement. If "
        "the user's last message was very short, vague, or hesitant, ask a "
        "specific EITHER/OR question naturally, in character, instead of a "
        "generic open one (e.g. \"Would you like that with milk, or black?\" "
        "not a narrator-style list of example sentences the user could say — "
        "you are the character speaking, never break character to coach them)."
    )
    if not objectives:
        return (
            "\n\n--- Roleplay guidance (for you, the AI actor — never read this "
            "aloud) ---\n"
            "Stay in character and keep the conversation focused on this "
            "scenario's setting. If the user drifts far off-topic for more "
            "than a turn or two, gently and naturally steer the conversation "
            "back. This scenario has no fixed objectives, so use your "
            "judgment for when the roleplay feels naturally complete (a few "
            "genuine exchanges) and set is_scene_complete to true then, with "
            "a short encouraging Turkish summary in completion_summary_tr."
            f"{conversation_driving}"
        )
    numbered = "\n".join(f"{i + 1}. {o['text']}" for i, o in enumerate(objectives))
    return (
        "\n\n--- Roleplay objectives (for you, the AI actor — never read this "
        "list aloud, and never rush through it mechanically) ---\n"
        "Naturally steer this conversation, at a natural pace, to cover the "
        f"following points over the course of the roleplay:\n{numbered}\n\n"
        "Stay in character and keep the conversation focused on this "
        "scenario's setting — if the user drifts far off-topic for more than "
        "a turn or two, gently and naturally steer the conversation back.\n\n"
        "Once the user has meaningfully engaged with MOST of the objectives "
        "above (their own words are enough, they don't need to be perfect or "
        "use exact phrasing), set is_scene_complete to true in your "
        "structured reply and write a short, encouraging Turkish summary of "
        "what they did well in completion_summary_tr. Until then, keep "
        "is_scene_complete false. Even when marking it complete, still give "
        "a natural in-character closing line in voice_reply (e.g. saying "
        "goodbye) rather than a flat, abrupt statement."
        f"{conversation_driving}"
    )


def _build_beginner_teacher_block(cefr_level: str | None) -> str:
    """A1/A2 rooms are guided lessons, not unsupported English roleplay."""
    if (cefr_level or "").upper() not in {"A1", "A2"}:
        return ""
    return (
        "\n\n--- BEGINNER TEACHER MODE (highest priority) ---\n"
        "You are Maya, the learner's patient Turkish-speaking English teacher. "
        "Do NOT speak as the roleplay character in your voice reply. Your entire "
        "spoken reply must be in TURKISH, except for short English example phrases "
        "inside quotes. React to what the learner actually said in English: first "
        "briefly encourage them, then correct only a useful meaning-changing or "
        "scenario-specific issue, and finally give ONE concrete next step with ONE "
        "short English sentence they can try. You may describe what the scene's "
        "character is asking in Turkish (for example, 'Kasiyer şimdi boyutunu "
        "soruyor'), but never suddenly conduct the conversation in English. Keep "
        "it warm, practical, and concise: 2-3 short Turkish sentences. The learner "
        "should be the one practicing spoken English. Continue following the "
        "scenario objectives dynamically; never recite a fixed script. Treat the "
        "FINAL user message as the new turn and compare it carefully with history. "
        "Acknowledge or praise ONLY information actually present in that final "
        "message. Never say they repeated their name, age, country, order, or any "
        "other detail unless those words are genuinely in the final message. Do not "
        "re-teach an objective already completed in history; move to the next unmet "
        "objective and make the exchange feel like a connected conversation. When "
        "the learner asks the scene character a question, answer that question as "
        "part of the simulation, but narrate it naturally in Turkish (for example, "
        "'Leo sana İspanya'dan geldiğini söylüyor'). Then bridge directly to the "
        "next exchange. Every reply must feel like a response to the learner, not "
        "a detached lesson card or a repeated checklist."
    )


def _fetch_knowledge_block(scenario_id: str, user_transcript: str, match_count: int) -> str:
    """The actual network-bound RAG lookup (embedding + vector RPC), isolated
    so the caller can time-box it independently of everything else in the
    system prompt. Best-effort: returns "(none)" on any failure instead of
    raising — a missing/failing RAG lookup should never crash the turn (see
    generate_reply's own clear error for an actually-missing OPENAI_API_KEY)."""
    if not settings.openai_api_key:
        return "(none)"
    try:
        query_embedding = embed_texts([user_transcript])[0]
        db = get_service_client()
        matches = (
            db.rpc(
                "match_scenario_knowledge",
                {
                    "query_embedding": query_embedding,
                    "match_scenario_id": scenario_id,
                    "match_count": match_count,
                },
            )
            .execute()
            .data
        )
        return "\n".join(f"- {row['content']}" for row in matches) or "(none)"
    except Exception:
        logger.exception("RAG retrieval failed for scenario %s — using base system prompt", scenario_id)
        return "(none)"


async def build_enriched_system_prompt(
    scenario_id: str,
    scenario_title: str,
    base_system_prompt: str,
    cefr_level: str | None,
    user_transcript: str,
    match_count: int = DEFAULT_MATCH_COUNT,
    objectives: list[dict] | None = None,
    rag_timeout_seconds: float = DEFAULT_RAG_TIMEOUT_SECONDS,
) -> str:
    """Retrieves the scenario knowledge + Turkish-speaker error patterns most
    relevant to what the user just said, and folds them into the LLM system
    prompt. Called once per voice turn (`ws_session.py`) and once per text
    chat turn.

    Async + time-boxed (Ek 34): RAG used to be a synchronous, unbounded call
    — a slow embedding or `match_scenario_knowledge` RPC could itself become
    the single biggest contributor to "Düşünüyor…" latency, before the main
    LLM call had even started. Now the lookup races a hard timeout; if it
    loses, the turn proceeds with "(none)" instead of waiting."""
    try:
        knowledge_block = await asyncio.wait_for(
            asyncio.to_thread(_fetch_knowledge_block, scenario_id, user_transcript, match_count),
            timeout=rag_timeout_seconds,
        )
    except TimeoutError:
        logger.warning(
            "RAG retrieval exceeded %.1fs for scenario %s — proceeding without it",
            rag_timeout_seconds,
            scenario_id,
        )
        knowledge_block = "(none)"

    return (
        f"{base_system_prompt}\n\n"
        f"--- Scenario: {scenario_title} ---\n"
        f"Learner CEFR level: {cefr_level or 'unknown'}. Adjust vocabulary and pace accordingly.\n\n"
        f"--- Relevant context & common Turkish-speaker mistakes to watch for ---\n"
        f"{knowledge_block}"
        f"{_build_objectives_block(objectives)}"
        f"{_build_beginner_teacher_block(cefr_level)}"
    )
