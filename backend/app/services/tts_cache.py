"""On-disk cache for synthesized speech, so the same text is paid for once.

Repeated texts are common: every scene's opening line, the teacher-mode intro, vocabulary and mispronounced-word
pronunciations. Cartesia bills per character, so a repeat served from disk costs nothing.

* Key = sha256(provider|voice|language|normalised text); only the primary provider's audio is stored, so a fallback
  voice never outlives an outage.
* Bounded by TTS_CACHE_MAX_MB (default 1024): when it grows past the limit the least recently *used* files go first
  (a hit refreshes the file's timestamp, so popular lines stay).
* Any disk problem simply disables caching for that call; speech is still produced.
"""
import asyncio
import hashlib
import logging
import os
import re
import tempfile
import time
from pathlib import Path

logger = logging.getLogger(__name__)

CACHE_DIR = Path(os.getenv("TTS_CACHE_DIR", "/srv/tts_cache"))
MAX_BYTES = int(os.getenv("TTS_CACHE_MAX_MB", "1024")) * 1024 * 1024
MAX_TEXT_CHARS = 600
_EVICT_EVERY = 40

_puts = 0
_enabled: bool | None = None


def _ready() -> bool:
    global _enabled
    if _enabled is None:
        try:
            CACHE_DIR.mkdir(parents=True, exist_ok=True)
            probe = CACHE_DIR / ".probe"
            probe.write_bytes(b"1")
            probe.unlink()
            _enabled = True
        except OSError:
            logger.warning("TTS cache disabled: %s is not writable", CACHE_DIR)
            _enabled = False
    return _enabled


def cache_key(provider: str, voice_id: str, language: str | None, text: str) -> str:
    normalised = re.sub(r"\s+", " ", text).strip()
    return hashlib.sha256(f"{provider}|{voice_id}|{language or ''}|{normalised}".encode()).hexdigest()


def _path(key: str) -> Path:
    return CACHE_DIR / key[:2] / f"{key}.wav"


def _read(key: str) -> bytes | None:
    path = _path(key)
    try:
        data = path.read_bytes()
        os.utime(path)  # recently used -> evicted last
        return data
    except OSError:
        return None


def _evict() -> None:
    files = []
    total = 0
    for p in CACHE_DIR.glob("*/*.wav"):
        try:
            st = p.stat()
        except OSError:
            continue
        files.append((st.st_mtime, st.st_size, p))
        total += st.st_size
    if total <= MAX_BYTES:
        return
    target = int(MAX_BYTES * 0.8)
    for _, size, p in sorted(files):
        try:
            p.unlink()
        except OSError:
            continue
        total -= size
        if total <= target:
            break


def _write(key: str, audio: bytes) -> None:
    global _puts
    path = _path(key)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=path.parent, suffix=".tmp")
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(audio)
        os.replace(tmp, path)
    except OSError:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        return
    _puts += 1
    if _puts % _EVICT_EVERY == 0:
        _evict()


async def get_cached(provider: str, voice_id: str, language: str | None, text: str) -> bytes | None:
    if len(text) > MAX_TEXT_CHARS or not _ready():
        return None
    return await asyncio.to_thread(_read, cache_key(provider, voice_id, language, text))


async def put_cached(provider: str, voice_id: str, language: str | None, text: str, audio: bytes) -> None:
    if len(text) > MAX_TEXT_CHARS or not audio or not _ready():
        return
    try:
        await asyncio.to_thread(_write, cache_key(provider, voice_id, language, text), audio)
    except Exception:
        logger.warning("TTS cache write failed", exc_info=True)
