"""Okuma içeriği doğrulayıcı: python scripts/validate_reading.py"""
import re
import sys
from collections import Counter

sys.path.insert(0, ".")
import seed_reading_content as m  # noqa: E402

TR_NAMES = ["Ayşe", "Kerem", "Elif", "Ahmet", "Zeynep", "Deniz", "Burak", "Ece", "Mert", "Selin", "Emre", "Cem", "Oğuz", "Tolga", "Yusuf", "Berk"]
# (sıralama sahnesi en fazla, alıştırmalı sahne en fazla) kelime
LIMITS = {"A1": (8, 10), "A2": (12, 14)}
errors = []
validated_levels = set(LIMITS)
for p in m.PASSAGES:
    slug = p["slug"]
    level = p["cefr_level"]
    scenes = p["scenes"]
    micro = p["sort_order"] <= 10 and level == "A1"
    if level in ("A1", "A2"):
        lo, hi = (3, 4) if micro else (6, 9)
        if not lo <= len(scenes) <= hi:
            errors.append(f"{slug}: sahne sayısı {len(scenes)} ({lo}-{hi} olmalı)")
        spells = sum(1 for sc in scenes if (sc.get("exercise") or {}).get("type") == "spell")
        if not 1 <= spells <= 3:
            errors.append(f"{slug}: kelime avı (spell) sahne sayısı {spells} (1-3 olmalı)")
    elif level in validated_levels and not 5 <= len(scenes) <= 6:
        errors.append(f"{slug}: sahne sayısı {len(scenes)} (5-6 olmalı)")
    for i, sc in enumerate(scenes):
        en = sc["sentence_en"]
        words = en.split(" ")
        ex = sc.get("exercise")
        if level in LIMITS and not micro:
            limit = LIMITS[level][0]
            if len(words) > limit:
                errors.append(f"{slug} sahne {i+1}: {len(words)} kelime (>{limit})")
        if ex:
            opts = ex["options"]
            if ex["type"] == "spell":
                if sorted(opts) != sorted(ex.get("answer", "")) or not 3 <= len(opts) <= 9:
                    errors.append(f"{slug} sahne {i+1}: spell harfleri/uzunluğu hatalı")
            else:
                if not 2 <= len(opts) <= 4 or not 0 <= ex["correct_index"] < len(opts):
                    errors.append(f"{slug} sahne {i+1}: şık/indeks hatalı")
                if len({o.lower() for o in opts}) != len(opts):
                    errors.append(f"{slug} sahne {i+1}: tekrarlı şık")
            if ex["type"] in ("fill", "spell") and "___" not in ex["prompt"]:
                errors.append(f"{slug} sahne {i+1}: boşluk yok")
            if ex["type"] in ("tf", "question") and not ex.get("explanation_tr"):
                errors.append(f"{slug} sahne {i+1}: açıklama yok")
        for n in TR_NAMES:
            if re.search(r"\b" + n + r"\b", en) and level in ("A1", "A2"):
                errors.append(f"{slug}: Türkçe isim {n}")
        if "  " in en or en != en.strip():
            errors.append(f"{slug} sahne {i+1}: boşluk hatası")
    if not p.get("speaking_prompt"):
        errors.append(f"{slug}: speaking_prompt yok")
    kinds = Counter((sc.get("exercise") or {}).get("type", "order") for sc in scenes)
    if level in validated_levels and not micro and len(kinds) < 3:
        errors.append(f"{slug}: alıştırma çeşitliliği az {dict(kinds)}")
by = Counter(p["cefr_level"] for p in m.PASSAGES)
print("seviye sayıları:", dict(by))
slugs = [p["slug"] for p in m.PASSAGES]
dups = [s for s, c in Counter(slugs).items() if c > 1]
if dups:
    errors.append(f"tekrarlı slug: {dups}")
print("HATA YOK" if not errors else chr(10).join(errors))
