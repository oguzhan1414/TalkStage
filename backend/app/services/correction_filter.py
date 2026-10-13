"""Drops "corrections" that are only speech-recognition noise.

The learner's text usually comes from speech recognition (or fast typing), so capitalization, punctuation and
apostrophes carry no information: "i have a coffee" vs "I have a coffee." must never produce a correction card.
The prompt tells the model the same (see NOISE RULES in `llm_orchestrator._CORRECTION_GUIDANCE`); this is the
deterministic backstop for when it ignores that.
"""
import re
import unicodedata

_CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is", "we're": "we are",
    "they're": "they are", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have",
    "i'll": "i will", "you'll": "you will", "i'd": "i would", "you'd": "you would", "that's": "that is",
    "what's": "what is", "there's": "there is", "here's": "here is", "let's": "let us", "don't": "do not",
    "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not",
    "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not",
    "couldn't": "could not", "wouldn't": "would not", "shouldn't": "should not",
}
_PUNCTUATION = re.compile(r"[^\w\s]", re.UNICODE)


def normalize_for_compare(text: str) -> str:
    """Lower-case, expand common contractions, drop punctuation and collapse whitespace."""
    value = unicodedata.normalize("NFKC", text or "").lower().replace("’", "'")
    value = " ".join(_CONTRACTIONS.get(word, word) for word in value.split())
    value = _PUNCTUATION.sub(" ", value)
    return " ".join(value.split())


def is_trivial_difference(original: str | None, corrected: str | None) -> bool:
    """True when the two sentences differ only in case, punctuation, spacing or contraction style."""
    if not original or not corrected:
        return False
    return normalize_for_compare(original) == normalize_for_compare(corrected)


def drop_trivial_correction(correction, user_text: str | None = None):
    """Returns `correction` unchanged, or a copy with has_error=False when it is only a case/punctuation change.
    Works on any object with the Correction fields (kept free of imports from the orchestrator on purpose)."""
    if correction is None or not correction.has_error or not correction.corrected:
        return correction
    for original in (correction.user_said, user_text):
        if is_trivial_difference(original, correction.corrected):
            return correction.model_copy(
                update={"has_error": False, "user_said": None, "corrected": None, "explanation_tr": None}
            )
    return correction
