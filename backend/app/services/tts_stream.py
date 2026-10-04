import asyncio

import httpx

from app.core.config import settings

CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
# Both of these were stale (dated mid-2024) and silently started failing every
# TTS call with 400 — "sonic-english" isn't in Cartesia's current model enum
# (sonic-3.6/3.5/3/latest) and the version header had aged out. Verified
# against Cartesia's current API docs (docs.cartesia.ai/api-reference/tts/bytes).
CARTESIA_VERSION = "2026-08-14"
DEFAULT_MODEL = "sonic-3.6"

# Cartesia's Free plan allows at most 2 concurrent TTS requests (see
# docs.cartesia.ai/use-the-api/concurrency-limits-and-timeouts) — but
# `_SentenceSpeaker` (ws_session.py) deliberately fires one synthesis request
# per sentence as soon as its text is ready, with no cap, to pipeline TTS
# against the LLM stream. For any reply with 3+ sentences (or one that
# overlaps the scenario's opening-line call), that blew past the limit and
# every extra request came back 429 — silently degrading to text-only, which
# is why "the AI doesn't sound like it's responding" even though nothing
# crashed. Global (process-wide, not per-connection) because the limit is
# per API key, not per conversation.
_CARTESIA_CONCURRENCY = asyncio.Semaphore(2)


async def synthesize_speech(
    client: httpx.AsyncClient,
    text: str,
    voice_id: str,
    language: str | None = None,
) -> bytes:
    if not settings.cartesia_api_key:
        raise RuntimeError("CARTESIA_API_KEY is not configured")
    payload = {
        "model_id": DEFAULT_MODEL,
        "transcript": text,
        "voice": voice_id,
        "output_format": {
            "container": "wav",
            "encoding": "pcm_s16le",
            "sample_rate": 24000,
        },
    }
    if language:
        payload["language"] = language

    async with _CARTESIA_CONCURRENCY:
        response = await client.post(
            CARTESIA_URL,
            headers={
                "Authorization": f"Bearer {settings.cartesia_api_key}",
                "Cartesia-Version": CARTESIA_VERSION,
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=30.0,
        )
        if response.status_code == 400 and language:
            # Fallback retry without language tag
            payload_no_lang = dict(payload)
            payload_no_lang.pop("language", None)
            response = await client.post(
                CARTESIA_URL,
                headers={
                    "Authorization": f"Bearer {settings.cartesia_api_key}",
                    "Cartesia-Version": CARTESIA_VERSION,
                    "Content-Type": "application/json",
                },
                json=payload_no_lang,
                timeout=30.0,
            )
    response.raise_for_status()
    return response.content
