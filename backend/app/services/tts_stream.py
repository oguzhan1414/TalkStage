import asyncio
import logging
import time

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
OPENAI_TTS_URL = "https://api.openai.com/v1/audio/speech"
OPENAI_TTS_MODEL = "tts-1"
OPENAI_TTS_VOICE = "nova"
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


def tts_available() -> bool:
    """Sesli cevap üretilebilir mi: Cartesia ya da yedek olarak OpenAI TTS anahtarı var mı."""
    return cartesia_configured() or bool(settings.openai_api_key)


async def _openai_tts(client: httpx.AsyncClient, text: str) -> bytes:
    """Cartesia kullanılamıyorsa yedek sağlayıcı (aynı WAV çıktısı)."""
    response = await client.post(
        OPENAI_TTS_URL,
        headers={"Authorization": f"Bearer {settings.openai_api_key}"},
        json={"model": OPENAI_TTS_MODEL, "voice": OPENAI_TTS_VOICE, "input": text, "response_format": "wav"},
        timeout=30.0,
    )
    response.raise_for_status()
    return response.content


async def synthesize_speech(
    client: httpx.AsyncClient,
    text: str,
    voice_id: str,
    language: str | None = None,
) -> bytes:
    """Önce Cartesia; hesap/kredi sorunu (401/402/403), kota (429) ya da sağlayıcı hatasında OpenAI TTS."""
    global _cartesia_down_until
    fallback_ok = bool(settings.openai_api_key)
    if cartesia_configured() and time.monotonic() >= _cartesia_down_until:
        try:
            return await _cartesia_tts(client, text, voice_id, language)
        except httpx.HTTPStatusError as exc:
            code = exc.response.status_code
            if code in (401, 402, 403):
                _cartesia_down_until = time.monotonic() + _CARTESIA_RETRY_AFTER_SECONDS
                logger.warning("Cartesia TTS reddedildi (HTTP %s: hesap/kredi?). %s dk boyunca yedek TTS kullanılacak.",
                               code, _CARTESIA_RETRY_AFTER_SECONDS // 60)
            else:
                logger.warning("Cartesia TTS hatası HTTP %s; bu istek için yedek TTS deneniyor.", code)
            if not fallback_ok:
                raise
        except (httpx.HTTPError, asyncio.TimeoutError):
            logger.warning("Cartesia TTS ulaşılamadı; bu istek için yedek TTS deneniyor.")
            if not fallback_ok:
                raise
    if not fallback_ok:
        raise RuntimeError("Neither Cartesia nor OpenAI TTS is configured")
    return await _openai_tts(client, text)
