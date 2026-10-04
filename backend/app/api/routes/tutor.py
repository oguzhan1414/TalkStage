import logging
from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import AuthContext, get_auth_context
from app.schemas.tutor import TutorTurnRequest, TutorTurnResponse
from app.services.tutor_engine import generate_tutor_turn

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tutor", tags=["tutor"])


@router.post("/turn", response_model=TutorTurnResponse)
async def tutor_turn(
    payload: TutorTurnRequest, ctx: AuthContext = Depends(get_auth_context)
) -> TutorTurnResponse:
    """Unified Maya tutoring endpoint: handles writing practice, speaking analysis,
    micro-grammar checks, and structured feedback."""
    try:
        profile = (
            ctx.db.table("profiles")
            .select("cefr_level, display_name")
            .eq("id", ctx.user.id)
            .single()
            .execute()
            .data
        )
        if profile:
            if not payload.cefr_level and profile.get("cefr_level"):
                payload.cefr_level = profile["cefr_level"]
            if not payload.display_name and profile.get("display_name"):
                payload.display_name = profile["display_name"]
    except Exception:
        pass

    try:
        response = await generate_tutor_turn(payload)
    except Exception as exc:
        logger.exception("Tutor turn endpoint failed")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="Maya şu an yanıt veremedi."
        ) from exc

    # Best-effort logging of grammar mistakes into user's history
    if response.correction.has_error and response.correction.corrected:
        try:
            ctx.db.table("grammar_mistakes").insert(
                {
                    "user_id": ctx.user.id,
                    "topic_code": payload.target_grammar_rule,
                    "wrong_text": response.correction.user_said or payload.user_input,
                    "corrected_text": response.correction.corrected,
                    "explanation_tr": response.correction.explanation_tr,
                    "source": "tutor_turn",
                }
            ).execute()
        except Exception:
            pass

    return response
