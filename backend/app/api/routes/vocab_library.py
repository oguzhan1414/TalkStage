from fastapi import APIRouter, Depends, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.vocab_library import VocabLibraryProgressCreate

router = APIRouter(prefix="/vocab-library", tags=["vocab-library"])


@router.get("/progress", response_model=list[str])
def list_dismissed_words(ctx: AuthContext = Depends(get_auth_context)) -> list[str]:
    """Word ids the user explicitly marked "Biliyorum, Atla" in the Kelime
    Kütüphanesi. Combined client-side with already-saved vocab_cards terms,
    this lets each pack resume at its first not-yet-reviewed word instead of
    always restarting at #1."""
    result = (
        ctx.db.table("vocab_library_progress")
        .select("word_id")
        .eq("user_id", ctx.user.id)
        .execute()
    )
    return [row["word_id"] for row in result.data]


@router.post("/progress", status_code=status.HTTP_204_NO_CONTENT)
def mark_word_known(
    payload: VocabLibraryProgressCreate, ctx: AuthContext = Depends(get_auth_context)
) -> None:
    try:
        ctx.db.table("vocab_library_progress").insert(
            {"user_id": ctx.user.id, "word_id": payload.word_id}
        ).execute()
    except APIError:
        pass  # Already marked (unique index) — idempotent from the client's perspective.


@router.delete("/progress/{word_id}", status_code=status.HTTP_204_NO_CONTENT)
def unmark_word_known(word_id: str, ctx: AuthContext = Depends(get_auth_context)) -> None:
    ctx.db.table("vocab_library_progress").delete().eq("user_id", ctx.user.id).eq(
        "word_id", word_id
    ).execute()
