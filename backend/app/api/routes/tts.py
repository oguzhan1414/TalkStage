import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.api.deps import AuthContext, get_auth_context
from app.core.config import settings
from app.schemas.tts import PronounceRequest
from app.services.tts_stream import synthesize_speech, tts_available

router = APIRouter(prefix="/tts", tags=["tts"])


def _detect_language(text: str) -> str:
    turkish_chars = set("çğıöşüÇĞİÖŞÜ")
    if any(c in turkish_chars for c in text):
        return "tr"
    common_tr_words = {
        "merhaba", "selam", "bugün", "nasılsın", "konuşmak", "ister",
        "için", "hakkında", "pratik", "yapalım", "ben", "mivo", "harika", "süper",
        "söyle", "diyebilirsin", "şimdi", "sen", "deneyelim"
    }
    words = {w.lower().strip(".,!?:;\"'") for w in text.split()}
    if words & common_tr_words:
        return "tr"
    return "en"


@router.post("/pronounce")
async def pronounce(payload: PronounceRequest, ctx: AuthContext = Depends(get_auth_context)) -> Response:
    """Single word/phrase -> spoken audio. Backs the vocab card pronunciation button
    (mobile Görev 12), Reading module tap-a-word, and Mivo's live coach voice."""
    if not tts_available():
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TTS voice not configured")
    lang = payload.language or _detect_language(payload.text)
    async with httpx.AsyncClient() as client:
        audio = await synthesize_speech(client, payload.text, settings.cartesia_voice_id, language=lang)
    return Response(content=audio, media_type="audio/wav")
