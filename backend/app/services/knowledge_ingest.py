from supabase import Client

from app.services.embeddings import chunk_text, embed_texts


def ingest_knowledge(
    db: Client,
    text: str,
    source: str,
    scenario_id: str | None = None,
    max_chars: int = 800,
) -> int:
    """Chunks `text`, embeds each chunk, and inserts it into scenario_knowledge.
    `scenario_id=None` stores a global chunk (e.g. a Turkish-speaker error pattern
    that applies across scenarios). Returns the number of chunks written."""
    chunks = chunk_text(text, max_chars=max_chars)
    if not chunks:
        return 0
    vectors = embed_texts(chunks)
    rows = [
        {
            "scenario_id": scenario_id,
            "content": chunk,
            "embedding": vector,
            "metadata": {"source": source},
        }
        for chunk, vector in zip(chunks, vectors)
    ]
    db.table("scenario_knowledge").insert(rows).execute()
    return len(rows)
