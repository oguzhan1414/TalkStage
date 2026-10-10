"""Öğrenenin ana dili (arayüz + açıklama dili).

Spekvia İngilizce öğretir; ana dil (profiles.native_language) ise açıklamaların,
çeviri ipuçlarının ve Mivo'nun "fısıltı" desteğinin hangi dilde yazılacağını belirler.
Alan adları (`*_tr`, `reply_tr_hint`…) geriye dönük uyumluluk için aynı kalır; içerikleri
artık ana dildedir.
"""

SUPPORTED_NATIVE_LANGUAGES = ("tr", "en", "es", "pt", "de")
DEFAULT_NATIVE_LANGUAGE = "tr"
#: Mobil ile aynı desen — API'de kullanılan deseni tek yerde tutar.
NATIVE_LANGUAGE_PATTERN = "^(tr|en|es|pt|de)$"

_NAMES = {
    "tr": "Turkish",
    "en": "English",
    "es": "Spanish",
    "pt": "Brazilian Portuguese",
    "de": "German",
}

# Deepgram dil kodları (öğrencinin kendi dilinde sorduğu cümleleri çözmek için).
DEEPGRAM_CODES = {"tr": "tr", "en": "en", "es": "es", "pt": "pt-BR", "de": "de"}


def normalize_native_language(code: str | None) -> str:
    """Bilinmeyen/boş değerleri varsayılan ana dile (tr) çevirir."""
    return code if code in SUPPORTED_NATIVE_LANGUAGES else DEFAULT_NATIVE_LANGUAGE


def native_language_name(code: str | None) -> str:
    """İngilizce dil adı — LLM komutlarına gömülür (ör. "Spanish")."""
    return _NAMES[normalize_native_language(code)]


def native_language_directive(code: str | None) -> str:
    """Her komutun sonuna eklenen, dil seçimini kesinleştiren kısa talimat."""
    name = native_language_name(code)
    if normalize_native_language(code) == "en":
        return (
            "NATIVE-LANGUAGE RULE: the learner's interface language is English. Every learner-facing "
            "explanation, hint, translation and summary (all fields whose name ends in `_tr`, plus any "
            "coaching text) must be written in plain, simple English. Do NOT use any other language."
        )
    return (
        f"NATIVE-LANGUAGE RULE: the learner's native language is {name}. Every learner-facing "
        f"explanation, hint, translation and summary (all fields whose name ends in `_tr`, plus any "
        f"coaching text meant to help the learner) must be written in natural {name}. Never answer "
        f"in Turkish unless {name} is Turkish. The English practice sentences themselves stay in English."
    )
