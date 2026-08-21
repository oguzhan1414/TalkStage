"""Isolated STT latency test — Deepgram Nova-2 prerecorded transcription.

This is a quick sanity/latency check against a static audio file, not the live
streaming path. The real streaming integration lives in
app/services/stt_stream.py (used by the /ws/session/{id} endpoint); the same
one-shot REST call this script exercises is also what
app/services/stt.py:transcribe_audio powers the /onboarding/calibrate endpoint with.

Usage:
  python scripts/test_stt_latency.py path/to/sample.wav
"""

import argparse
import asyncio
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.services.stt import transcribe_audio  # noqa: E402


async def transcribe(audio_path: Path, model: str = "nova-2") -> tuple[str, float]:
    audio_bytes = audio_path.read_bytes()
    mime = "audio/wav" if audio_path.suffix.lower() == ".wav" else "audio/mpeg"

    started = time.perf_counter()
    async with httpx.AsyncClient() as client:
        transcript = await transcribe_audio(client, audio_bytes, mime, model=model)
    elapsed = time.perf_counter() - started
    return transcript, elapsed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("audio_file", type=Path)
    parser.add_argument("--model", default="nova-2")
    args = parser.parse_args()

    text, seconds = asyncio.run(transcribe(args.audio_file, args.model))
    print(f"Latency: {seconds * 1000:.0f}ms")
    print(f"Transcript: {text}")
