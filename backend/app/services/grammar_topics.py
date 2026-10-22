"""Grammar topics the app teaches (the 47 lessons) and the prompt block that lets the model link a mistake to one.

Data: `app/data/grammar_topics.json`, generated from the shared lesson data by `scripts/export_grammar_topics.py`.
A mistake logged with a valid `topic_code` shows the matching lesson as a suggestion in the Mistakes Notebook.
"""
import json
from functools import lru_cache
from pathlib import Path

_DATA = Path(__file__).resolve().parent.parent / "data" / "grammar_topics.json"


@lru_cache(maxsize=1)
def _topics() -> dict[str, str]:
    try:
        return {item["code"]: item["target"] for item in json.loads(_DATA.read_text(encoding="utf-8"))}
    except (OSError, ValueError, KeyError):
        return {}


def normalize_topic(value) -> str | None:
    """A valid topic code (e.g. "A1_N05") or None: the model's pick is never trusted blindly."""
    if not isinstance(value, str):
        return None
    code = value.strip().upper()
    return code if code in _topics() else None


@lru_cache(maxsize=1)
def topics_prompt_block() -> str:
    topics = _topics()
    if not topics:
        return ""
    lines = "\n".join(f"{code} | {target}" for code, target in topics.items())
    return (
        "\n\nGRAMMAR TOPIC LINK: when the mistake is a GRAMMAR mistake, set grammar_topic to the code of the ONE topic "
        "below whose rule best explains it (for example the past-tense topic for a wrong past form). Use null when the "
        "mistake is vocabulary, spelling or register, or when no topic below clearly fits. Never invent a code.\n"
        "TOPICS (code | grammar structure):\n" + lines
    )
