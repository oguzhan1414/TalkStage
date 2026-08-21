import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.api.deps import AuthContext, get_auth_context
from app.core.config import settings
from app.schemas.tts import PronounceRequest
from app.services.tts_stream import synthesize_speech

router = APIRouter(prefix="/tts", tags=["tts"])


@router.post("/pronounce")
async def pronounce(payload: PronounceRequest, ctx: AuthContext = Depends(get_auth_context)) -> Response:
    """Single word/phrase -> spoken audio. Backs the vocab card pronunciation button
    (mobile Görev 12) and the Reading module's tap-a-word-to-listen (Görev 14) — both
    reuse this instead of duplicating a TTS call."""
    if not settings.cartesia_voice_id:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TTS voice not configured")
    async with httpx.AsyncClient() as client:
        audio = await synthesize_speech(client, payload.text, settings.cartesia_voice_id)
    return Response(content=audio, media_type="audio/wav")
