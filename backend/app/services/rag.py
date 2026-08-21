from app.core.supabase_client import get_service_client
from app.services.embeddings import embed_texts

DEFAULT_MATCH_COUNT = 6


def build_enriched_system_prompt(
    scenario_id: str,
    scenario_title: str,
    base_system_prompt: str,
    cefr_level: str | None,
    user_transcript: str,
    match_count: int = DEFAULT_MATCH_COUNT,
) -> str:
    """Retrieves the scenario knowledge + Turkish-speaker error patterns most
    relevant to what the user just said, and folds them into the LLM system prompt.
    This is what the LLM orchestrator (app/services/llm_orchestrator.py) calls each turn."""
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

    knowledge_block = "\n".join(f"- {row['content']}" for row in matches) or "(none)"

    return (
        f"{base_system_prompt}\n\n"
        f"--- Scenario: {scenario_title} ---\n"
        f"Learner CEFR level: {cefr_level or 'unknown'}. Adjust vocabulary and pace accordingly.\n\n"
        f"--- Relevant context & common Turkish-speaker mistakes to watch for ---\n"
        f"{knowledge_block}"
    )
