import hashlib
import re
from functools import lru_cache

import redis.asyncio as redis

from app.core.config import settings
from app.services.llm_orchestrator import OrchestratorReply

CACHE_TTL_SECONDS = 60 * 60 * 24  # 24h — a scenario's opening greeting doesn't go stale
_NORMALIZE_RE = re.compile(r"[^a-z0-9\s]")


@lru_cache
def get_redis_client() -> "redis.Redis | None":
    if not settings.redis_url:
        return None
    return redis.from_url(settings.redis_url, decode_responses=True)


def _cache_key(scenario_id: str, user_transcript: str) -> str:
    normalized = _NORMALIZE_RE.sub("", user_transcript.lower().strip())
    normalized = " ".join(normalized.split())
    digest = hashlib.sha256(normalized.encode()).hexdigest()
    return f"reply_cache:{scenario_id}:{digest}"


async def get_cached_reply(scenario_id: str, user_transcript: str) -> OrchestratorReply | None:
    """Only meant to be called for a session's first turn — cached replies don't
    account for conversation history, so reusing them mid-conversation would be wrong."""
    client = get_redis_client()
    if client is None:
        return None
    raw = await client.get(_cache_key(scenario_id, user_transcript))
    if raw is None:
        return None
    return OrchestratorReply.model_validate_json(raw)


async def set_cached_reply(scenario_id: str, user_transcript: str, reply: OrchestratorReply) -> None:
    client = get_redis_client()
    if client is None:
        return
    await client.set(_cache_key(scenario_id, user_transcript), reply.model_dump_json(), ex=CACHE_TTL_SECONDS)
