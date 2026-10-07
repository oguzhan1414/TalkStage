from typing import Literal

from openai import OpenAI
from pydantic import BaseModel, Field

from app.core.config import settings

#: gpt-4o-mini is fast, reliable, and cost-effective for CEFR classification.
CHAT_MODEL = "gpt-4o-mini"

CEFRLevel = Literal["A1", "A2", "B1", "B2", "C1", "C2"]

_SYSTEM_PROMPT = (
    "You are an English proficiency assessor for a Turkish-speaking learner. Given "
    "transcripts of their spoken answers to a few short questions, evaluate grammar "
    "accuracy, vocabulary range, and fluency, then assign a single CEFR level (A1-C2). "
    "Be decisive even with short or imperfect answers — never refuse to pick a level. "
    "summary_tr must be a short, encouraging 1-2 sentence explanation in Turkish. "
    "reasons must be 2-3 short, concrete Turkish bullet points that justify the level — "
    "each one grounded in something specific from their actual answers (a word or phrase "
    "they used, a sentence structure, a grammar slip, how fluently they expressed an idea), "
    "never generic/templated praise. If an answer was empty or unintelligible, say so plainly "
    "in one of the reasons instead of inventing detail."
)


class LevelAssessment(BaseModel):
    cefr_level: CEFRLevel
    summary_tr: str = Field(description="1-2 sentence Turkish explanation of the assessment, shown to the user")
    reasons: list[str] = Field(
        description="2-3 short, concrete Turkish observations justifying the level, each tied to something "
        "specific the user actually said — shown to the user as a 'why this level' breakdown"
    )


def assess_level(transcripts: list[str]) -> LevelAssessment:
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    client = OpenAI(api_key=settings.openai_api_key)
    joined = "\n".join(f"Answer {i + 1}: {t}" for i, t in enumerate(transcripts))

    completion = client.beta.chat.completions.parse(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": _SYSTEM_PROMPT},
            {"role": "user", "content": joined},
        ],
        response_format=LevelAssessment,
        reasoning_effort="none",
    )
    parsed = completion.choices[0].message.parsed
    if parsed is None:
        raise RuntimeError("LLM did not return a parseable level assessment")
    return parsed
