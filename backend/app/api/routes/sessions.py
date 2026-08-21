from datetime import date

from fastapi import APIRouter, Depends

from app.api.deps import AuthContext, get_auth_context
from app.schemas.session import SessionEndRequest, SessionOut
from app.services.scorecard import average_fluency_score, count_unique_words, next_streak_state

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

    _record_progress(ctx, duration_seconds)
    _update_streak(ctx)

    return SessionOut(**session_row)


def _record_progress(ctx: AuthContext, duration_seconds: int) -> None:
    today = date.today().isoformat()
    existing = (
        ctx.db.table("progress")
        .select("*")
        .eq("user_id", ctx.user.id)
        .eq("practice_date", today)
        .execute()
        .data
    )
    if existing:
        row = existing[0]
        ctx.db.table("progress").update(
            {
                "minutes_practiced": row["minutes_practiced"] + duration_seconds // 60,
                "scenarios_completed": row["scenarios_completed"] + 1,
            }
        ).eq("id", row["id"]).execute()
    else:
        ctx.db.table("progress").insert(
            {
                "user_id": ctx.user.id,
                "practice_date": today,
                "minutes_practiced": duration_seconds // 60,
                "scenarios_completed": 1,
            }
        ).execute()


def _update_streak(ctx: AuthContext) -> None:
    profile = ctx.db.table("profiles").select("*").eq("id", ctx.user.id).single().execute().data
    last_practice_date = (
        date.fromisoformat(profile["last_practice_date"]) if profile["last_practice_date"] else None
    )
    new_state = next_streak_state(
        current_streak=profile["streak_count"],
        longest_streak=profile["longest_streak"],
        last_practice_date=last_practice_date,
    )
    ctx.db.table("profiles").update(
        {
            "streak_count": new_state.streak_count,
            "longest_streak": new_state.longest_streak,
            "last_practice_date": new_state.last_practice_date.isoformat(),
        }
    ).eq("id", ctx.user.id).execute()
