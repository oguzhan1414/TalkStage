import asyncio

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.deps import AuthContext, get_auth_context
from app.schemas.calibration import CalibrationAnswerResult, CalibrationResult
from app.services.level_assessment import assess_level
from app.services.stt import transcribe_audio

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

MIN_ANSWERS = 1
MAX_ANSWERS = 5


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
