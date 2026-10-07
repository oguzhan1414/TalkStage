"""Hikaye kurucu yardımcılar.

Sahne belirtimi: (başlık_tr, cümle_en, çeviri_tr, alıştırma)

Alıştırma türleri (son eleman; yoksa/None ise "cümle sıralama"):
  "listen"                                   -> sesi dinle, duyduğun cümleyi seç (şıklar aynı hikayenin cümleleri)
  ("fill", kelime, [yanlış1, yanlış2])       -> boşluk doldur (cümleden `kelime` çıkarılır)
  ("spell", kelime)                          -> boşluğu harflere tek tek dokunarak yaz (harfler karışık)
  ("tf", ifade, doğru_mu, açıklama_tr)       -> doğru / yanlış
  ("q", soru, [şıklar], doğru_index, açıklama_tr) -> anlama sorusu
"""
import random
import re
from pathlib import Path

# Konu etiketi -> mevcut görsel anahtarı (özel kapaklar eklenene kadar yedek görsel).
THEME_IMAGE = {
    "family": "companion",
    "food": "daily",
    "shopping": "daily",
    "travel": "travel",
    "city": "travel",
    "work": "career",
    "health": "daily",
    "home": "daily",
    "hobbies": "daily",
    "school": "daily",
    "friends": "celebration",
    "weather": "daily",
    "technology": "tech",
    "nature": "travel",
    "business": "b2b",
    "society": "companion",
    "culture": "companion",
    "daily": "daily",
}


_READING_ART = Path(__file__).resolve().parents[3] / "mobile" / "assets" / "images" / "reading"


def _scene_image_key(level, slug, index, theme, spec=None):
    """A1: her sahnenin kendi görseli var. Diğer seviyelerde, sahnenin özel görseli
    (mobile/assets/images/reading/<seviye>/<slug>_<n>.jpg) dosyası varsa o anahtar,
    yoksa konuya göre yedek görsel kullanılır."""
    if isinstance(spec, tuple) and spec[0] == "spell" and len(spec) > 2:
        return f"{slug}_{spec[2]}"  # kelime avı sahnesi: mevcut bir sahnenin görselini yeniden kullanır
    key = f"{slug}_{index + 1}"
    if level in ("A1", "A2") or (_READING_ART / level.lower() / f"{key}.jpg").exists():
        return key
    return THEME_IMAGE.get(theme, "daily")


def _exercise(spec, slug, index, scenes):
    if spec is None:
        return None
    rng = random.Random(f"{slug}-{index}")
    en = scenes[index][1]
    if spec == "listen":
        others = [s[1] for i, s in enumerate(scenes) if i != index and s[1] != en]
        rng.shuffle(others)
        options = [en] + others[:2]
        if len(options) < 3:
            raise ValueError(f"{slug}: listen için yeterli çeldirici cümle yok (sahne {index + 1})")
        rng.shuffle(options)
        return {"type": "listen", "options": options, "correct_index": options.index(en)}
    kind = spec[0]
    if kind == "fill":
        _, word, distractors = spec
        pattern = re.compile(r"\b" + re.escape(word) + r"\b", re.IGNORECASE)
        if not pattern.search(en):
            raise ValueError(f"{slug}: fill kelimesi cümlede yok: {word!r} (sahne {index + 1})")
        prompt = pattern.sub("___", en, count=1)
        options = [word] + list(distractors)
        rng.shuffle(options)
        return {"type": "fill", "prompt": prompt, "options": options, "correct_index": options.index(word)}
    if kind == "spell":
        # ("spell", kelime): cümleden kelime çıkarılır, harfleri karışık verilir; harflere dokunarak yazılır.
        word = spec[1]  # spec[2] (varsa) = görsel için sahne no, burada kullanılmaz
        pattern = re.compile(r"\b" + re.escape(word) + r"\b", re.IGNORECASE)
        match = pattern.search(en)
        if not match:
            raise ValueError(f"{slug}: spell kelimesi cümlede yok: {word!r} (sahne {index + 1})")
        answer = match.group(0)
        letters = list(answer)
        shuffled = letters[:]
        for _ in range(10):  # kelimeyle aynı sırada gelmesin
            rng.shuffle(shuffled)
            if shuffled != letters or len(set(letters)) == 1:
                break
        return {
            "type": "spell",
            "prompt": pattern.sub("___", en, count=1),
            "answer": answer,
            "options": shuffled,
            "correct_index": 0,
        }
    if kind == "tf":
        _, statement, truth, explanation = spec
        return {
            "type": "tf",
            "prompt": statement,
            "options": ["True", "False"],
            "correct_index": 0 if truth else 1,
            "explanation_tr": explanation,
        }
    if kind == "q":
        _, question, options, correct, explanation = spec
        right = options[correct]
        shuffled = list(options)
        rng.shuffle(shuffled)  # doğru şık her zaman aynı yerde olmasın
        return {
            "type": "question",
            "prompt": question,
            "options": shuffled,
            "correct_index": shuffled.index(right),
            "explanation_tr": explanation,
        }
    raise ValueError(f"{slug}: bilinmeyen alıştırma {spec!r}")


def build_passage(slug, title, level, theme, sort_order, minutes, scenes, speaking):
    built = []
    for i, sc in enumerate(scenes):
        title_tr, en, tr = sc[:3]
        spec = sc[3] if len(sc) > 3 else None
        scene = {
            "title": title_tr,
            "image_key": _scene_image_key(level, slug, i, theme, spec),
            "sentence_en": en,
            "sentence_tr": tr,
        }
        exercise = _exercise(spec, slug, i, scenes)
        if exercise:
            scene["exercise"] = exercise
        built.append(scene)
    return {
        "slug": slug,
        "title": title,
        "cefr_level": level,
        "theme": theme,
        "estimated_minutes": minutes,
        "sort_order": sort_order,
        "scenes": built,
        "quiz": [],
        "speaking_prompt": {"yanki_ask": speaking[0], "expected_answer": speaking[1]},
    }


def append_spell_scenes(passage, spells):
    """Hikayenin SONUNA ayrı "Kelime Avı" sahneleri ekler (mevcut sahne numaraları/görselleri değişmez).

    spells: [(cümle_en, çeviri_tr, kelime, görsel_sahne_no), ...] — görsel, aynı hikayenin mevcut bir sahnesinden alınır."""
    slug = passage["slug"]
    for en, tr, word, img in spells:
        n = len(passage["scenes"]) + 1
        exercise = _exercise(("spell", word, img), slug, n - 1, [(None, en, None)] * n)
        passage["scenes"].append({
            "title": f"Sahne {n}: Kelime Avı",
            "image_key": f"{slug}_{img}",
            "sentence_en": en,
            "sentence_tr": tr,
            "exercise": exercise,
        })
    return passage
