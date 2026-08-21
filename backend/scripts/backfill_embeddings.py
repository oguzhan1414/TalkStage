"""Embeds every scenario's system_prompt (and, optionally, a file of Turkish-speaker
error patterns) into `scenario_knowledge` for RAG retrieval.

Usage:
  python scripts/backfill_embeddings.py
  python scripts/backfill_embeddings.py --error-patterns patterns.json

patterns.json shape: [{"scenario_id": "<uuid or null>", "text": "..."}, ...]
A null/omitted scenario_id makes the pattern apply to every scenario.
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.supabase_client import get_service_client  # noqa: E402
from app.services.knowledge_ingest import ingest_knowledge  # noqa: E402


def backfill_system_prompts() -> None:
    db = get_service_client()
    scenarios = db.table("scenarios").select("id, slug, system_prompt").execute().data
    for scenario in scenarios:
        db.table("scenario_knowledge").delete().eq("scenario_id", scenario["id"]).eq(
            "metadata->>source", "system_prompt"
        ).execute()
        count = ingest_knowledge(
            db, scenario["system_prompt"], source="system_prompt", scenario_id=scenario["id"]
        )
        print(f"[{scenario['slug']}] {count} chunk(s) embedded")


def backfill_error_patterns(path: Path) -> None:
    db = get_service_client()
    patterns = json.loads(path.read_text(encoding="utf-8"))
    for entry in patterns:
        count = ingest_knowledge(
            db,
            entry["text"],
            source="tr_error_pattern",
            scenario_id=entry.get("scenario_id"),
        )
        print(f"error pattern -> {count} chunk(s) embedded")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--error-patterns", type=Path, default=None)
    args = parser.parse_args()

    backfill_system_prompts()
    if args.error_patterns:
        backfill_error_patterns(args.error_patterns)
