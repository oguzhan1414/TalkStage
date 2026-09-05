from functools import lru_cache

from openai import OpenAI

from app.core.config import settings

EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSIONS = 1536  # must match scenario_knowledge.embedding vector(1536)


@lru_cache
def get_openai_client() -> OpenAI:
    # Same reasoning as llm_orchestrator.py's voice-turn client: no timeout
    # meant the SDK's 600s default could turn a single slow embedding call
    # into the dominant source of "Düşünüyor…" latency in the voice pipeline
    # (this client backs RAG retrieval, which runs before the main LLM call).
    return OpenAI(api_key=settings.openai_api_key, timeout=8.0, max_retries=1)


def chunk_text(text: str, max_chars: int = 800) -> list[str]:
    """Paragraph-first chunking; falls back to sentence splitting for long paragraphs."""
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    for paragraph in paragraphs:
        if len(paragraph) <= max_chars:
            chunks.append(paragraph)
            continue
        buffer = ""
        for sentence in paragraph.replace("\n", " ").split(". "):
            candidate = f"{buffer} {sentence}".strip()
            if len(candidate) > max_chars and buffer:
                chunks.append(buffer.strip())
                buffer = sentence
            else:
                buffer = candidate
        if buffer:
            chunks.append(buffer.strip())
    return chunks


def embed_texts(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    response = get_openai_client().embeddings.create(model=EMBEDDING_MODEL, input=texts)
    return [item.embedding for item in response.data]
