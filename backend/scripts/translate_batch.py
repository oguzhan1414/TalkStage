"""Toplu içerik çevirisi (OpenAI) — çok dilli çıkış için.

Girdi  : [{"id": "...", "text": "...", "kind": "ui|gloss|sentence|doc", "src": "tr|en", "hint": "..."}]
Çıktı  : {"id": {"en": "...", "es": "...", "pt": "...", "de": "..."}}  (devam edilebilir)

Kullanım:
  python scripts/translate_batch.py --in work/items.json --out work/out.json \
      [--model gpt-4o-mini] [--langs en,es,pt,de] [--batch 25] [--concurrency 5]

`kind`:
  ui        kısa arayüz/öğretici metin (placeholder'lar {{x}}, emoji, **kalın**, \\n korunur)
  gloss     tek kelime/kısa ifadenin ana dildeki karşılığı (hint = Türkçe anlam, anlam ayrımı için)
  sentence  tam cümle çevirisi
  doc       uzun açıklama/paragraf (biçim ve satır sonları aynen korunur)
"""
import argparse
import asyncio
import json
import os
import re
import sys
from pathlib import Path

from openai import AsyncOpenAI

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from app.core.config import settings  # noqa: E402

LANG_NAMES = {
    "en": "simple, clear English (for learners whose own language the app does not support yet)",
    "es": "Latin American Spanish (neutral, tú form)",
    "pt": "Brazilian Portuguese (você form)",
    "de": "German (informal du form)",
}

KIND_RULES = {
    "ui": "Short UI or teaching strings of an English-learning app. Keep tone warm, friendly and natural. "
          "Keep length close to the source (UI space is tight). If an item contains no Turkish at all (it is an "
          "English example sentence, a grammar formula, symbols or a code), return it unchanged for every language.",
    "gloss": "Each item is a single word or short phrase; give the natural dictionary meaning of the ENGLISH term "
             "(`en` field) in the target language — concise (1-4 words), no explanations. The `hint` is its Turkish "
             "meaning, only to disambiguate the sense. For target English, give a very short plain-English synonym/definition "
             "(1-4 words), never the term itself.",
    "sentence": "Each item is a full sentence; translate it naturally and fluently (not word for word).",
    "doc": "Each item is a longer explanatory text for learners. Preserve ALL formatting exactly: line breaks, "
           "markdown like **bold**, bullets, numbering, tables separators (|), emoji and ASCII diagrams' structure. "
           "Translate only the human-language words. Keep English example phrases/sentences in English unchanged "
           "(they are what the learner is studying) — translate only the explanations around them. If an item "
           "contains no Turkish at all, return it unchanged for every language.",
}

PH = re.compile(r"\{\{\w+\}\}")


def placeholders(text: str) -> list[str]:
    return sorted(PH.findall(text or ""))


def build_prompt(kind: str, src: str, langs: list[str], items: list[dict]) -> str:
    targets = "\n".join(f'- "{l}": {LANG_NAMES[l]}' for l in langs)
    src_name = "Turkish" if src == "tr" else "English"
    payload = []
    for n, it in enumerate(items):
        row = {"id": f"i{n}", "text": it["text"]}
        if it.get("hint"):
            row["hint"] = it["hint"]
        payload.append(row)
    en_note = (
        "For items whose source language is English, the \"en\" output must equal the source text unchanged."
        if src == "en" and kind != "gloss"
        else ""
    )
    return (
        f"You are a professional localizer for an English-learning mobile app (Spekvia). "
        f"Source language of every item: {src_name}. Translate into each target language:\n{targets}\n\n"
        f"Rules for this batch ({kind}): {KIND_RULES[kind]}\n"
        "Never change {{placeholders}} (e.g. {{name}}), numbers, URLs, brand names (Spekvia, Mivo, Yankı, XP, CEFR) "
        "or emoji. Do not add quotes or commentary. Never leave an item untranslated unless it is a proper noun. "
        f"{en_note}\n\n"
        "Return ONLY a JSON object mapping each id to an object with one key per target language code, e.g. "
        '{"<id>": {"es": "...", "pt": "...", "de": "..."}}.\n\n'
        f"ITEMS:\n{json.dumps(payload, ensure_ascii=False)}"
    )


