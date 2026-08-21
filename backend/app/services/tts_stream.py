import httpx

from app.core.config import settings

CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
CARTESIA_VERSION = "2024-06-10"
DEFAULT_MODEL = "sonic-english"


async def synthesize_speech(client: httpx.AsyncClient, text: str, voice_id: str) -> bytes:
    if not settings.cartesia_api_key:
        raise RuntimeError("CARTESIA_API_KEY is not configured")
    response = await client.post(
        CARTESIA_URL,
        headers={
            "X-API-Key": settings.cartesia_api_key,
            "Cartesia-Version": CARTESIA_VERSION,
            "Content-Type": "application/json",
        },
        json={
            "model_id": DEFAULT_MODEL,
            "transcript": text,
            "voice": {"mode": "id", "id": voice_id},
            "output_format": {
                "container": "wav",
                "encoding": "pcm_s16le",
                "sample_rate": 24000,
            },
        },
        timeout=30.0,
    )
    response.raise_for_status()
    return response.content
