"""Yeni gramer derslerinin çevirileri (en, es, pt, de).

Kaynak: packages/shared-data/grammarV2.data.json (Türkçe; build_grammar_v2.py üretir).
Çeviri: packages/shared-data/i18n/grammarV2.<dil>.json  →  { "<ders kodu>": { "<alan yolu>": "metin" } }
Parmak izi: packages/shared-data/i18n/grammarV2.<dil>.hashes.json  →  her çevirinin hangi Türkçe metinden yapıldığı.

Komutlar:
  python scripts/grammar_v2_i18n.py export <dil> <çıktı.json> [seviye]   eksik / eskimiş metinleri dışa aktarır
  python scripts/grammar_v2_i18n.py merge <dil> <çeviri.json>           doğrulayıp çeviri dosyasına yazar
  python scripts/grammar_v2_i18n.py check                                 4 dili denetler (eksik, eskimiş, biçim hatası)

Biçim denetimi: `formüller`, {{yer tutucular}}, **kalın** sayısı, satır sayısı, tablo sütunları, ✗ ✓ → işaretleri
ve sayılar kaynakla aynı olmalı.
"""
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "packages" / "shared-data" / "grammarV2.data.json"
I18N = ROOT / "packages" / "shared-data" / "i18n"
LANGS = ["en", "es", "pt", "de"]
TR_LETTERS = re.compile(r"[çğıöşüÇĞİÖŞÜ]")
# Cevabı Türkçe bir açıklama olan soru türleri (diğerlerinde cevap İngilizcedir).
OPEN_LABELS = ("Fark et", "Anlamı", "Karşılaştır", "Noktalama", "Ton karşılaştır", "Kanıt düzeyi", "Gönderimi bul",
               "Koşul türü", "Odağı seç")

# Seviye ve bölüm başlıkları (grammarV2.ts içindeki LEVEL_TITLES ve UNITS ile aynı sırada).
META = {
    "level.A1": "Başlangıç · A1", "level.A2": "Başlangıç · A2", "level.B1": "Orta · B1",
    "level.B2": "Orta · B2", "level.C1": "İleri · C1", "level.C2": "İleri · C2",
    "unit.A1.0": "Tanışma ve ilk sorular", "unit.A1.1": "Günlük hayat", "unit.A1.2": "İstekler ve geçmiş",
    "unit.A2.0": "Plan, karar ve karşılaştırma", "unit.A2.1": "Deneyimler ve hikâyeler",
    "unit.B1.0": "Zaman ve deneyim", "unit.B1.1": "Hayal, tahmin ve tanım", "unit.B1.2": "Sohbeti yönetmek",
    "unit.B2.0": "Geçmiş ve gelecek", "unit.B2.1": "Akıcı ve ikna edici dil",
    "unit.C1.0": "Vurgu, temkin ve resmî dil", "unit.C2.0": "Akıcı söylem ve uygulama",
}


TR_WORDS = re.compile(
    r"\b(ve|bir|ile|mi|mı|mu|mü|ne|bu|şu|için|olarak|ya|da|de|değil|var|yok|cümle|kelime|soru|cevap|örnek|kural|"
    r"yap|yaz|kur|seç|söyle|anlat|neden|çünkü|ama|gibi|daha|en|çok|az|hem|sonra|önce|şimdi|burada|olan|olur)\b",
    re.IGNORECASE,
)


def needs_translation(text):
    return bool(text and text.strip())


def is_turkish(text):
    """İngilizce örnek/cevaplar her dilde aynı kalır; yalnızca Türkçe içeren metinler çevrilir."""
    return bool(text) and bool(TR_LETTERS.search(text) or TR_WORDS.search(text))


def strings_for(lesson, lang):
    """(alan yolu, Türkçe metin) çiftleri. Yalnızca çevrilmesi gereken alanlar."""
    out = []

    def add(path, text):
        if needs_translation(text):
            out.append((path, text))

    for f in ("title", "target", "helper", "intro", "goal", "notice", "rule", "usage", "mivo", "body"):
        add(f, lesson.get(f, ""))
    add("dialogue.title", lesson["dialogue"]["title"])
    for i, x in enumerate(lesson.get("learn", [])):
        add(f"learn.{i}", x)
    # Ana dil notu: o dili konuşana o dilde gösterilir (İngilizce arayüzde ana dil bilinmiyor).
    if lang in lesson["native"]:
        add(f"native.{lang}", lesson["native"][lang])
    for i, m in enumerate(lesson["mistakes"]["items"]):
        if m["langs"] and lang not in m["langs"]:
            continue  # bu dili konuşana gösterilmeyecek
        for f in ("wrong", "right"):
            if is_turkish(m[f]) or "(" in m[f]:
                add(f"mistakes.items.{i}.{f}", m[f])
        add(f"mistakes.items.{i}.why", m["why"])
        add(f"mistakes.items.{i}.remember", m["remember"])
    add("mistakes.rest", lesson["mistakes"]["rest"])
    for i, e in enumerate(lesson["exercises"]):
        add(f"exercises.{i}.label", e["label"])
        # Soru ve açıklamalar her zaman listeye girer (tamamen İngilizce olanlar aynen kopyalanır):
        # "Sahip Maya." ya da "(randevu)" gibi kısa Türkçe ifadeler otomatik olarak güvenle ayırt edilemiyor.
        add(f"exercises.{i}.prompt", e["prompt"])
        add(f"exercises.{i}.explain", e["explain"])
        for j, a in enumerate(e.get("answers", [])):
            if is_turkish(a) or e["label"].startswith(OPEN_LABELS):
                add(f"exercises.{i}.answers.{j}", a)
        for j, o in enumerate(e.get("options", [])):
            if TR_LETTERS.search(o):
                add(f"exercises.{i}.options.{j}", o)
                for k, c in enumerate(e.get("correct", [])):
                    if c == o:
                        add(f"exercises.{i}.correct.{k}", c)
        # Sesli alıştırmanın örnek cevabı bazen Türkçe bir ipucuyla biter.
        if is_turkish(e.get("example", "")):
            add(f"exercises.{i}.example", e["example"])
    return out


