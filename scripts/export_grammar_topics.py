"""Gramer konu listesini backend'e verir: packages/shared-data/grammarV2.data.json -> backend/app/data/grammar_topics.json.

Backend, yapay zekânın hatayı bir gramer konusuna bağlayabilmesi için yalnızca konu kodlarını ve her konunun gramer
yapısını (`target`) ister; ders içeriği buraya girmez. Konular değişince bu betiği yeniden çalıştırın.

Kullanım: python scripts/export_grammar_topics.py
"""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "packages" / "shared-data" / "grammarV2.data.json"
OUT = ROOT / "backend" / "app" / "data" / "grammar_topics.json"

lessons = json.loads(SRC.read_text(encoding="utf-8"))
topics = [{"code": x["code"], "target": x["target"].strip()} for x in lessons if x.get("kind") == "lesson" and x.get("target")]
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(topics, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(len(topics), "konu yazıldı:", OUT)
