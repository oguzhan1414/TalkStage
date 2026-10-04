import hashlib
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.scenario import ScenarioOut

router = APIRouter(prefix="/scenarios", tags=["scenarios"])

_LIST_COLUMNS = (
    "id, slug, title, category, description, cefr_level, "
    "estimated_minutes, is_premium, cover_image_url, sort_order, "
    "ai_name, ai_role, situation, objectives, key_phrases, suggested_vocab"
)


@router.get("", response_model=list[ScenarioOut])
def list_scenarios(
    category: str | None = None,
    ctx: AuthContext = Depends(get_auth_context),
) -> list[ScenarioOut]:
    # `is_active` lets the catalog be narrowed to a curated set (e.g. the
    # A1/A2 relaunch) without destroying older, hand-authored scenario rows —
    # they stay in the table, just filtered out of what's browsable.
    query = ctx.db.table("scenarios").select(_LIST_COLUMNS).eq("is_active", True).order("sort_order")
    if category:
        query = query.eq("category", category)
    result = query.execute()
    return [ScenarioOut(**row) for row in result.data]


@router.get("/recommended", response_model=ScenarioOut)
def get_recommended_scenario(ctx: AuthContext = Depends(get_auth_context)) -> ScenarioOut:
    """Home Dashboard's "günün önerilen senaryosu" (plan doc 3.2). Deterministic per
    user per day (same pick all day, rotates daily), narrowed by interests/level when
    possible and falling back to the full catalog otherwise.

    Note for mobile: filtering by interest only works if `profiles.interests` values
    match the `scenarios.category` enum (tech/career/visa/b2b/travel/daily) — if the
    onboarding chips store different strings, this silently falls back to the
    unfiltered catalog rather than erroring.
    """
    profile = (
        ctx.db.table("profiles").select("interests, cefr_level").eq("id", ctx.user.id).single().execute().data
    )
    candidates = ctx.db.table("scenarios").select(_LIST_COLUMNS).eq("is_active", True).execute().data
    if not candidates:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No scenarios available")

    interests = profile.get("interests") or []
    pool = [s for s in candidates if s["category"] in interests] if interests else []
    pool = pool or candidates

    cefr_level = profile.get("cefr_level")
    if cefr_level:
        level_matched = [s for s in pool if s.get("cefr_level") == cefr_level]
        pool = level_matched or pool

    seed = f"{ctx.user.id}:{date.today().isoformat()}"
    index = int(hashlib.sha256(seed.encode()).hexdigest(), 16) % len(pool)
    return ScenarioOut(**pool[index])


@router.get("/{slug}", response_model=ScenarioOut)
def get_scenario(slug: str, ctx: AuthContext = Depends(get_auth_context)) -> ScenarioOut:
    try:
        result = (
            ctx.db.table("scenarios")
            .select(_LIST_COLUMNS)
            .eq("slug", slug)
            .single()
            .execute()
        )
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scenario not found") from exc
    return ScenarioOut(**result.data)
