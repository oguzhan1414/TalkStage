from fastapi import APIRouter, Depends, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.learning_flags import LearningFlagCreate

router = APIRouter(prefix="/learning-flags", tags=["learning-flags"])


@router.get("", response_model=list[str])
def list_learning_flags(ctx: AuthContext = Depends(get_auth_context)) -> list[str]:
    """Server-side backup of the Sahneler roadmap's completion flags
    (lesson_quiz_done_*, topic_chat_completed_*, mission_completed_*) — lets
    a reinstall or a second device recover which topics were already
    unlocked instead of re-locking them."""
    result = (
        ctx.db.table("learning_flags")
        .select("flag_key")
        .eq("user_id", ctx.user.id)
        .execute()
    )
    return [row["flag_key"] for row in result.data]


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
def set_learning_flag(
    payload: LearningFlagCreate, ctx: AuthContext = Depends(get_auth_context)
) -> None:
    try:
        ctx.db.table("learning_flags").insert(
            {"user_id": ctx.user.id, "flag_key": payload.flag_key}
        ).execute()
    except APIError:
        pass  # Already set (unique index) — idempotent from the client's perspective.
