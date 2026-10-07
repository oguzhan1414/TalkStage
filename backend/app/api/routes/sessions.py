from fastapi import APIRouter, Depends
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.session import SessionEndRequest, SessionOut
from app.services.progress import record_progress, update_streak_and_xp
from app.services.scorecard import (
    average_float,
    average_fluency_score,
    calculate_session_xp,
    count_unique_words,
    count_user_turns,
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
    avg_wpm = average_float(payload.wpm_values)
    avg_confidence = average_float(payload.confidence_values, ndigits=3)
    user_turns = count_user_turns(payload.transcript)

    started_iso = payload.started_at.isoformat()

    def find_existing() -> dict | None:
        rows = (
            ctx.db.table("sessions")
            .select("*")
            .eq("user_id", ctx.user.id)
            .eq("scenario_id", payload.scenario_id)
            .eq("started_at", started_iso)
            .limit(1)
            .execute()
            .data
        )
        return rows[0] if rows else None

    # Idempotent: aynı (kullanıcı, senaryo, başlangıç) isteği tekrar gelirse yeni satır açılmaz;
    # yarım kalmış ilerleme/XP adımları kaldığı yerden tamamlanır (progress_stage, bkz. 0026).
    session_row = find_existing()
    if session_row is None:
        try:
            session_row = (
                ctx.db.table("sessions")
                .insert(
                    {
                        "user_id": ctx.user.id,
                        "scenario_id": payload.scenario_id,
                        "started_at": started_iso,
                        "ended_at": payload.ended_at.isoformat(),
                        "duration_seconds": duration_seconds,
                        "fluency_score": fluency_score,
                        "unique_words_count": unique_words,
                        "corrections_count": payload.corrections_count,
                        "avg_wpm": avg_wpm,
                        "avg_pronunciation_confidence": avg_confidence,
                        "user_turns_count": user_turns,
                        "transcript": [t.model_dump() for t in payload.transcript],
                        "progress_stage": 0,
                    }
                )
                .execute()
                .data[0]
            )
        except APIError:
            # Eşzamanlı ikinci istek unique indexe çarptı: mevcut satırı kullan.
            session_row = find_existing()
            if session_row is None:
                raise

    stage = session_row.get("progress_stage", 2)
    if stage < 1:
        record_progress(ctx, duration_seconds // 60)
        ctx.db.table("sessions").update({"progress_stage": 1}).eq("id", session_row["id"]).execute()
    if stage < 2:
        update_streak_and_xp(ctx, calculate_session_xp(fluency_score))
        ctx.db.table("sessions").update({"progress_stage": 2}).eq("id", session_row["id"]).execute()

    return SessionOut(**session_row)
