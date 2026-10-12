from typing import Literal

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context

router = APIRouter(prefix="/reports", tags=["reports"])


class AiContentReport(BaseModel):
    message_text: str = Field(min_length=1, max_length=4000)
    reason: Literal["harmful", "hate", "sexual", "inaccurate", "other"]
    note: str | None = Field(default=None, max_length=500)
    #: Where the reply was seen (free_chat | live | scene …), for triage.
    context: str | None = Field(default=None, max_length=40)


@router.post("/ai-content", status_code=status.HTTP_204_NO_CONTENT)
def report_ai_content(payload: AiContentReport, ctx: AuthContext = Depends(get_auth_context)) -> None:
    """In-app reporting of an offensive/harmful/inaccurate AI reply (Google Play's AI-Generated Content policy).
    Written under the user's own RLS identity (insert-own policy, migration 0030); reviewed in Supabase Studio."""
    ctx.db.table("ai_content_reports").insert(
        {
            "user_id": ctx.user.id,
            "message_text": payload.message_text,
            "reason": payload.reason,
            "note": payload.note,
            "context": payload.context,
        }
    ).execute()
