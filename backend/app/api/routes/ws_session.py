"""Authenticated scenario voice rooms; shared protocol lives in services/voice_session.py."""
import asyncio
import logging
from functools import partial

from fastapi import APIRouter, WebSocket
from postgrest.exceptions import APIError

from app.core.config import settings
from app.core.language import normalize_native_language
from app.core.supabase_client import get_service_client
from app.services.content_i18n import overlay_translation
from app.services.entitlements import FREE_SESSION_MAX_SECONDS, can_start_session, is_pro
from app.services.rag import build_enriched_system_prompt
from app.services.voice_session import authenticate_voice, serve_voice, MAX_SESSION_SECONDS
from app.services.voice_turn import run_voice_turn

logger = logging.getLogger(__name__)
router = APIRouter(tags=["voice"])


def _uses_beginner_teacher_mode(scenario: dict) -> bool:
    return (scenario.get("cefr_level") or "").upper() in {"A1", "A2"}


# Teacher-mode opening line, per native language: (with a first step, without one).
_OPENING_TEMPLATES = {
    "tr": ("Bu sahnede {situation} İlk adımın şu: {step} Hazır olduğunda butona basılı tutup İngilizce söyle.",
           "Bu sahnede {situation} Hazır olduğunda butona basılı tut ve ilk İngilizce cümleni söyle.",
           "bu günlük konuşma sahnesi"),
    "en": ("In this scene: {situation} Your first step: {step} When you're ready, hold the button and say it in English.",
           "In this scene: {situation} When you're ready, hold the button and say your first sentence in English.",
           "this everyday conversation scene"),
    "es": ("En esta escena: {situation} Tu primer paso: {step} Cuando estés listo, mantén pulsado el botón y dilo en inglés.",
           "En esta escena: {situation} Cuando estés listo, mantén pulsado el botón y di tu primera frase en inglés.",
           "esta escena de conversación cotidiana"),
    "pt": ("Nesta cena: {situation} Seu primeiro passo: {step} Quando estiver pronto, segure o botão e diga em inglês.",
           "Nesta cena: {situation} Quando estiver pronto, segure o botão e diga sua primeira frase em inglês.",
           "esta cena de conversa do dia a dia"),
    "de": ("In dieser Szene: {situation} Dein erster Schritt: {step} Wenn du bereit bist, halte die Taste gedrückt und sag es auf Englisch.",
           "In dieser Szene: {situation} Wenn du bereit bist, halte die Taste gedrückt und sag deinen ersten Satz auf Englisch.",
           "diese Alltagsgesprächsszene"),
}


def _teacher_opening_line(scenario: dict, native_language: str = "tr") -> str:
    native_language = normalize_native_language(native_language)
    with_step, without_step, fallback = _OPENING_TEMPLATES[native_language]
    situation = (scenario.get("situation") or scenario.get("description") or fallback).strip()
    objectives = scenario.get("objectives") or []
    # `text_tr` holds the native-language text once translations are overlaid; English `text` is the fallback.
    first_step = next((item.get("text_tr") or item.get("text") for item in objectives
                       if item.get("text_tr") or item.get("text")), None)
    if first_step:
        return with_step.format(situation=situation[:180], step=first_step)
    return without_step.format(situation=situation[:180])


def _load_scenario(slug: str) -> dict:
    db = get_service_client()
    try:
        result = db.table("scenarios").select("*").eq("slug", slug).single().execute()
    except APIError as exc:
        raise ValueError(f"Unknown scenario: {slug}") from exc
    return result.data


def _load_native_language(user_id: str) -> str:
    try:
        row = get_service_client().table("profiles").select("native_language").eq("id", user_id).single().execute().data
        return normalize_native_language((row or {}).get("native_language"))
    except Exception:
        return "tr"


def _log_mistake_if_any(db, user_id: str, user_transcript: str, correction) -> None:
    """Voice sessions detected+displayed corrections but never persisted them
    — unlike text chat (`chat.py`), which logs to `grammar_mistakes` so they
    show up in the Hata Defterim notebook. Same best-effort shape as chat.py:
    a logging failure must never break the turn the user is waiting on."""
    if not (correction.has_error and correction.corrected):
        return
    try:
        db.table("grammar_mistakes").insert(
            {
                "user_id": user_id,
                "topic_code": None,
                "wrong_text": user_transcript,
                "corrected_text": correction.corrected,
                "explanation_tr": correction.explanation_tr,
                "source": "voice_session",
            }
        ).execute()
    except Exception:
        logger.exception("Failed to log grammar mistake from voice session")


@router.websocket("/ws/session/{session_id}")
async def voice_session(websocket: WebSocket, session_id: str) -> None:
    user = await authenticate_voice(websocket)
    if user is None:
        return
    try:
        scenario = await asyncio.wait_for(asyncio.to_thread(_load_scenario, session_id), 10)
        native = await asyncio.to_thread(_load_native_language, user.id)
        scenario = overlay_translation(scenario, native)
        db = get_service_client()
        if settings.voice_quota_enabled and not await asyncio.to_thread(can_start_session, db, user.id):
            await websocket.close(code=1008, reason="quota_exceeded")
            return
        pro = not settings.voice_quota_enabled or await asyncio.to_thread(is_pro, db, user.id)
    except Exception:
        await websocket.close(code=1011, reason="scenario_unavailable")
        return
    teacher = _uses_beginner_teacher_mode(scenario)

    async def run_turn(ws, client, history, text, send_json):
        prompt = await build_enriched_system_prompt(
            scenario["id"], scenario["title"], scenario["system_prompt"],
            scenario.get("cefr_level"), text, objectives=scenario.get("objectives"),
            rag_timeout_seconds=0.8, native_language=native,
        )
        await run_voice_turn(ws, client, prompt, history, text, send_json,
                             language=native if teacher else "en", allow_completion=True,
                             log_mistake=partial(_log_mistake_if_any, db, user.id, text))

    await serve_voice(websocket, user.id,
                      _teacher_opening_line(scenario, native) if teacher else scenario.get("opening_line"),
                      run_turn, language=native if teacher else "en", teacher_mode=teacher,
                      native_language=native,
                      max_seconds=MAX_SESSION_SECONDS if pro else FREE_SESSION_MAX_SECONDS)
