"""Pre-generate the speech of the word lists into the TTS disk cache, so nobody waits on the first listen.

The words are the Kütüphane library (with antonyms) and the Telaffuz list (prewarm_words.json, exported from the app
data). Each is synthesized exactly as the app asks for it (English, Mivo's voice), so the cache key matches;
words already in the cache cost nothing. Run inside the API container, where the cache volume lives:

    docker compose exec -T api python -m app.tools.prewarm_tts            # all
    docker compose exec -T api python -m app.tools.prewarm_tts --limit 5  # try a few first
"""
import argparse
import asyncio
import json
from pathlib import Path

import httpx

from app.core.config import settings
from app.services.tts_cache import get_cached
from app.services.tts_stream import synthesize_speech

WORDS = Path(__file__).with_name("prewarm_words.json")


async def main(limit: int | None, concurrency: int) -> None:
    words: list[str] = json.loads(WORDS.read_text(encoding="utf-8"))
    if limit:
        words = words[:limit]
    provider = "cartesia" if settings.tts_provider == "cartesia" else "openai"
    print(f"{len(words)} words, provider {provider}")
    done = cached = failed = 0
    chars = 0
    sem = asyncio.Semaphore(concurrency)

    async with httpx.AsyncClient() as client:
        async def one(word: str) -> None:
            nonlocal done, cached, failed, chars
            async with sem:
                voice = settings.cartesia_voice_id if provider == "cartesia" else ""
                if provider == "cartesia" and await get_cached("cartesia", voice, "en", word) is not None:
                    cached += 1
                    return
                try:
                    await synthesize_speech(client, word, settings.cartesia_voice_id, language="en")
                    done += 1
                    chars += len(word)
                except Exception as exc:  # keep going; a rerun only fills the gaps
                    failed += 1
                    print(f"  failed: {word!r}: {exc}")
                if (done + failed) % 100 == 0:
                    print(f"  {done} made, {cached} already cached, {failed} failed")

        await asyncio.gather(*(one(w) for w in words))
    print(f"finished: {done} made ({chars} characters billed), {cached} already cached, {failed} failed")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--concurrency", type=int, default=3)
    args = ap.parse_args()
    asyncio.run(main(args.limit, args.concurrency))
