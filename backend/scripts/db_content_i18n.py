"""Senaryo ve okuma parçalarının (DB) çok dilli çevirisi.

  python scripts/db_content_i18n.py extract            -> ../.i18n-work/items_db.json
  python scripts/translate_batch.py --in ../.i18n-work/items_db.json --out ../.i18n-work/out_db.json
  python scripts/db_content_i18n.py apply              -> scenarios.translations / reading_passages.translations

`apply`, migration 0022 (translations jsonb) uygulanmamışsa sonucu ../.i18n-work/db_translations.json'a yazar
ve ne yapılacağını söyler — migration sonrası aynı komut tekrar çalıştırılabilir (idempotent).
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.supabase_client import get_service_client  # noqa: E402

WORK = Path(__file__).resolve().parent.parent.parent / ".i18n-work"
LANGS = ["en", "es", "pt", "de"]


def item(rid, text, kind, src, hint=None):
    row = {"id": rid, "text": text, "kind": kind, "src": src}
    if hint:
        row["hint"] = hint
    return row


def extract() -> None:
    db = get_service_client()
    items = []
    for sc in db.table("scenarios").select("*").execute().data:
        slug = sc["slug"]
        for field in ("title", "description", "situation", "ai_role"):
            if sc.get(field):
                items.append(item(f"sc|{slug}|{field}", sc[field], "ui", "tr"))
        for i, o in enumerate(sc.get("objectives") or []):
            if o.get("text"):
                items.append(item(f"sc|{slug}|obj.{i}", o["text"], "sentence", "en"))
        for i, k in enumerate(sc.get("key_phrases") or []):
            if k.get("en"):
                items.append(item(f"sc|{slug}|kp.{i}", k["en"], "sentence", "en"))
        for i, v in enumerate(sc.get("suggested_vocab") or []):
            if v.get("term"):
                items.append(item(f"sc|{slug}|sv.{i}", v["term"], "gloss", "en", v.get("tr")))
    for rd in db.table("reading_passages").select("*").execute().data:
        slug = rd["slug"]
        for i, scene in enumerate(rd.get("scenes") or []):
            if scene.get("title"):
                items.append(item(f"rd|{slug}|st.{i}", scene["title"], "ui", "tr"))
            if scene.get("sentence_en"):
                items.append(item(f"rd|{slug}|ss.{i}", scene["sentence_en"], "sentence", "en"))
            q = scene.get("question") or {}
            if q.get("explanation_tr"):
                items.append(item(f"rd|{slug}|qe.{i}", q["explanation_tr"], "ui", "tr"))
    WORK.mkdir(exist_ok=True)
    (WORK / "items_db.json").write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(items)} items -> .i18n-work/items_db.json")


def build_translations(out: dict) -> tuple[dict, dict]:
    db = get_service_client()
    sc_tr: dict[str, dict] = {}
    rd_tr: dict[str, dict] = {}

    def get(rid, lang, fallback):
        return (out.get(rid) or {}).get(lang) or fallback

    for sc in db.table("scenarios").select("*").execute().data:
        slug = sc["slug"]
        per = {}
        for lang in LANGS:
            t = {}
            for field in ("title", "description", "situation", "ai_role"):
                if sc.get(field):
                    t[field] = get(f"sc|{slug}|{field}", lang, sc[field])
            if sc.get("objectives"):
                t["objectives"] = [
                    {"text": o["text"], "text_tr": get(f"sc|{slug}|obj.{i}", lang, o.get("text_tr", o["text"]))}
                    for i, o in enumerate(sc["objectives"])
                ]
            if sc.get("key_phrases"):
                t["key_phrases"] = [
                    {"en": k["en"], "tr": get(f"sc|{slug}|kp.{i}", lang, k.get("tr", k["en"]))}
                    for i, k in enumerate(sc["key_phrases"])
                ]
            if sc.get("suggested_vocab"):
                t["suggested_vocab"] = [
                    {"term": v["term"], "tr": get(f"sc|{slug}|sv.{i}", lang, v.get("tr", v["term"]))}
                    for i, v in enumerate(sc["suggested_vocab"])
                ]
            per[lang] = t
        sc_tr[slug] = per
    for rd in db.table("reading_passages").select("*").execute().data:
        slug = rd["slug"]
        per = {}
        for lang in LANGS:
            scenes = []
            for i, scene in enumerate(rd.get("scenes") or []):
                s2 = dict(scene)
                s2["title"] = get(f"rd|{slug}|st.{i}", lang, scene.get("title", ""))
                s2["sentence_tr"] = get(f"rd|{slug}|ss.{i}", lang, scene.get("sentence_tr", ""))
                if scene.get("question"):
                    q2 = dict(scene["question"])
                    if q2.get("explanation_tr"):
                        q2["explanation_tr"] = get(f"rd|{slug}|qe.{i}", lang, q2["explanation_tr"])
                    s2["question"] = q2
                scenes.append(s2)
            per[lang] = {"scenes": scenes}
        rd_tr[slug] = per
    return sc_tr, rd_tr


def apply() -> None:
    out = json.loads((WORK / "out_db.json").read_text(encoding="utf-8"))
    sc_tr, rd_tr = build_translations(out)
    (WORK / "db_translations.json").write_text(
        json.dumps({"scenarios": sc_tr, "reading_passages": rd_tr}, ensure_ascii=False), encoding="utf-8"
    )
    db = get_service_client()
    try:
        for slug, per in sc_tr.items():
            db.table("scenarios").update({"translations": per}).eq("slug", slug).execute()
        for slug, per in rd_tr.items():
            db.table("reading_passages").update({"translations": per}).eq("slug", slug).execute()
    except Exception as exc:  # noqa: BLE001
        print("DB'ye yazılamadı (büyük olasılıkla migration 0022 uygulanmadı):", str(exc)[:200])
        print("Çeviriler .i18n-work/db_translations.json dosyasına kaydedildi.")
        print("Migration 0022'yi Supabase Studio'da uygulayıp bu komutu tekrar çalıştırın.")
        return
    print(f"scenarios: {len(sc_tr)}, reading_passages: {len(rd_tr)} güncellendi")


if __name__ == "__main__":
    {"extract": extract, "apply": apply}[sys.argv[1]]()
