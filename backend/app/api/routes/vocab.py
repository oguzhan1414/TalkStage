from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Response, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context, get_locale
from app.schemas.vocab import (
    VocabCardCreate,
    VocabCardOut,
    VocabCardUpdate,
    VocabLookupOut,
    VocabReviewRequest,
)
from app.services.dictionary import lookup_word
from app.services.scorecard import VOCAB_REVIEW_XP
from app.services.sm2 import review_card

router = APIRouter(prefix="/vocab-cards", tags=["vocab"])


@router.get("/lookup", response_model=VocabLookupOut)
def lookup_term(
    term: str, ctx: AuthContext = Depends(get_auth_context), locale: str = Depends(get_locale)
) -> VocabLookupOut:
    """Translates and enriches any English word or phrase in reading passages."""
    data = lookup_word(term, locale)
    return VocabLookupOut(**data)


@router.get("", response_model=list[VocabCardOut])
def list_due_cards(all: bool = False, ctx: AuthContext = Depends(get_auth_context)) -> list[VocabCardOut]:
    """`all=true` returns every card the user has ever saved (used by the mobile
    dictionary & lifetime count), default returns only cards due for SM-2 review today."""
    query = ctx.db.table("vocab_cards").select("*").eq("user_id", ctx.user.id)
    if not all:
        query = query.lte("next_review_date", date.today().isoformat())
    result = query.order("created_at", desc=True).execute()
    return [VocabCardOut(**row) for row in result.data]


def _find_existing_card(ctx: AuthContext, term: str) -> dict | None:
    """Case-insensitive lookup so the same word can't be saved twice for one user."""
    rows = ctx.db.table("vocab_cards").select("id, term").eq("user_id", ctx.user.id).execute().data
    match = next((r for r in rows if r["term"].strip().lower() == term.lower()), None)
    if not match:
        return None
    return ctx.db.table("vocab_cards").select("*").eq("id", match["id"]).single().execute().data


@router.post("", response_model=VocabCardOut)
def create_card(
    payload: VocabCardCreate, response: Response, ctx: AuthContext = Depends(get_auth_context)
) -> VocabCardOut:
    """Saving a word that's already in the user's deck returns the existing
    card (200) instead of creating a duplicate (201) — the same word getting
    tapped again in a later scenario/reading passage shouldn't fragment its
    SM-2 review history across multiple rows."""
    term_clean = payload.term.strip()
    existing = _find_existing_card(ctx, term_clean)
    if existing:
        response.status_code = status.HTTP_200_OK
        return VocabCardOut(**existing)

    row = {**payload.model_dump(), "user_id": ctx.user.id, "term": term_clean}
    try:
        result = ctx.db.table("vocab_cards").insert(row).execute()
    except APIError:
        # Lost a race with a concurrent identical insert (unique index) — that
        # request's row is now canonical, return it instead of erroring.
        existing = _find_existing_card(ctx, term_clean)
        if existing:
            response.status_code = status.HTTP_200_OK
            return VocabCardOut(**existing)
        raise
    response.status_code = status.HTTP_201_CREATED
    return VocabCardOut(**result.data[0])


@router.patch("/{card_id}", response_model=VocabCardOut)
def update_card(
    card_id: str,
    payload: VocabCardUpdate,
    ctx: AuthContext = Depends(get_auth_context),
) -> VocabCardOut:
    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    result = (
        ctx.db.table("vocab_cards")
        .update(update_data)
        .eq("id", card_id)
        .eq("user_id", ctx.user.id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vocab card not found")
    return VocabCardOut(**result.data[0])


@router.delete("/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_card(
    card_id: str,
    ctx: AuthContext = Depends(get_auth_context),
) -> None:
    ctx.db.table("vocab_cards").delete().eq("id", card_id).eq("user_id", ctx.user.id).execute()


@router.post("/{card_id}/review", response_model=VocabCardOut)
def review_vocab_card(
    card_id: str,
    payload: VocabReviewRequest,
    ctx: AuthContext = Depends(get_auth_context),
) -> VocabCardOut:
    try:
        existing = (
            ctx.db.table("vocab_cards")
            .select("*")
            .eq("id", card_id)
            .eq("user_id", ctx.user.id)
            .single()
            .execute()
        )
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vocab card not found") from exc

    card = existing.data
    new_state = review_card(
        repetitions=card["sm2_repetitions"],
        ease_factor=float(card["sm2_ease_factor"]),
        interval_days=card["sm2_interval_days"],
        grade=payload.grade,
    )
    result = (
        ctx.db.table("vocab_cards")
        .update(
            {
                "sm2_repetitions": new_state.repetitions,
                "sm2_ease_factor": new_state.ease_factor,
                "sm2_interval_days": new_state.interval_days,
                "next_review_date": new_state.next_review_date.isoformat(),
            }
        )
        .eq("id", card_id)
        .execute()
    )
    _award_xp(ctx, VOCAB_REVIEW_XP)
    return VocabCardOut(**result.data[0])


def _award_xp(ctx: AuthContext, amount: int) -> None:
    profile = ctx.db.table("profiles").select("xp").eq("id", ctx.user.id).single().execute().data
    ctx.db.table("profiles").update({"xp": profile["xp"] + amount}).eq("id", ctx.user.id).execute()
