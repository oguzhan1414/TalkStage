import asyncio
import hashlib
import logging
import time

import httpx

from app.core.config import settings
from app.services.tts_cache import get_cached, put_cached

logger = logging.getLogger(__name__)

CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
OPENAI_TTS_URL = "https://api.openai.com/v1/audio/speech"

# Mivo's voice style: OpenAI.fm's "Eternal Optimist" vibe (openai/openai-fm src/lib/library.ts), which the user
# picked with the Marin voice, plus one line for learners. gpt-4o-mini-tts follows it; tts-1 ignores it.
MIVO_VOICE_INSTRUCTIONS = (
    "Voice: Warm, upbeat, and reassuring, with a steady and confident cadence that keeps the conversation calm "
    "and productive.\n\n"
    "Tone: Positive and solution-oriented, always focusing on the next steps rather than dwelling on the problem.\n\n"
    "Dialect: Neutral and professional, avoiding overly casual speech but maintaining a friendly and approachable "
    "style.\n\n"
    "Pronunciation: Clear and precise, with a natural rhythm that emphasizes key words to instill confidence and "
    "keep the listener engaged.\n\n"
    "Features: Uses empathetic phrasing, gentle reassurance, and proactive language to shift the focus from "
    "frustration to resolution.\n\n"
    "Pace: The listener is learning English, so speak a little slower than usual and never swallow words."
)
_INSTRUCTIONS_TAG = hashlib.sha256(MIVO_VOICE_INSTRUCTIONS.encode()).hexdigest()[:8]
# Cartesia hesap/kredi hatası (401/402/403) alırsa bu süre boyunca hiç denenmez (her cümlede boşuna 1 sn kaybetmesin).
_CARTESIA_RETRY_AFTER_SECONDS = 600
_cartesia_down_until = 0.0

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


async def _cartesia_tts(
    client: httpx.AsyncClient,
    text: str,
    voice_id: str,
    language: str | None = None,
) -> bytes:
    if not settings.cartesia_api_key:
        raise RuntimeError("CARTESIA_API_KEY is not configured")
    import re

    cleaned_text = re.sub(r'[\U00010000-\U0010ffff]', '', text).strip()
    if not cleaned_text:
        cleaned_text = text.strip()

    payload = {
        "model_id": DEFAULT_MODEL,
        "transcript": cleaned_text,
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


def cartesia_configured() -> bool:
    return bool(settings.cartesia_api_key and settings.cartesia_voice_id)


def openai_tts_configured() -> bool:
    return bool(settings.openai_api_key)


def tts_available() -> bool:
    """Sesli cevap üretilebilir mi: OpenAI ya da Cartesia anahtarı var mı."""
    return openai_tts_configured() or cartesia_configured()


def _openai_voice_key() -> str:
    """Cache "voice" for OpenAI: model + voice + style, so changing any of them never serves old audio."""
    return f"{settings.openai_tts_model}:{settings.openai_tts_voice}:{_INSTRUCTIONS_TAG}"


async def _openai_tts(client: httpx.AsyncClient, text: str) -> bytes:
    """gpt-4o-mini-tts with Mivo's voice and style; 24 kHz 16-bit mono WAV like Cartesia's output."""
    body = {
        "model": settings.openai_tts_model,
        "voice": settings.openai_tts_voice,
        "input": text,
        "response_format": "wav",
    }
    if not settings.openai_tts_model.startswith("tts-1"):  # tts-1 / tts-1-hd take no style instructions
        body["instructions"] = MIVO_VOICE_INSTRUCTIONS
    response = await client.post(
        OPENAI_TTS_URL,
        headers={"Authorization": f"Bearer {settings.openai_api_key}"},
        json=body,
        timeout=30.0,
    )
    response.raise_for_status()
    return response.content


async def _via_openai(client: httpx.AsyncClient, text: str, language: str | None) -> bytes:
    key = _openai_voice_key()
    cached = await get_cached("openai", key, language, text)
    if cached is not None:
        return cached
    audio = await _openai_tts(client, text)
    await put_cached("openai", key, language, text, audio)
    return audio


async def _via_cartesia(client: httpx.AsyncClient, text: str, voice_id: str, language: str | None) -> bytes:
    global _cartesia_down_until
    if time.monotonic() < _cartesia_down_until:
        raise RuntimeError("Cartesia is paused after an account/credit error")
    cached = await get_cached("cartesia", voice_id, language, text)
    if cached is not None:
        return cached
    try:
        audio = await _cartesia_tts(client, text, voice_id, language)
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code in (401, 402, 403):
            _cartesia_down_until = time.monotonic() + _CARTESIA_RETRY_AFTER_SECONDS
            logger.warning("Cartesia TTS reddedildi (HTTP %s: hesap/kredi?). %s dk boyunca denenmeyecek.",
                           exc.response.status_code, _CARTESIA_RETRY_AFTER_SECONDS // 60)
        raise
    await put_cached("cartesia", voice_id, language, text, audio)
    return audio


async def synthesize_speech(
    client: httpx.AsyncClient,
    text: str,
    voice_id: str,
    language: str | None = None,
) -> bytes:
    """Mivo's voice from the configured provider (settings.tts_provider, OpenAI by default); the other one, when
    configured, is the fallback for account/credit problems, rate limits and outages. Both are cached on disk, so a
    repeated line is paid for once."""
    order = ["cartesia", "openai"] if settings.tts_provider == "cartesia" else ["openai", "cartesia"]
    providers = [p for p in order if (openai_tts_configured() if p == "openai" else cartesia_configured())]
    if not providers:
        raise RuntimeError("Neither OpenAI nor Cartesia TTS is configured")

    last_error: Exception | None = None
    for i, provider in enumerate(providers):
        try:
            if provider == "openai":
                return await _via_openai(client, text, language)
            return await _via_cartesia(client, text, voice_id, language)
        except (httpx.HTTPError, asyncio.TimeoutError, RuntimeError) as exc:
            last_error = exc
            if i + 1 < len(providers):
                logger.warning("%s TTS failed (%s); trying %s for this line.", provider, exc, providers[i + 1])
    assert last_error is not None
    raise last_error
