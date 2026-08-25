from fastapi import APIRouter, Depends

from app.api.deps import AuthContext, get_auth_context
from app.schemas.session import SessionEndRequest, SessionOut
from app.services.progress import record_progress, update_streak_and_xp
from app.services.scorecard import (
    average_fluency_score,
    calculate_session_xp,
    count_unique_words,
)

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.get("", response_model=list[SessionOut])
def list_sessions(limit: int = 20, ctx: AuthContext = Depends(get_auth_context)) -> list[SessionOut]:
    result = (
        ctx.db.table("sessions")
        .select("*")
        .eq("user_id", ctx.user.id)
        .order("started_at", desc=True)
        .limit(limit)
        .execute()
    )
    return [SessionOut(**row) for row in result.data]


@router.post("/end", response_model=SessionOut, status_code=201)
def end_session(payload: SessionEndRequest, ctx: AuthContext = Depends(get_auth_context)) -> SessionOut:
    duration_seconds = int((payload.ended_at - payload.started_at).total_seconds())
    unique_words = count_unique_words(payload.transcript)
    fluency_score = average_fluency_score(payload.fluency_scores)

    session_row = (
        ctx.db.table("sessions")
        .insert(
            {
                "user_id": ctx.user.id,
                "scenario_id": payload.scenario_id,
                "started_at": payload.started_at.isoformat(),
                "ended_at": payload.ended_at.isoformat(),
                "duration_seconds": duration_seconds,
                "fluency_score": fluency_score,
                "unique_words_count": unique_words,
                "corrections_count": payload.corrections_count,
                "transcript": [t.model_dump() for t in payload.transcript],
            }
        )
        .execute()
        .data[0]
    )

    record_progress(ctx, duration_seconds // 60)
    update_streak_and_xp(ctx, calculate_session_xp(fluency_score))

    return SessionOut(**session_row)
