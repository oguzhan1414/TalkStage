"""Small on-demand translations for the voice rooms: a whole message into the learner's language, or one tapped
word's meaning in its sentence. Only made when the learner asks (a "Çevir" tap, a word tap), and each answer is kept
in memory so the same text is never paid for twice on this server.
"""
import asyncio
from collections import OrderedDict

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context
from app.services.llm_orchestrator import _client
from app.services.usage_guard import rate_limit

router = APIRouter(prefix="/translate", tags=["translate"])

LANGS = {"tr": "Turkish", "en": "English", "es": "Spanish", "pt": "Brazilian Portuguese", "de": "German"}
_CACHE: "OrderedDict[str, str]" = OrderedDict()
_CACHE_MAX = 4000


class TextIn(BaseModel):
    text: str = Field(min_length=1, max_length=1200)
    target: str = Field(pattern="^(tr|en|es|pt|de)$")


class WordIn(BaseModel):
    word: str = Field(min_length=1, max_length=60)
    sentence: str = Field(default="", max_length=600)
    target: str = Field(pattern="^(tr|en|es|pt|de)$")


class TextOut(BaseModel):
    translation: str


class WordOut(BaseModel):
    meaning: str


def _remember(key: str, value: str) -> str:
    _CACHE[key] = value
    _CACHE.move_to_end(key)
    while len(_CACHE) > _CACHE_MAX:
        _CACHE.popitem(last=False)
    return value


def _ask(system: str, user: str, max_tokens: int) -> str:
    client, model, is_openai = _client()
    kwargs = {} if is_openai else {"reasoning_effort": "low"}
    completion = client.chat.completions.create(
        model=model,
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
        max_completion_tokens=max_tokens,
        **kwargs,
    )
    return (completion.choices[0].message.content or "").strip().strip('"').strip()


@router.post("/text", response_model=TextOut, dependencies=[Depends(rate_limit("translate_text", 40))])
async def translate_text(payload: TextIn, ctx: AuthContext = Depends(get_auth_context)) -> TextOut:
    key = f"t|{payload.target}|{payload.text.strip()}"
    if key in _CACHE:
        _CACHE.move_to_end(key)
        return TextOut(translation=_CACHE[key])
    system = (
        f"Translate the user's message into natural, simple {LANGS[payload.target]}. "
        "Keep names as they are. Return only the translation, no quotes, no notes."
    )
    try:
        out = await asyncio.wait_for(asyncio.to_thread(_ask, system, payload.text.strip(), 500), timeout=15)
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Translation unavailable") from None
    if not out:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Translation unavailable")
    return TextOut(translation=_remember(key, out))


@router.post("/word", response_model=WordOut, dependencies=[Depends(rate_limit("translate_word", 60))])
async def word_meaning(payload: WordIn, ctx: AuthContext = Depends(get_auth_context)) -> WordOut:
    word = payload.word.strip()
    key = f"w|{payload.target}|{word.lower()}|{payload.sentence.strip()}"
    if key in _CACHE:
        _CACHE.move_to_end(key)
        return WordOut(meaning=_CACHE[key])
    system = (
        f"Give the meaning of the English word as it is used in the sentence, in {LANGS[payload.target]}. "
        "Answer with one to four words only (the translation), no explanation, no quotes."
    )
    user = f"Word: {word}\nSentence: {payload.sentence.strip() or word}"
    try:
        out = await asyncio.wait_for(asyncio.to_thread(_ask, system, user, 120), timeout=12)
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Meaning unavailable") from None
    if not out:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Meaning unavailable")
    return WordOut(meaning=_remember(key, out[:80]))
