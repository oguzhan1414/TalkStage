import httpx

from app.core.config import settings

DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"


async def transcribe_audio(
    client: httpx.AsyncClient,
    audio_bytes: bytes,
    content_type: str,
    model: str = "nova-2",
) -> str:
    """One-shot (non-streaming) transcription of a full audio file via Deepgram's
    prerecorded REST API. Used for onboarding's voice calibration; the live
    conversation path uses the streaming client in app/services/stt_stream.py instead."""
    if not settings.deepgram_api_key:
        raise RuntimeError("DEEPGRAM_API_KEY is not configured")
    response = await client.post(
        DEEPGRAM_URL,
        params={"model": model, "smart_format": "true", "language": "en"},
        headers={
            "Authorization": f"Token {settings.deepgram_api_key}",
            "Content-Type": content_type,
        },
        content=audio_bytes,
        timeout=30.0,
    )
    response.raise_for_status()
    data = response.json()
    return data["results"]["channels"][0]["alternatives"][0]["transcript"]