def all_strings(lang, level=None):
    lessons = json.loads(DATA.read_text(encoding="utf-8"))
    out = {}
    for l in lessons:
        if level and l["level"] != level:
            continue
        for path, text in strings_for(l, lang):
            out[f"{l['code']}|{path}"] = text
    if not level:
        for k, v in META.items():
            out[f"_meta|{k}"] = v
    return out


def h(text):
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:12]


def load(lang):
    tp, hp = I18N / f"grammarV2.{lang}.json", I18N / f"grammarV2.{lang}.hashes.json"
    tr = json.loads(tp.read_text(encoding="utf-8")) if tp.exists() else {}
    hs = json.loads(hp.read_text(encoding="utf-8")) if hp.exists() else {}
    return tr, hs


def save(lang, tr, hs):
    I18N.mkdir(parents=True, exist_ok=True)
    (I18N / f"grammarV2.{lang}.json").write_text(json.dumps(tr, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")
    (I18N / f"grammarV2.{lang}.hashes.json").write_text(json.dumps(hs, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")


def signature(text):
    return {
        # Formüllerin sayısı aynı kalmalı; içlerindeki Türkçe kelimeler (özne, fiil…) çevrilir.
        "code": len(re.findall(r"`[^`]+`", text)),
        "vars": Counter(re.findall(r"\{\{\w+\}\}", text)),
        "bold": text.count("**"),
        "lines": text.count("\n"),
        "pipes": [l.count("|") for l in text.split("\n") if l.startswith("|")],
        "marks": Counter(c for c in text if c in "✗✓→"),
        "nums": Counter(re.findall(r"\d+", text)),
        "bullets": sum(1 for l in text.split("\n") if l.startswith("- ")),
    }


def problems(src, dst):
    if not dst or not dst.strip():
        return ["boş"]
    a, b = signature(src), signature(dst)
    return [f"{k} farklı" for k in a if a[k] != b[k]]


def cmd_export(lang, out, level=None):
    tr, hs = load(lang)
    pending = {}
    for key, text in all_strings(lang, level).items():
        code, path = key.split("|", 1)
        if tr.get(code, {}).get(path) is None or hs.get(key) != h(text):
            pending[key] = text
    Path(out).write_text(json.dumps(pending, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{lang}: {len(pending)} metin → {out}")


def cmd_merge(lang, src_file):
    tr, hs = load(lang)
    source = all_strings(lang)
    incoming = json.loads(Path(src_file).read_text(encoding="utf-8"))
    bad = 0
    for key, text in incoming.items():
        if key not in source:
            print("  bilinmeyen anahtar:", key)
            bad += 1
            continue
        if text == "=":  # tamamen İngilizce: kaynağın aynısı
            text = source[key]
        errs = problems(source[key], text)
        if errs:
            print(f"  {key}: {', '.join(errs)}")
            bad += 1
            continue
        code, path = key.split("|", 1)
        tr.setdefault(code, {})[path] = text
        hs[key] = h(source[key])
    save(lang, tr, hs)
    print(f"{lang}: {len(incoming) - bad} yazıldı, {bad} reddedildi")
    return bad


def cmd_check():
    total = 0
    for lang in LANGS:
        tr, hs = load(lang)
        missing, stale, broken, untranslated = [], [], [], []
        for key, text in all_strings(lang).items():
            code, path = key.split("|", 1)
            t = tr.get(code, {}).get(path)
            if t is None:
                missing.append(key)
            elif hs.get(key) != h(text):
                stale.append(key)
            elif problems(text, t):
                broken.append(key)
            elif TR_LETTERS.search(t) and t == text:
                # "=" ile kopyalanmış ama içinde Türkçe kalmış metin
                untranslated.append(key)
        print(f"{lang}: eksik {len(missing)}, eskimiş {len(stale)}, biçim hatası {len(broken)}, "
              f"çevrilmemiş Türkçe {len(untranslated)}")
        for k in (missing + stale + broken + untranslated)[:8]:
            print("   ", k)
        total += len(missing) + len(stale) + len(broken) + len(untranslated)
    return total


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    cmd, *args = sys.argv[1:]
    if cmd == "export":
        cmd_export(args[0], args[1], args[2] if len(args) > 2 else None)
    elif cmd == "merge":
        sys.exit(1 if cmd_merge(args[0], args[1]) else 0)
    elif cmd == "check":
        sys.exit(1 if cmd_check() else 0)
