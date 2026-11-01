"""Helper for translating the learning path into Spanish (es), Portuguese (pt) and German (de) by hand or with an agent.

The texts to translate come from the manifest written by scripts/export-path-text.ts; translations live in
src/data/path/i18n/<lang>.json as {key: text}. See docs/ceviri_devam.md.

Run from mobile/ (plain Python 3, no packages):
  python scripts/path_i18n.py status                      # how many texts are missing per level and language
  python scripts/path_i18n.py todo --level A2 --limit 80  # next texts missing in any language, as JSON
  python scripts/path_i18n.py merge done.json             # add translations: {"<key>": {"es": "...", "pt": "...", "de": "..."}}
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "path-text.json"
I18N = ROOT / "src" / "data" / "path" / "i18n"
LANGS = ("es", "pt", "de")
LEVELS = ("A1", "A2", "B1", "B2", "C1", "C2")


def load_manifest() -> list[dict]:
    if not MANIFEST.exists():
        sys.exit(
            "scripts/path-text.json is missing. Create it first:\n"
            "  npx --yes tsx --tsconfig scripts/tsconfig.check.json scripts/export-path-text.ts scripts/path-text.json"
        )
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def load_lang(lang: str) -> dict[str, str]:
    path = I18N / f"{lang}.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def save_lang(lang: str, data: dict[str, str]) -> None:
    I18N.mkdir(parents=True, exist_ok=True)
    (I18N / f"{lang}.json").write_text(json.dumps(dict(sorted(data.items())), ensure_ascii=False, indent=0), encoding="utf-8")


def problem(tr: str, text: str) -> str | None:
    """Same checks as the OpenAI script: the app needs {{placeholders}} and paired **bold** marks."""
    if not isinstance(text, str) or not text.strip():
        return "empty"
    if tr.count("{{") != text.count("{{"):
        return "placeholder {{…}} count differs from the Turkish"
    bold_tr, bold = tr.count("**"), text.count("**")
    if bold % 2:
        return "odd number of ** marks"
    if bold_tr and not bold:
        return "the Turkish has **bold** marks, the translation has none"
    if bold > bold_tr:
        return "more ** marks than the Turkish"
    return None


def cmd_status(_: argparse.Namespace) -> None:
    items = load_manifest()
    done = {lang: load_lang(lang) for lang in LANGS}
    print(f"{'level':6} {'texts':>6}  " + "  ".join(f"{lang} missing" for lang in LANGS))
    for level in LEVELS:
        keys = [i["key"] for i in items if i["level"] == level]
        print(f"{level:6} {len(keys):>6}  " + "  ".join(f"{sum(k not in done[l] for k in keys):>10}" for l in LANGS))


def cmd_todo(args: argparse.Namespace) -> None:
    items = load_manifest()
    done = {lang: load_lang(lang) for lang in LANGS}
    out = []
    for it in items:
        if args.level and it["level"] != args.level:
            continue
        missing = [l for l in LANGS if it["key"] not in done[l]]
        if not missing:
            continue
        row = {k: it[k] for k in ("key", "kind", "tr", "en", "src") if it.get(k)}
        if len(missing) < len(LANGS):
            row["only"] = missing
        out.append(row)
        if len(out) >= args.limit:
            break
    print(json.dumps(out, ensure_ascii=False, indent=1))
    print(f"# {len(out)} texts", file=sys.stderr)


def cmd_merge(args: argparse.Namespace) -> None:
    items = {i["key"]: i for i in load_manifest()}
    incoming = json.loads(Path(args.file).read_text(encoding="utf-8"))
    done = {lang: load_lang(lang) for lang in LANGS}
    added, errors = 0, []
    for key, langs in incoming.items():
        if key not in items:
            errors.append(f"{key}: unknown key")
            continue
        for lang, text in langs.items():
            if lang not in LANGS:
                errors.append(f"{key}: unknown language {lang}")
                continue
            why = problem(items[key]["tr"], text)
            if why:
                errors.append(f"{key} [{lang}]: {why}")
                continue
            done[lang][key] = text.strip()
            added += 1
    for lang in LANGS:
        save_lang(lang, done[lang])
    print(f"added {added} translations")
    for e in errors:
        print("  NOT ADDED:", e)


def main() -> None:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("status").set_defaults(fn=cmd_status)
    p = sub.add_parser("todo")
    p.add_argument("--level", choices=LEVELS)
    p.add_argument("--limit", type=int, default=80)
    p.set_defaults(fn=cmd_todo)
    p = sub.add_parser("merge")
    p.add_argument("file")
    p.set_defaults(fn=cmd_merge)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
