"""Isolated TTS latency test — Cartesia Sonic REST synthesis.

Usage:
  python scripts/test_tts_latency.py "Hello, how can I help?" --voice-id <cartesia_voice_id>
"""

import argparse
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.config import settings  # noqa: E402

CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
CARTESIA_VERSION = "2024-06-10"


def synthesize(text: str, voice_id: str, out_path: Path) -> float:
    if not settings.cartesia_api_key:
        raise SystemExit("CARTESIA_API_KEY is not set in backend/.env")

    started = time.perf_counter()
    response = httpx.post(
        CARTESIA_URL,
        headers={
            "X-API-Key": settings.cartesia_api_key,
            "Cartesia-Version": CARTESIA_VERSION,
            "Content-Type": "application/json",
        },
        json={
            "model_id": "sonic-english",
            "transcript": text,
            "voice": {"mode": "id", "id": voice_id},
            "output_format": {
                "container": "wav",
                "encoding": "pcm_s16le",
                "sample_rate": 24000,
            },
        },
        timeout=30.0,
    )
    elapsed = time.perf_counter() - started
    response.raise_for_status()
    out_path.write_bytes(response.content)
    return elapsed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("text")
    parser.add_argument("--voice-id", required=True, help="Cartesia voice id, see https://play.cartesia.ai")
    parser.add_argument("--out", type=Path, default=Path("tts_output.wav"))
    args = parser.parse_args()

    seconds = synthesize(args.text, args.voice_id, args.out)
    print(f"Latency: {seconds * 1000:.0f}ms")
    print(f"Saved to {args.out}")
