"""The learning path's progress on the server (migration 0034), so it survives a new phone or a reinstall.

The app keeps its own copy and sends the whole thing after each change; the server merges it with what it has
(the best result of every step wins, a skip is dropped once the step is done) and returns the merged copy.
"""
import re
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context

router = APIRouter(prefix="/path-progress", tags=["path-progress"])

_STEP_ID = re.compile(r"^[a-z0-9][a-z0-9-]{1,40}$")
_LEVELS = {"A1", "A2", "B1", "B2", "C1", "C2"}
_MAX_STEPS = 2000


class PathProgressIn(BaseModel):
    stars: dict[str, int] = Field(default_factory=dict)
    parts: dict[str, int] = Field(default_factory=dict)
    skipped: dict[str, bool] = Field(default_factory=dict)
    level: str | None = None


class PathProgressOut(BaseModel):
    stars: dict[str, int]
    parts: dict[str, int]
    skipped: dict[str, bool]
    level: str | None = None


def _clean_counts(raw: object) -> dict[str, int]:
    out: dict[str, int] = {}
    if not isinstance(raw, dict):
        return out
    for k, v in list(raw.items())[:_MAX_STEPS]:
        if isinstance(k, str) and _STEP_ID.match(k) and isinstance(v, (int, float)):
            out[k] = max(0, min(3, int(v)))
    return out


def _clean_skipped(raw: object) -> dict[str, bool]:
    if not isinstance(raw, dict):
        return {}
    return {k: True for k, v in list(raw.items())[:_MAX_STEPS] if isinstance(k, str) and _STEP_ID.match(k) and v}


def merge(a: dict, b: dict) -> dict:
    """Best of both: highest stars and parts per step; skips only for steps still without stars."""
    stars, parts = dict(_clean_counts(a.get("stars"))), dict(_clean_counts(a.get("parts")))
    for k, v in _clean_counts(b.get("stars")).items():
        stars[k] = max(v, stars.get(k, 0))
    for k, v in _clean_counts(b.get("parts")).items():
        parts[k] = max(v, parts.get(k, 0))
    skipped = {**_clean_skipped(a.get("skipped")), **_clean_skipped(b.get("skipped"))}
    skipped = {k: True for k in skipped if not stars.get(k)}
    return {"stars": {k: v for k, v in stars.items() if v}, "parts": {k: v for k, v in parts.items() if v}, "skipped": skipped}


def _load(ctx: AuthContext) -> dict | None:
    rows = ctx.db.table("path_progress").select("progress, level").eq("user_id", ctx.user.id).limit(1).execute().data
    return rows[0] if rows else None


@router.get("", response_model=PathProgressOut)
def get_path_progress(ctx: AuthContext = Depends(get_auth_context)) -> PathProgressOut:
    row = _load(ctx)
    progress = merge(row["progress"] if row else {}, {})
    return PathProgressOut(**progress, level=row["level"] if row else None)


@router.post("", response_model=PathProgressOut)
def save_path_progress(payload: PathProgressIn, ctx: AuthContext = Depends(get_auth_context)) -> PathProgressOut:
    row = _load(ctx)
    merged = merge(row["progress"] if row else {}, payload.model_dump())
    level = payload.level if payload.level in _LEVELS else (row["level"] if row else None)
    ctx.db.table("path_progress").upsert(
        {
            "user_id": ctx.user.id,
            "progress": merged,
            "level": level,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
    ).execute()
    return PathProgressOut(**merged, level=level)