async def translate_group(client, model, kind, src, langs, items, sem, retries=3):
    prompt = build_prompt(kind, src, langs, items)
    last_error = None
    for attempt in range(retries):
        try:
            async with sem:
                completion = await client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": "You output only valid JSON."},
                        {"role": "user", "content": prompt},
                    ],
                    response_format={"type": "json_object"},
                    temperature=0.2,
                )
            data = json.loads(completion.choices[0].message.content or "{}")
            result = {}
            for n, it in enumerate(items):
                row = data.get(f"i{n}")
                if not isinstance(row, dict) or not all(isinstance(row.get(l), str) and row[l].strip() for l in langs if l in row or True):
                    raise ValueError(f"missing/invalid entry for {it['id']}")
                for l in langs:
                    if placeholders(row[l]) != placeholders(it["text"]):
                        raise ValueError(f"placeholder mismatch for {it['id']} [{l}]")
                result[it["id"]] = {l: row[l] for l in langs}
            return result
        except Exception as exc:  # noqa: BLE001 — retry on any provider/validation failure
            last_error = exc
            await asyncio.sleep(1.5 * (attempt + 1))
    # Group failed as a whole: split in half so one bad item can't sink the batch.
    if len(items) > 1:
        mid = len(items) // 2
        a = await translate_group(client, model, kind, src, langs, items[:mid], sem, retries=2)
        b = await translate_group(client, model, kind, src, langs, items[mid:], sem, retries=2)
        return {**a, **b}
    print(f"  ! giving up on {items[0]['id']}: {last_error}", file=sys.stderr)
    return {}


async def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="inp", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--model", default="gpt-4o-mini")
    ap.add_argument("--langs", default="en,es,pt,de")
    ap.add_argument("--batch", type=int, default=25)
    ap.add_argument("--concurrency", type=int, default=5)
    args = ap.parse_args()

    langs = [l for l in args.langs.split(",") if l]
    items = json.loads(Path(args.inp).read_text(encoding="utf-8"))
    out_path = Path(args.out)
    done = json.loads(out_path.read_text(encoding="utf-8")) if out_path.exists() else {}

    pending = [it for it in items if it["id"] not in done or any(l not in done[it["id"]] for l in langs)]
    print(f"{len(items)} items, {len(items) - len(pending)} already done, {len(pending)} to translate")
    if not pending:
        return

    client = AsyncOpenAI(api_key=settings.openai_api_key, timeout=120, max_retries=1)
    sem = asyncio.Semaphore(args.concurrency)

    # Group by (kind, src); 'doc' items are big, so use small batches.
    groups: dict[tuple[str, str], list[dict]] = {}
    for it in pending:
        groups.setdefault((it.get("kind", "ui"), it.get("src", "tr")), []).append(it)

    tasks = []
    for (kind, src), rows in groups.items():
        size = 3 if kind == "doc" else args.batch
        use_langs = [l for l in langs if not (src == "en" and l == "en" and kind != "gloss")]
        for i in range(0, len(rows), size):
            tasks.append((kind, src, use_langs, rows[i : i + size]))

    completed = 0
    lock = asyncio.Lock()

    async def run(kind, src, use_langs, batch):
        nonlocal completed
        res = await translate_group(client, args.model, kind, src, use_langs, batch, sem)
        async with lock:
            for rid, row in res.items():
                row = dict(row)
                orig = next(b for b in batch if b["id"] == rid)
                if src == "en" and kind != "gloss" and "en" in langs:
                    row["en"] = orig["text"]
                done[rid] = {**done.get(rid, {}), **row}
            completed += len(batch)
            out_path.write_text(json.dumps(done, ensure_ascii=False), encoding="utf-8")
            print(f"  {completed}/{len(pending)}")

    await asyncio.gather(*(run(*t) for t in tasks))
    missing = [it["id"] for it in items if it["id"] not in done]
    print(f"done. missing: {len(missing)}")
    if missing:
        print("  e.g.", missing[:5])


if __name__ == "__main__":
    asyncio.run(main())
