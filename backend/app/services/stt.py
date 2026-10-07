import httpx

from app.core.config import settings

DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"
# Groq exposes an OpenAI-compatible transcription endpoint — same API shape
# text_chat.py already relies on for chat, just a different route.
GROQ_TRANSCRIPTION_URL = "https://api.groq.com/openai/v1/audio/transcriptions"
GROQ_STT_MODEL = "whisper-large-v3-turbo"


async def transcribe_audio(
    client: httpx.AsyncClient,
    audio_bytes: bytes,
    content_type: str,
    model: str = "nova-2",
) -> str:
    """One-shot (non-streaming) transcription of a full audio file. Used for
    onboarding's voice calibration; the live conversation path uses the
    streaming client in app/services/stt_stream.py instead (left on Deepgram
    — this provider swap only applies to this one-shot REST path).

    Prefers Groq's Whisper (already configured for Yazarak Sohbet, and
    ~4-7x cheaper per minute than Deepgram for this short, non-realtime
    use case) and falls back to Deepgram if Groq isn't configured — same
    "prefer the cheaper option, degrade gracefully" pattern as
    llm_orchestrator.py's OpenAI/Groq client selection.
    """
    if settings.deepgram_api_key:
        try:
            return await _transcribe_deepgram(client, audio_bytes, content_type, model)
        except Exception:
            if settings.groq_api_key:
                return await _transcribe_groq(client, audio_bytes, content_type)
            raise
    if settings.groq_api_key:
        return await _transcribe_groq(client, audio_bytes, content_type)
    raise RuntimeError("Neither DEEPGRAM_API_KEY nor GROQ_API_KEY is configured")


async def _transcribe_groq(client: httpx.AsyncClient, audio_bytes: bytes, content_type: str) -> str:
    response = await client.post(
        GROQ_TRANSCRIPTION_URL,
        headers={"Authorization": f"Bearer {settings.groq_api_key}"},
        files={"file": ("answer.m4a", audio_bytes, content_type)},
        data={"model": GROQ_STT_MODEL, "language": "en"},
        timeout=30.0,
    )
    response.raise_for_status()
    return response.json()["text"]


async def _transcribe_deepgram(
    client: httpx.AsyncClient, audio_bytes: bytes, content_type: str, model: str
) -> str:
    if not settings.deepgram_api_key:
        raise RuntimeError("Neither GROQ_API_KEY nor DEEPGRAM_API_KEY is configured")
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
