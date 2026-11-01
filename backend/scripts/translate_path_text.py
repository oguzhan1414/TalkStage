"""Translate the learning path's learner-language texts into Spanish, Portuguese and German.

Input is the manifest from mobile/scripts/export-path-text.ts (key, kind, Turkish text, English version, English
original). Output is one JSON file per language, `{key: text}`, which the app lays over the path data at start
(mobile/src/data/path/overlay.ts). The run resumes: keys already in the output file are skipped, so after editing
lessons just export again and rerun; only new or missing texts are sent.

Run from backend/:
  venv/Scripts/python.exe scripts/translate_path_text.py <manifest.json> ../mobile/src/data/path/i18n [--langs es,pt,de]
      [--level A1] [--model gpt-4.1] [--limit 40] [--prune]
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
try:
    from app.core.config import settings  # noqa: E402

    API_KEY = settings.openai_api_key
except Exception:  # pragma: no cover - fall back to the environment
    API_KEY = os.environ.get("OPENAI_API_KEY", "")

LANG_NAMES = {"es": "Spanish (neutral, Latin-American friendly)", "pt": "Brazilian Portuguese", "de": "German"}

SYSTEM = """You translate the learner-language texts of an English-learning app (Spekvia) into {lang}.
The app was written for Turkish speakers; the learners reading your text speak {lang} and are learning ENGLISH.

Every item has:
- "kind": "word" (meaning of an English word or phrase), "sentence" (translation of an English sentence, question
  or exercise prompt) or "text" (titles, story summaries, grammar notes by Mivo the mascot, hints).
- "tr": the current Turkish text, "en": an English version if one exists, "src": the English original it translates.

Rules:
- "word": give the natural dictionary meaning of the English word in "src" in {lang}, as short as the Turkish one
  (one or two meanings, comma separated, same part of speech). German nouns capitalised, no articles unless the
  Turkish has a hint. Use the Turkish only to pick the intended sense.
- "sentence": translate the English "src" naturally and faithfully into {lang}; the Turkish shows the intended
  meaning and register. Keep names, places and numbers.
- "text": translate the meaning of the Turkish text (it is usually richer than "en"). Grammar notes explain ENGLISH
  grammar: keep every English word, example and **bold** marker exactly as written. When the Turkish compares with
  Turkish grammar (e.g. "Türkçedeki -ım eki", "Türkçede ... yok"), rewrite that comparison for {lang} speakers if a
  true one exists, otherwise drop that clause. Never mention Turkish or Turkey unless the story itself does.
- Keep emoji, punctuation style, quotes around English examples, arrows (→) and placeholders like {{{{n}}}}.
- Friendly, simple, natural {lang}; address the learner informally (tú / você / du).

Reply with JSON only: {{"t": {{"<id>": "<translation>", ...}}}} with every id of the input."""


def load(path: Path) -> dict[str, str]:
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return {}


def save(path: Path, data: dict[str, str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(dict(sorted(data.items())), ensure_ascii=False, indent=0), encoding="utf-8")
    # Windows: a watcher (Metro, antivirus) can hold the file for a moment.
    for attempt in range(20):
        try:
            tmp.replace(path)
            return
        except PermissionError:
            time.sleep(0.25 * (attempt + 1))
    raise PermissionError(f"could not write {path}")


def check(item: dict, text: str) -> bool:
    """Keep the markup the app relies on."""
    if not text or not text.strip():
        return False
    if item["tr"].count("{{") != text.count("{{"):
        return False
    # Bold marks must stay paired; a note may lose one pair when a Turkish-only comparison is dropped.
    bold_tr, bold = item["tr"].count("**"), text.count("**")
    if bold % 2 or (bold_tr and not bold) or bold > bold_tr:
        return False
    return True


def translate_batch(client: OpenAI, model: str, lang: str, batch: list[dict]) -> dict[str, str]:
    payload = [
        {k: v for k, v in {"id": str(i), "kind": it["kind"], "tr": it["tr"], "en": it.get("en"), "src": it.get("src")}.items() if v}
        for i, it in enumerate(batch)
    ]
    for attempt in range(3):
        try:
            resp = client.chat.completions.create(
                model=model,
                temperature=0.2,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": SYSTEM.format(lang=LANG_NAMES[lang])},
                    {"role": "user", "content": json.dumps({"items": payload}, ensure_ascii=False)},
                ],
            )
            out = json.loads(resp.choices[0].message.content or "{}").get("t", {})
            result = {}
            for i, it in enumerate(batch):
                text = out.get(str(i))
                if isinstance(text, str) and check(it, text):
                    result[it["key"]] = text.strip()
            return result
        except Exception as e:  # network / rate limit: try again
            print(f"  [{lang}] batch retry {attempt + 1}: {e}", flush=True)
    return {}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest")
    ap.add_argument("outdir")
    ap.add_argument("--langs", default="es,pt,de")
    ap.add_argument("--level")
    ap.add_argument("--model", default="gpt-4.1")
    ap.add_argument("--limit", type=int, default=40, help="texts per request")
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--prune", action="store_true", help="drop keys that are no longer in the manifest")
    args = ap.parse_args()

    items = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    if args.level:
        items = [i for i in items if i["level"] == args.level]
    client = OpenAI(api_key=API_KEY)

    for lang in args.langs.split(","):
        path = Path(args.outdir) / f"{lang}.json"
        done = load(path)
        if args.prune and not args.level:
            keys = {i["key"] for i in items}
            done = {k: v for k, v in done.items() if k in keys}
        todo = [i for i in items if i["key"] not in done]
        print(f"[{lang}] {len(todo)} to translate ({len(done)} already done)", flush=True)
        batches = [todo[i : i + args.limit] for i in range(0, len(todo), args.limit)]
        lock = threading.Lock()
        finished = 0
        with ThreadPoolExecutor(max_workers=args.workers) as pool:
            futures = [pool.submit(translate_batch, client, args.model, lang, b) for b in batches]
            for fut in as_completed(futures):
                got = fut.result()
                with lock:
                    done.update(got)
                    finished += 1
                    save(path, done)
                    if finished % 10 == 0 or finished == len(batches):
                        print(f"  [{lang}] {finished}/{len(batches)} batches, {len(done)} texts", flush=True)
        missing = [i["key"] for i in items if i["key"] not in done]
        print(f"[{lang}] done: {len(done)} texts, {len(missing)} missing", flush=True)
        if missing:
            print("  missing (rerun to retry):", missing[:10], flush=True)


if __name__ == "__main__":
    main()
