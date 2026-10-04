import httpx
from fastapi import APIRouter, Depends, File, UploadFile
from pydantic import BaseModel

from app.api.deps import AuthContext, get_auth_context
from app.services.stt import transcribe_audio

router = APIRouter(prefix="/speech", tags=["speech"])


class TranscribeResult(BaseModel):
    transcript: str


@router.post("/transcribe", response_model=TranscribeResult)
async def transcribe(
    audio: UploadFile = File(...),
    ctx: AuthContext = Depends(get_auth_context),
) -> TranscribeResult:
    """Generic one-shot speech-to-text (same Groq-Whisper-preferred,
    Deepgram-fallback path as onboarding's voice calibration — see
    app/services/stt.py — just not tied to a CEFR assessment). First consumer:
    the 3D video scenario modal's "did the user actually say it" check."""
    audio_bytes = await audio.read()
    content_type = audio.content_type or "audio/wav"
    async with httpx.AsyncClient() as http_client:
        transcript = await transcribe_audio(http_client, audio_bytes, content_type)
    return TranscribeResult(transcript=transcript)
