"""
Makes the voice clips of the learning path with OpenAI gpt-4o-mini-tts and squeezes them to small mono MP3s.

Input is the manifest from mobile/scripts/export-path-audio.ts ([{key, text, kind, speaker?}]). Each clip is saved
as <out_dir>/<key>.mp3; clips that already exist are skipped, so after a text change only the changed lines cost
money. The narrator, words and drills use Mivo's voice (marin); story characters have their own voices.

Usage (from backend/): python scripts/generate_path_audio.py <manifest.json> <out_dir> [--limit N]
Needs OPENAI_API_KEY in backend/.env and ffmpeg on PATH.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

MODEL = "gpt-4o-mini-tts"

BASE = (
    "Natural, warm, friendly British English for a language-learning app. Relaxed and clear, like a kind friend "
    "chatting, never like a robot or a news reader. Speak at a calm pace so a beginner can follow."
)

VOICES: dict[str, tuple[str, str]] = {
    # speaker: (voice, personality)
    "(narrator)": ("marin", "You are Mivo, a cheerful, playful storyteller who loves helping learners."),
    "Maya": ("coral", "You are Maya, a cheerful, curious young woman in her twenties, new in the city and excited about everything."),
    "Leo": ("ash", "You are Leo, a relaxed, funny young musician in his twenties, easy-going and a bit cheeky."),
    "Rosa": ("sage", "You are Rosa, a warm, motherly woman in her sixties who runs a small café; lively and kind."),
    "Tom": ("verse", "You are Tom, an excited, playful ten-year-old boy; bright, bouncy and full of energy."),
    "Mr Patel": ("onyx", "You are Mr Patel, a gentle, calm elderly man with a soft, kind voice and a little smile in it."),
    "Mum": ("shimmer", "You are Maya's loving mother on the phone, caring and a little curious."),
    "The man": ("echo", "You are a friendly local man, polite and helpful."),
    "Doctor": ("nova", "You are a kind, calm doctor; clear and caring, with a gentle sense of humour."),
    "Teacher": ("fable", "You are a warm, encouraging primary school teacher who loves her pupils' ideas."),
    "Mr Hill": ("cedar", "You are Mr Hill, a very old, warm baker; slow, a little shy and deeply moved."),
    "Mr Grant": ("ballad", "You are Mr Grant, a tired, worried landlord in his sixties; serious at first, softening and kind later."),
    "Journalist": ("alloy", "You are Ana, a lively, curious local journalist, quick and friendly."),
    "Dr Shaw": ("fable", "You are Dr Shaw, an enthusiastic architect who loves old buildings; warm and full of wonder."),
    "Mrs Lane": ("shimmer", "You are Mrs Lane, an older neighbour; a little grumpy at first, then warm and funny."),
    "Sofia": ("nova", "You are Sofia, Rosa's happy, excited grown-up daughter who has big news."),
    "Lily": ("nova", "You are Lily, Tom's ten-year-old friend, a bright, kind girl who loves dancing; clear and lively."),
    "Ben": ("cedar", "You are Ben, a friendly music teacher and conductor; patient, warm, with a gentle sense of humour."),
    "Farmer": ("ballad", "You are a cheerful, proud old farmer from the countryside near Bristol; warm and slow-spoken."),
    "Danny": ("echo", "You are Danny, a shy fourteen-year-old boy who did something silly and is sorry; quiet, a little awkward."),
    "Investor": ("fable", "You are a confident, friendly investor from a start-up; warm, quick and encouraging."),
    "Dr Okafor": ("alloy", "You are Dr Okafor, an archaeologist full of excitement about history; clear, warm and curious."),
}

KIND_HINT = {
    "word": "Say only this single word or short phrase, clearly and warmly, slightly slower than normal.",
    "line": "This is a line from a story; say it naturally, with the feeling of the moment.",
    "sentence": "Say this example sentence clearly and naturally, slightly slower than normal.",
}


def load_env() -> dict[str, str]:
    env = {}
    for line in (Path(__file__).resolve().parents[1] / ".env").read_text(encoding="utf-8").splitlines():
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def synth(api_key: str, clip: dict) -> bytes:
    voice, persona = VOICES.get(clip.get("speaker") or "(narrator)", VOICES["(narrator)"])
    body = {
        "model": MODEL,
        "voice": voice,
        "input": clip["text"],
        "instructions": f"{persona} {BASE} {KIND_HINT[clip['kind']]}",
        "response_format": "mp3",
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/audio/speech",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    for attempt in range(5):
        try:
            return urllib.request.urlopen(req, timeout=90).read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 4:
                time.sleep(2 * (attempt + 1))
                continue
            raise RuntimeError(f"HTTP {e.code}: {e.read()[:200]!r}") from e
        except urllib.error.URLError:
            if attempt < 4:
                time.sleep(2 * (attempt + 1))
                continue
            raise
    raise RuntimeError("unreachable")


def squeeze(mp3: bytes, out: Path) -> None:
    """Mono, 24 kHz, 32 kbit/s: plenty for speech, about 4 KB per second."""
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", "pipe:0", "-ac", "1", "-ar", "24000", "-b:a", "32k", str(out)],
        input=mp3,
        check=True,
    )


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    manifest, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    limit = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else None
    out_dir.mkdir(parents=True, exist_ok=True)
    api_key = load_env().get("OPENAI_API_KEY") or os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        sys.exit("OPENAI_API_KEY missing")

    clips = json.loads(manifest.read_text(encoding="utf-8"))
    todo = [c for c in clips if not (out_dir / f"{c['key']}.mp3").exists()]
    if limit:
        todo = todo[:limit]
    chars = sum(len(c["text"]) for c in todo)
    print(f"{len(clips)} clips in manifest, {len(todo)} to make ({chars} characters)")

    def work(c: dict) -> str:
        squeeze(synth(api_key, c), out_dir / f"{c['key']}.mp3")
        return c["key"]

    done = failed = 0
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(work, c): c for c in todo}
        for f in as_completed(futures):
            try:
                f.result()
                done += 1
            except Exception as e:  # noqa: BLE001
                failed += 1
                print("FAILED", futures[f]["text"][:50], e)
            if (done + failed) % 50 == 0:
                print(f"  {done + failed}/{len(todo)}")
    size = sum(p.stat().st_size for p in out_dir.glob("*.mp3"))
    print(f"made {done}, failed {failed}; folder now {len(list(out_dir.glob('*.mp3')))} files, {size / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
