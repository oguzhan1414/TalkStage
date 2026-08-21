import json
from dataclasses import dataclass

from app.core.config import settings

DEEPGRAM_LIVE_URL = (
    "wss://api.deepgram.com/v1/listen"
    "?model=nova-2&language=en&smart_format=true"
    "&interim_results=true&endpointing=300"
    "&encoding=linear16&sample_rate=16000&channels=1"
)

CLOSE_STREAM_MESSAGE = json.dumps({"type": "CloseStream"})


def deepgram_auth_headers() -> dict[str, str]:
    if not settings.deepgram_api_key:
        raise RuntimeError("DEEPGRAM_API_KEY is not configured")
    return {"Authorization": f"Token {settings.deepgram_api_key}"}


@dataclass
class TranscriptEvent:
    text: str
    is_final: bool
    speech_final: bool


def parse_transcript_event(raw_message: str) -> TranscriptEvent | None:
    data = json.loads(raw_message)
    if data.get("type") != "Results":
        return None
    alternatives = data.get("channel", {}).get("alternatives", [])
    if not alternatives:
        return None
    text = alternatives[0].get("transcript", "")
    if not text:
        return None
    return TranscriptEvent(
        text=text,
        is_final=data.get("is_final", False),
        speech_final=data.get("speech_final", False),
    )
