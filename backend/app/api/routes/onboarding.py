import asyncio
from datetime import datetime, timezone

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.deps import AuthContext, get_auth_context
from app.schemas.calibration import CalibrationAnswerResult, CalibrationResult
from app.schemas.onboarding import OnboardingCompleteRequest
from app.schemas.profile import ProfileOut
from app.services.level_assessment import assess_level
from app.services.stt import transcribe_audio

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

MIN_ANSWERS = 1
MAX_ANSWERS = 5

# Derives `profiles.interests` (the `scenarios.category` enum values
# `GET /scenarios/recommended` already narrows by) from the new richer
# onboarding answers, so that existing personalization keeps working without
# the client needing to know this mapping. Deliberately conservative/simple —
# real signal from real answers, not a guess dressed up as one.
_PERSONA_INTERESTS: dict[str, list[str]] = {
    "student": ["daily"],
    "corporate": ["career", "b2b"],
    "tech": ["tech"],
    "traveler": ["travel"],
    "adult_hobby": ["daily"],
    "service": ["b2b", "daily"],
}
_GOAL_INTERESTS: dict[str, list[str]] = {
    "freeze_barrier": [],
    "exams_school": [],
    "work_career": ["career"],
    "travel_life": ["travel"],
    "no_partner": [],
}


def _derive_interests(persona_id: str, learning_goal: str) -> list[str]:
    combined = _PERSONA_INTERESTS.get(persona_id, []) + _GOAL_INTERESTS.get(learning_goal, [])
    seen: set[str] = set()
    ordered: list[str] = []
    for item in combined:
        if item not in seen:
            seen.add(item)
            ordered.append(item)
    return ordered


@router.post("/calibrate", response_model=CalibrationResult)
async def calibrate_level(
    answers: list[UploadFile] = File(..., description="One audio file per calibration question"),
    ctx: AuthContext = Depends(get_auth_context),
) -> CalibrationResult:
    """The 2-minute / 3-question voice mini-test from onboarding: transcribes each
    answer, has the LLM assign a CEFR level, persists it on the profile, and returns
    it so the mobile client can show the level badge immediately."""
    if not (MIN_ANSWERS <= len(answers) <= MAX_ANSWERS):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Expected between {MIN_ANSWERS} and {MAX_ANSWERS} audio answers",
        )

    results: list[CalibrationAnswerResult] = []
    async with httpx.AsyncClient() as http_client:
        for index, answer in enumerate(answers):
            audio_bytes = await answer.read()
            content_type = answer.content_type or "audio/wav"
            transcript = await transcribe_audio(http_client, audio_bytes, content_type)
            results.append(CalibrationAnswerResult(question_index=index, transcript=transcript))

    assessment = await asyncio.to_thread(assess_level, [r.transcript for r in results])

    ctx.db.table("profiles").update({"cefr_level": assessment.cefr_level}).eq("id", ctx.user.id).execute()

    return CalibrationResult(
        cefr_level=assessment.cefr_level,
        summary_tr=assessment.summary_tr,
        answers=results,
    )


@router.post("/complete", response_model=ProfileOut)
def complete_onboarding(
    payload: OnboardingCompleteRequest, ctx: AuthContext = Depends(get_auth_context)
) -> ProfileOut:
    """Single atomic write for the new 8-step onboarding flow (V2.0) — fired once
    from the mobile 'AI Plan Hazırlığı' (Magic Moment) screen with everything the
    user picked across the earlier steps, instead of each screen calling `PATCH /me`
    independently. Also derives `interests` server-side so the existing
    `GET /scenarios/recommended` personalization keeps working without the client
    needing to know that mapping."""
    updates = {
        "display_name": payload.display_name,
        "persona_id": payload.persona_id,
        "learning_goal": payload.learning_goal,
        "cefr_level": payload.cefr_level,
        "daily_target_minutes": payload.daily_target_minutes,
        "interests": _derive_interests(payload.persona_id, payload.learning_goal),
        "onboarding_completed_at": datetime.now(timezone.utc).isoformat(),
    }
    result = ctx.db.table("profiles").update(updates).eq("id", ctx.user.id).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return ProfileOut(**result.data[0])
