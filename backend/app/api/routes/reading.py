import asyncio

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context, get_locale
from app.schemas.reading import ReadingPassageOut
from app.services.content_i18n import overlay_translation
from app.core.language import normalize_native_language
from app.services.scorecard import READING_COMPLETION_XP
from app.services.speaking_check import check_speaking_sync

router = APIRouter(prefix="/reading", tags=["reading"])


@router.get("", response_model=list[ReadingPassageOut])
def list_passages(
    scenario_id: str | None = None,
    ctx: AuthContext = Depends(get_auth_context),
    locale: str = Depends(get_locale),
) -> list[ReadingPassageOut]:
    query = ctx.db.table("reading_passages").select("*").order("sort_order")
    if scenario_id:
        query = query.eq("scenario_id", scenario_id)
    result = query.execute()
    return [ReadingPassageOut(**overlay_translation(row, locale)) for row in result.data]


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
def get_passage(
    slug: str, ctx: AuthContext = Depends(get_auth_context), locale: str = Depends(get_locale)
) -> ReadingPassageOut:
    try:
        result = ctx.db.table("reading_passages").select("*").eq("slug", slug).single().execute()
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reading passage not found") from exc
    return ReadingPassageOut(**overlay_translation(result.data, locale))


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


class SpeakingCheckIn(BaseModel):
    transcript: str = Field(max_length=500)


class SpeakingCheckOut(BaseModel):
    passed: bool
    feedback: str = ""
    suggestion_en: str | None = None


@router.post("/{slug}/check-speaking", response_model=SpeakingCheckOut)
async def check_speaking(
    slug: str, payload: SpeakingCheckIn, ctx: AuthContext = Depends(get_auth_context)
) -> SpeakingCheckOut:
    """Hikayenin konuşma adımı: söylenen cümle kalıba ve soruya uyuyor mu (bkz. services/speaking_check.py).

    Soru/beklenen cevap istemciden değil, sunucudaki hikaye kaydından okunur."""
    try:
        passage = (
            ctx.db.table("reading_passages")
            .select("speaking_prompt, cefr_level")
            .eq("slug", slug)
            .single()
            .execute()
            .data
        )
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reading passage not found") from exc
    prompt = passage.get("speaking_prompt") or {}
    profile = (
        ctx.db.table("profiles").select("native_language").eq("id", ctx.user.id).limit(1).execute().data or [{}]
    )[0]
    native = normalize_native_language(profile.get("native_language"))
    result = await asyncio.to_thread(
        check_speaking_sync,
        prompt.get("yanki_ask") or "",
        prompt.get("expected_answer") or "",
        payload.transcript,
        passage.get("cefr_level") or "A1",
        native,
    )
    return SpeakingCheckOut(**result)
