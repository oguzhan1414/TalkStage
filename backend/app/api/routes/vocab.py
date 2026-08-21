from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.vocab import VocabCardCreate, VocabCardOut, VocabReviewRequest
from app.services.sm2 import review_card

router = APIRouter(prefix="/vocab-cards", tags=["vocab"])


@router.get("", response_model=list[VocabCardOut])
def list_due_cards(ctx: AuthContext = Depends(get_auth_context)) -> list[VocabCardOut]:
    result = (
        ctx.db.table("vocab_cards")
        .select("*")
        .eq("user_id", ctx.user.id)
        .lte("next_review_date", date.today().isoformat())
        .order("next_review_date")
        .execute()
    )
    return [VocabCardOut(**row) for row in result.data]


@router.post("", response_model=VocabCardOut, status_code=status.HTTP_201_CREATED)
def create_card(payload: VocabCardCreate, ctx: AuthContext = Depends(get_auth_context)) -> VocabCardOut:
    row = {**payload.model_dump(), "user_id": ctx.user.id}
    result = ctx.db.table("vocab_cards").insert(row).execute()
    return VocabCardOut(**result.data[0])


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
    return VocabCardOut(**result.data[0])
