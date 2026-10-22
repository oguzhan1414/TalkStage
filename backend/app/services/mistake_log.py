"""Shared insert for `grammar_mistakes` rows (the Mistakes Notebook).

Every logger sends the correction's `category` (grammar | vocabulary | register | spelling | pronunciation) when
it has one, so the notebook can filter by type. Migration 0031 adds that column; until it is applied the insert is
retried without it. Callers keep their own best-effort try/except around this.
"""
from postgrest.exceptions import APIError

_CATEGORIES = {"grammar", "vocabulary", "register", "spelling", "pronunciation"}


def correction_category(correction) -> str | None:
    value = getattr(correction, "category", None)
    return value if value in _CATEGORIES else None


def insert_mistake(db, row: dict) -> None:
    if row.get("category") is None:
        row = {k: v for k, v in row.items() if k != "category"}
    try:
        db.table("grammar_mistakes").insert(row).execute()
    except APIError:
        if "category" not in row:
            raise
        db.table("grammar_mistakes").insert({k: v for k, v in row.items() if k != "category"}).execute()
