from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.reading import ReadingPassageOut
from app.services.scorecard import READING_COMPLETION_XP

router = APIRouter(prefix="/reading", tags=["reading"])


@router.get("", response_model=list[ReadingPassageOut])
def list_passages(
    scenario_id: str | None = None,
    ctx: AuthContext = Depends(get_auth_context),
) -> list[ReadingPassageOut]:
    query = ctx.db.table("reading_passages").select("*").order("sort_order")
    if scenario_id:
        query = query.eq("scenario_id", scenario_id)
    result = query.execute()
    return [ReadingPassageOut(**row) for row in result.data]


@router.get("/completed-slugs", response_model=list[str])
def list_completed_slugs(ctx: AuthContext = Depends(get_auth_context)) -> list[str]:
    """Slugs of every passage this user has finished — the mobile Reading list
    uses this + `sort_order` to compute which passage is next unlocked."""
    try:
        result = (
            ctx.db.table("reading_progress")
            .select("reading_passages(slug)")
            .eq("user_id", ctx.user.id)
            .execute()
        )
    except APIError:
        # `reading_progress` migration not applied yet on this environment —
        # degrade to "nothing completed" instead of 500ing the whole Reading list.
        return []
    return [row["reading_passages"]["slug"] for row in result.data if row.get("reading_passages")]


@router.get("/{slug}", response_model=ReadingPassageOut)
def get_passage(slug: str, ctx: AuthContext = Depends(get_auth_context)) -> ReadingPassageOut:
    try:
        result = ctx.db.table("reading_passages").select("*").eq("slug", slug).single().execute()
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reading passage not found") from exc
    return ReadingPassageOut(**result.data)


@router.post("/{slug}/complete", status_code=status.HTTP_204_NO_CONTENT)
def complete_passage(slug: str, ctx: AuthContext = Depends(get_auth_context)) -> None:
    """Marks a passage as completed once the mobile client has confirmed the
    user passed the quiz — same client-reports-the-outcome trust model as
    `/vocab-cards/{id}/review`'s SM-2 grade (the quiz's correct answers are
    already visible in this same passage's `GET` response, so there is no
    real anti-cheat boundary to enforce server-side here). XP is only granted
    the first time — replaying an already-completed passage doesn't farm XP."""
    try:
        passage = ctx.db.table("reading_passages").select("id").eq("slug", slug).single().execute().data
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reading passage not found") from exc

    already_completed = (
        ctx.db.table("reading_progress")
        .select("id")
        .eq("user_id", ctx.user.id)
        .eq("reading_passage_id", passage["id"])
        .execute()
        .data
    )
    ctx.db.table("reading_progress").upsert(
        {"user_id": ctx.user.id, "reading_passage_id": passage["id"]},
        on_conflict="user_id,reading_passage_id",
    ).execute()
    if not already_completed:
        profile = ctx.db.table("profiles").select("xp").eq("id", ctx.user.id).single().execute().data
        ctx.db.table("profiles").update({"xp": profile["xp"] + READING_COMPLETION_XP}).eq(
            "id", ctx.user.id
        ).execute()
