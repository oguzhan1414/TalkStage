"""Cost guards for the paid providers behind the voice rooms and the AI endpoints (Deepgram, OpenAI, Cartesia).

Two independent limits, both per user:
  * a daily allowance of voice seconds (the room closes with reason `daily_voice_limit` once it is used up)
  * a sliding-window request limit for the plain HTTP endpoints that call a paid model

Counters live in Redis when REDIS_URL is set (so every worker and restart shares them) and fall back to process
memory otherwise. A Redis outage never blocks a user: the guards fail open.
"""
import logging
import time
from collections import defaultdict, deque
from datetime import datetime, timezone

from fastapi import Depends, HTTPException, status

from app.api.deps import AuthContext, get_auth_context
from app.services.cache import get_redis_client

logger = logging.getLogger(__name__)

# Generous for a real learner (a few scenes and a chat), a hard stop for a runaway client.
DAILY_VOICE_SECONDS = 45 * 60

_memory_voice: dict[str, int] = defaultdict(int)
_memory_hits: dict[str, deque] = defaultdict(deque)


def _day() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


async def voice_seconds_left(user_id: str) -> int:
    key = f"voice_used:{user_id}:{_day()}"
    used = 0
    client = get_redis_client()
    try:
        if client is not None:
            used = int(await client.get(key) or 0)
        else:
            used = _memory_voice[key]
    except Exception:
        logger.warning("voice allowance lookup failed; allowing", exc_info=True)
    return max(0, DAILY_VOICE_SECONDS - used)


async def add_voice_seconds(user_id: str, seconds: float) -> None:
    amount = int(max(0, seconds))
    if amount == 0:
        return
    key = f"voice_used:{user_id}:{_day()}"
    client = get_redis_client()
    try:
        if client is not None:
            await client.incrby(key, amount)
            await client.expire(key, 2 * 24 * 3600)
        else:
            _memory_voice[key] += amount
    except Exception:
        logger.warning("voice usage write failed", exc_info=True)


async def _allow(bucket: str, user_id: str, limit: int, window: int) -> bool:
    client = get_redis_client()
    try:
        if client is not None:
            key = f"rl:{bucket}:{user_id}:{int(time.time()) // window}"
            count = await client.incr(key)
            if count == 1:
                await client.expire(key, window + 5)
            return count <= limit
        now = time.monotonic()
        hits = _memory_hits[f"{bucket}:{user_id}"]
        while hits and hits[0] < now - window:
            hits.popleft()
        if len(hits) >= limit:
            return False
        hits.append(now)
        return True
    except Exception:
        logger.warning("rate limit check failed; allowing", exc_info=True)
        return True


def rate_limit(bucket: str, limit: int, window: int = 60):
    """FastAPI dependency: at most `limit` calls per `window` seconds per user, otherwise HTTP 429."""

    async def dependency(ctx: AuthContext = Depends(get_auth_context)) -> None:
        if not await _allow(bucket, ctx.user.id, limit, window):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests",
                headers={"Retry-After": str(window)},
            )

    return dependency
