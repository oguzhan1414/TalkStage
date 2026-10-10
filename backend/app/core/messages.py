"""Kullanıcıya gösterilen sabit sunucu metinleri — ana dile göre.

LLM çağrısı başarısız olunca ya da bir uç nokta hata verince dönen metinler eskiden hep Türkçeydi;
İngilizce/İspanyolca/Portekizce/Almanca kullanan biri Türkçe ipucu/hata görüyordu.
"""
from app.core.language import normalize_native_language

_MESSAGES: dict[str, dict[str, object]] = {
    "chat_unavailable": {
        "tr": "Sohbet cevabı alınamadı",
        "en": "Couldn't get the chat reply",
        "es": "No se pudo obtener la respuesta del chat",
        "pt": "Não foi possível obter a resposta do chat",
        "de": "Die Chat-Antwort konnte nicht abgerufen werden",
    },
    "stt_unavailable": {
        "tr": "Ses yazıya çevrilemedi",
        "en": "Couldn't transcribe the audio",
        "es": "No se pudo transcribir el audio",
        "pt": "Não foi possível transcrever o áudio",
        "de": "Das Audio konnte nicht transkribiert werden",
    },
    "tutor_unavailable": {
        "tr": "Mivo şu an yanıt veremedi.",
        "en": "Mivo can't answer right now.",
        "es": "Mivo no puede responder ahora mismo.",
        "pt": "O Mivo não consegue responder agora.",
        "de": "Mivo kann gerade nicht antworten.",
    },
    "tutor_fallback_hint": {
        "tr": "Güzel deneme! Pratik yapmaya devam edelim. Biraz daha anlatır mısın?",
        "en": "Nice try! Let's keep practicing. Can you tell me a bit more?",
        "es": "¡Buen intento! Sigamos practicando. ¿Puedes contarme un poco más?",
        "pt": "Boa tentativa! Vamos continuar praticando. Pode me contar um pouco mais?",
        "de": "Guter Versuch! Üben wir weiter. Kannst du etwas mehr erzählen?",
    },
    "tutor_fallback_tip": {
        "tr": "Cümle kurmaya devam et, Mivo seni dinliyor.",
        "en": "Keep building sentences — Mivo is listening.",
        "es": "Sigue formando frases, Mivo te escucha.",
        "pt": "Continue formando frases, o Mivo está ouvindo.",
        "de": "Bilde weiter Sätze – Mivo hört dir zu.",
    },
    "tutor_fallback_replies": {
        "tr": ["Evet, yapabilirim!", "Tabii, pratik yapalım."],
        "en": ["Yes, I can!", "Sure, let's practice."],
        "es": ["¡Sí, puedo!", "Claro, practiquemos."],
        "pt": ["Sim, eu consigo!", "Claro, vamos praticar."],
        "de": ["Ja, das kann ich!", "Klar, üben wir."],
    },
    "tutor_summary_done": {
        "tr": "Günün pratiğini tamamladın!",
        "en": "You finished today's practice!",
        "es": "¡Completaste la práctica de hoy!",
        "pt": "Você concluiu a prática de hoje!",
        "de": "Du hast die heutige Übung abgeschlossen!",
    },
    "tutor_summary_mission": {
        "tr": "Harika bir çalışma oldu! Bugünün hedefini başarıyla tamamladın.",
        "en": "Great work! You completed today's goal.",
        "es": "¡Gran trabajo! Cumpliste el objetivo de hoy.",
        "pt": "Ótimo trabalho! Você cumpriu a meta de hoje.",
        "de": "Tolle Arbeit! Du hast das heutige Ziel erreicht.",
    },
}


def msg(key: str, lang: str | None):
    """`key` metnini ana dile göre döndürür; bilinmeyen dil Türkçeye (kaynak dile) düşer."""
    return _MESSAGES[key][normalize_native_language(lang)]
