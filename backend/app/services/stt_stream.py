import json
from dataclasses import dataclass, field

from app.core.config import settings

DEEPGRAM_LIVE_URL = (
    "wss://api.deepgram.com/v1/listen"
    "?model=nova-2&language=en&smart_format=true"
    "&interim_results=true&endpointing=300&filler_words=true&punctuate=true"
    "&encoding=linear16&sample_rate=16000&channels=1"
)

CLOSE_STREAM_MESSAGE = json.dumps({"type": "CloseStream"})
KEEP_ALIVE_MESSAGE = json.dumps({"type": "KeepAlive"})
# Push-to-talk: forces Deepgram to immediately finalize the current utterance
# the instant the user taps "Konuşmayı Bitir", instead of waiting for
# endpointing's silence-based detection (which never needs to fire anymore —
# the user controls turn end explicitly now).
FINALIZE_MESSAGE = json.dumps({"type": "Finalize"})


def deepgram_auth_headers() -> dict[str, str]:
    if not settings.deepgram_api_key:
        raise RuntimeError("DEEPGRAM_API_KEY is not configured")
    return {"Authorization": f"Token {settings.deepgram_api_key}"}


@dataclass
class WordMetric:
    word: str
    punctuated_word: str
    confidence: float
    start: float
    end: float


@dataclass
class TranscriptEvent:
    text: str
    is_final: bool
    speech_final: bool
    words: list[dict] = field(default_factory=list)
    duration_sec: float = 0.0
    wpm: float = 0.0
    filler_count: int = 0
    avg_confidence: float = 0.0
    from_finalize: bool = False


FILLER_WORDS = {"uh", "um", "umm", "uhh", "er", "ah", "like", "you know", "hmm"}


def parse_transcript_event(raw_message: str) -> TranscriptEvent | None:
    data = json.loads(raw_message)
    if data.get("type") != "Results":
        return None
    alternatives = data.get("channel", {}).get("alternatives", [])
    if not alternatives:
        return None
    alt = alternatives[0]
    text = alt.get("transcript", "")
    from_finalize = bool(data.get("from_finalize", False))
    # Deepgram may acknowledge an explicit Finalize with an empty transcript
    # when all preceding audio was already emitted as final segments. Keep
    # that event so the session can close the push-to-talk turn using the
    # segments it has accumulated.
    if not text and not from_finalize:
        return None

    raw_words = alt.get("words", [])
    words_list = []
    filler_count = 0
    total_conf = 0.0

    for w in raw_words:
        w_text = w.get("word", "").lower().strip()
        conf = float(w.get("confidence", 0.95))
        total_conf += conf
        if w_text in FILLER_WORDS:
            filler_count += 1
        words_list.append({
            "word": w.get("word", ""),
            "punctuated_word": w.get("punctuated_word", w.get("word", "")),
            "confidence": round(conf, 3),
            "start": round(float(w.get("start", 0.0)), 2),
            "end": round(float(w.get("end", 0.0)), 2),
        })

    avg_conf = round(total_conf / len(raw_words), 2) if raw_words else 0.95

    # Duration and WPM calculation
    duration = float(data.get("duration", 0.0))
    if duration <= 0 and words_list:
        duration = max(0.5, words_list[-1]["end"] - words_list[0]["start"])

    wpm = 0.0
    if duration > 0.4 and len(words_list) > 0:
        wpm = round((len(words_list) / (duration / 60.0)), 1)

    return TranscriptEvent(
        text=text,
        is_final=data.get("is_final", False),
        speech_final=data.get("speech_final", False),
        words=words_list,
        duration_sec=round(duration, 2),
        wpm=wpm,
        filler_count=filler_count,
        avg_confidence=avg_conf,
        from_finalize=from_finalize,
    )

