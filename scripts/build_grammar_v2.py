"""docs/gramer-icerikleri.md → packages/shared-data/grammarV2.data.json

Yeni gramer derslerinin tek kaynağı md dosyasıdır. Bu betik onu uygulamanın okuduğu JSON'a çevirir.
md değiştikten sonra yeniden çalıştır:  python scripts/build_grammar_v2.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs" / "gramer-icerikleri.md"
OUT = ROOT / "packages" / "shared-data" / "grammarV2.data.json"

LEVEL_RANGES = [("A1", 1, 13), ("A2", 14, 23), ("B1", 24, 34), ("B2", 35, 42), ("C1", 43, 46), ("C2", 47, 47)]

# yeni-mufredat.md'deki sahne tablosu: videosu hazır mevcut sahneler. Listede olmayan konuda sahne yok
# (yolda yerine Mivo sohbeti gelir).
SCENES = {
    1: "cafe-meetup", 4: "hotel-checkin", 5: "neighbor-meetup", 6: "fitness-gym", 7: "street-directions",
    10: "fastfood-burger", 11: "supermarket-checkout", 13: "colleague-break", 14: "train-ticket",
    15: "airport-travel", 16: "clothing-boutique", 17: "doctor-visit", 18: "istanbul-tour",
    20: "restaurant-dinner", 22: "car-rental", 23: "taxi-ride", 24: "job-interview", 25: "rooftop-social",
    29: "flea-market", 30: "apartment-viewing", 33: "local-sim-card",
}

SECTION_LABELS = [
    ("Künye:", "kunye"), ("Bu derste öğreneceklerin", "learn"), ("Derse giriş:", "intro"), ("Hedef:", "goal"), ("Diyalog", "dialogue"),
    ("Fark et:", "notice"), ("Ana kural", "rule"), ("Ne zaman kullanılır?", "usage"),
    ("Ana dilinle fark", "native"), ("Sık hatalar", "mistakes"), ("Alıştırma", "exercises"),
    ("Yanıt ve geri bildirim", "answers"), ("Mivo ile kısa alıştırma:", "mivo"), ("Sesli sahne:", "scene"),
]
UNIT_LABELS = [("Hedef:", "goal"), ("Sesli sahne:", "scene")]
NATIVE_KEYS = {"Türkçe": "tr", "İspanyolca": "es", "Portekizce": "pt", "Almanca": "de"}
BOLD = re.compile(r"\*\*(.+?)\*\*")


def level_of(no):
    for lvl, a, b in LEVEL_RANGES:
        if a <= no <= b:
            return lvl
    raise ValueError(no)


def split_sections(lines, labels):
    sections, cur = {}, None
    for line in lines:
        hit = None
        for label, key in labels:
            if line.startswith("**" + label):
                hit = key
                break
        if hit:
            cur = hit
            sections[cur] = [line]
        elif cur:
            sections[cur].append(line)
    return {k: "\n".join(v).strip() for k, v in sections.items()}


def strip_label(text, label):
    """'**Hedef:** xyz' → 'xyz'; '**Ana kural**\\n…' → '…'."""
    first, _, rest = text.partition("\n")
    first = re.sub(r"^\*\*" + re.escape(label) + r"[^*]*\*\*\s*", "", first)
    return (first + ("\n" + rest if rest else "")).strip()


def parse_dialogue(text):
    lines = text.split("\n")
    title = re.match(r"\*\*Diyalog:?\s*(.*?)\*\*", lines[0]).group(1).strip()
    turns = []
    for line in lines[1:]:
        m = re.match(r"\*\*(\{\{name\}\}|[A-Z][\w]*):\*\*\s*(.+?)\s*$", line)
        if m:
            turns.append({"speaker": "user" if m.group(1) == "{{name}}" else m.group(1), "text": m.group(2)})
    return {"title": title, "lines": turns}


def parse_native(text):
    notes = {}
    for line in text.split("\n"):
        m = re.match(r"- \*\*(\w+):\*\*\s*(.+)", line)
        if m and m.group(1) in NATIVE_KEYS:
            notes[NATIVE_KEYS[m.group(1)]] = m.group(2).strip()
    return notes


LANG_NAMES = {"Türkçe": "tr", "İspanyolca": "es", "Portekizce": "pt", "Almanca": "de"}
MISTAKE = re.compile(
    r"^- ✗ (.+?) → ✓ (.+?)(?:\s+\*\((.+?)\)\*)?(?:\s+\*\*Neden karışır:\*\*\s*(.+?))?(?:\s+\*\*Hatırla:\*\*\s*(.+))?$"
)


def parse_mistakes(text):
    """'- ✗ yanlış → ✓ doğru *(etiket)* **Neden karışır:** … **Hatırla:** …' → kayıtlar.
    Etiket 'ana dile özel: X, Y' ise kayıt yalnızca o ana dillere gösterilir; 'genel…' herkese."""
    items, rest = [], []
    for line in text.split("\n"):
        m = MISTAKE.match(line)
        if not m:
            rest.append(line)
            continue
        tag = m.group(3) or ""
        langs = []
        if tag.startswith("ana dile özel:"):
            langs = [LANG_NAMES[n.strip()] for n in tag.split(":", 1)[1].split(",") if n.strip() in LANG_NAMES]
        items.append({"wrong": m.group(1), "right": m.group(2), "langs": langs,
                      "why": m.group(4) or "", "remember": m.group(5) or ""})
    return {"items": items, "rest": "\n".join(rest).strip()}


def numbered(text):
    items = {}
    for line in text.split("\n"):
        m = re.match(r"(\d+)\.\s+(.*)", line)
        if m:
            items[int(m.group(1))] = m.group(2).strip()
    return items


def clean_answer(s):
    return s.strip().rstrip(".").strip()


def answers_from(yanit):
    """Bold segments of the answer line, each split on ' ya da ' (alternatives)."""
    out = []
    for seg in BOLD.findall(yanit):
        for part in re.split(r"\s+ya da\s+", seg):
            part = clean_answer(part)
            if part:
                out.append(part)
    return out


def explanation_from(yanit):
    return BOLD.sub(lambda m: m.group(1), yanit).strip()


def parse_exercise(raw, yanit):
    m = re.match(r"\*\*(.+?):\*\*\s*(.*)", raw)
    label, prompt = (m.group(1), m.group(2)) if m else ("Soru", raw)
    expl = explanation_from(yanit or "")
    answers = answers_from(yanit or "")
    base = {"label": label, "prompt": prompt, "explain": expl}

    if label.startswith("Sesli"):
        ex = re.search(r"Örnek:\s*(.+)", yanit or "")
        return {**base, "kind": "spoken", "example": ex.group(1).strip() if ex else ""}

    opt = re.findall(r"\(([^()]*\s/\s[^()]*)\)", prompt)
    if opt:
        options = [o.strip() for o in opt[-1].split(" / ")]
        low = {o.lower(): o for o in options}
        correct = [low[a.lower()] for a in answers if a.lower() in low]
        if correct:
            return {**base, "kind": "choice", "options": options, "correct": correct}

    words_part = prompt
    if re.fullmatch(r"[A-Za-z0-9'’?.,]+(\s/\s[A-Za-z0-9'’?.,]+(\s[A-Za-z0-9'’?.,]+)*)+", words_part) or (
        " / " in words_part and re.fullmatch(r"[A-Za-z0-9'’?., /]+", words_part)
    ):
        words = [w.strip() for w in words_part.split(" / ")]
        if len(words) >= 3 and answers:
            return {**base, "kind": "order", "words": words, "answer": answers[0]}

    return {**base, "kind": "text", "answers": answers}


def parse_lesson(no, title, body):
    s = split_sections(body.split("\n"), SECTION_LABELS)
    kunye = strip_label(s["kunye"], "Künye:")
    # "A1 · Ana hedef: … · Yardımcı: …" — ana hedefin kendisi de "A) … · B) …" gibi · içerebilir.
    km = re.search(r"Ana hedef:\s*(.+?)(?:\s+·\s+Yardımcı:\s*(.+))?$", kunye)
    main = km.group(1).strip() if km else ""
    helper = (km.group(2) or "").strip() if km else ""
    ex_raw = numbered(s.get("exercises", ""))
    ans_raw = numbered(s.get("answers", ""))
    exercises = [parse_exercise(ex_raw[i], ans_raw.get(i, "")) for i in sorted(ex_raw)]
    level = level_of(no)
    return {
        "no": no,
        "code": f"{level}_N{no:02d}",
        "level": level,
        "kind": "lesson",
        "title": title,
        "target": main,
        "helper": "" if helper in ("—", "-") else helper,
        "learn": [l[2:].strip() for l in s.get("learn", "").split("\n") if l.startswith("- ")],
        "intro": strip_label(s.get("intro", ""), "Derse giriş:"),
        "goal": strip_label(s.get("goal", ""), "Hedef:"),
        "dialogue": parse_dialogue(s["dialogue"]),
        "notice": strip_label(s.get("notice", ""), "Fark et:"),
        "rule": strip_label(s.get("rule", ""), "Ana kural"),
        "usage": strip_label(s.get("usage", ""), "Ne zaman kullanılır?"),
        "native": parse_native(s.get("native", "")),
        "mistakes": parse_mistakes(strip_label(s.get("mistakes", ""), "Sık hatalar")),
        "exercises": exercises,
        "mivo": strip_label(s.get("mivo", ""), "Mivo ile kısa alıştırma:"),
        "sceneId": SCENES.get(no),
    }


def parse_unit(uid, title, body):
    goal_line = next((l for l in body.split("\n") if l.startswith("**Hedef:")), "")
    goal = strip_label(goal_line, "Hedef:")
    # Hedef satırından sonra, "Sesli sahne"ye kadar her şey ünitenin gövdesi
    body_lines = body.split("\n")
    start = next(i for i, l in enumerate(body_lines) if l.startswith("**Hedef:")) + 1
    end = next((i for i, l in enumerate(body_lines) if l.startswith("**Sesli sahne:")), len(body_lines))
    return {
        "no": uid,
        "code": f"C2_{uid}",
        "level": "C2",
        "kind": "unit",
        "title": title,
        "target": "",
        "helper": "",
        "learn": [],
        "intro": "",
        "goal": goal,
        "dialogue": {"title": "", "lines": []},
        "notice": "",
        "rule": "",
        "usage": "",
        "native": {},
        "mistakes": {"items": [], "rest": ""},
        "exercises": [],
        "mivo": "",
        "body": "\n".join(body_lines[start:end]).strip().rstrip("-").strip(),
        "sceneId": None,
    }


def main():
    md = SRC.read_text(encoding="utf-8")
    blocks = re.split(r"\n## ", md)
    lessons = []
    for block in blocks[1:]:
        head, _, body = block.partition("\n")
        m = re.match(r"(\d+)\.\s+(.+)", head)
        u = re.match(r"(U\d)\.\s+(.+)", head)
        body = re.split(r"\n# ", body)[0]  # sonraki seviye başlığını dışarıda bırak
        if m:
            lessons.append(parse_lesson(int(m.group(1)), m.group(2).strip(), body))
        elif u:
            lessons.append(parse_unit(u.group(1), u.group(2).strip(), body))
    OUT.write_text(json.dumps(lessons, ensure_ascii=False, indent=1), encoding="utf-8")

    kinds = {}
    for l in lessons:
        for e in l["exercises"]:
            kinds[e["kind"]] = kinds.get(e["kind"], 0) + 1
    print(f"{len(lessons)} ders → {OUT.relative_to(ROOT)}; alıştırmalar: {kinds}")
    missing = [l["code"] for l in lessons if l["kind"] == "lesson" and len(l["exercises"]) != 6]
    if missing:
        print("UYARI: 6 alıştırması olmayan dersler:", missing)
    no_ans = [(l["code"], i + 1) for l in lessons for i, e in enumerate(l["exercises"]) if e["kind"] == "text" and not e["answers"]]
    print("Beklenen cevabı olmayan (açık uçlu) yazılı sorular:", len(no_ans))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
