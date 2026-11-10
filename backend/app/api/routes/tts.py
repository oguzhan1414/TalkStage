import httpx
from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.api.deps import AuthContext, get_auth_context
from app.core.config import settings
from app.schemas.tts import PronounceRequest
from app.services.tts_stream import synthesize_speech, tts_available
from app.services.usage_guard import rate_limit

router = APIRouter(prefix="/tts", tags=["tts"])

# Words and short phrases (Kütüphane, Telaffuz, word cards) always use Cartesia: each is made once, kept in the
# disk cache for good, and stays the same voice even after Mivo's sentences move to another provider.
WORD_PROVIDER = "cartesia"


def is_word(text: str) -> bool:
    t = text.strip()
    return len(t) <= 40 and len(t.split()) <= 4


def _detect_language(text: str) -> str:
    # ö/ü/ç also occur in German/Portuguese/French, so only the Turkish-only letters decide.
    turkish_chars = set("ğıİşŞ")
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


@router.post("/pronounce", dependencies=[Depends(rate_limit("tts_pronounce", 30))])
async def pronounce(payload: PronounceRequest, ctx: AuthContext = Depends(get_auth_context)) -> Response:
    """Single word/phrase -> spoken audio. Backs the vocab card pronunciation button
    (mobile Görev 12), Reading module tap-a-word, and Mivo's live coach voice."""
    if not tts_available():
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TTS voice not configured")
    lang = payload.language or _detect_language(payload.text)
    async with httpx.AsyncClient() as client:
        audio = await synthesize_speech(
            client, payload.text, settings.cartesia_voice_id, language=lang, prefer=WORD_PROVIDER if is_word(payload.text) else None
        )
    return Response(content=audio, media_type="audio/wav")
