import json
import re
from functools import lru_cache
from openai import OpenAI
from app.core.config import settings
from app.core.language import native_language_name, normalize_native_language

# Common offline dictionary cache (thousands of CEFR words)
COMMON_DICTIONARY: dict[str, dict[str, str]] = {
    "hello": {"translation": "merhaba", "phonetic": "/həˈloʊ/", "pos": "noun/interjection", "ex": "Hello, how are you?", "ex_tr": "Merhaba, nasılsınız?"},
    "world": {"translation": "dünya", "phonetic": "/wɜːrld/", "pos": "noun", "ex": "Welcome to the world.", "ex_tr": "Dünyaya hoş geldiniz."},
    "computer": {"translation": "bilgisayar", "phonetic": "/kəmˈpjuːtər/", "pos": "noun", "ex": "My computer is fast.", "ex_tr": "Bilgisayarım hızlıdır."},
    "project": {"translation": "proje", "phonetic": "/ˈprɒdʒ.ekt/", "pos": "noun", "ex": "We have a new project.", "ex_tr": "Yeni bir projemiz var."},
    "developer": {"translation": "geliştirici / yazılımcı", "phonetic": "/dɪˈvel.ə.pər/", "pos": "noun", "ex": "She is a mobile developer.", "ex_tr": "O bir mobil geliştiricidir."},
    "meeting": {"translation": "toplantı", "phonetic": "/ˈmiː.tɪŋ/", "pos": "noun", "ex": "The meeting is at 2 PM.", "ex_tr": "Toplantı saat 14:00'te."},
    "problem": {"translation": "sorun / problem", "phonetic": "/ˈprɒb.ləm/", "pos": "noun", "ex": "There is a small problem.", "ex_tr": "Küçük bir problem var."},
    "solution": {"translation": "çözüm", "phonetic": "/səˈluː.ʃən/", "pos": "noun", "ex": "We found a good solution.", "ex_tr": "İyi bir çözüm bulduk."},
    "database": {"translation": "veritabanı", "phonetic": "/ˈdeɪ.tə.beɪs/", "pos": "noun", "ex": "Connect to the database.", "ex_tr": "Veritabanına bağlanın."},
    "coffee": {"translation": "kahve", "phonetic": "/ˈkɒf.i/", "pos": "noun", "ex": "I need some coffee.", "ex_tr": "Biraz kahveye ihtiyacım var."},
    "airport": {"translation": "havalimanı", "phonetic": "/ˈeə.pɔːt/", "pos": "noun", "ex": "We arrived at the airport.", "ex_tr": "Havalimanına vardık."},
    "passport": {"translation": "pasaport", "phonetic": "/ˈpɑːs.pɔːt/", "pos": "noun", "ex": "Show your passport.", "ex_tr": "Pasaportunuzu gösterin."},
    "ticket": {"translation": "bilet", "phonetic": "/ˈtɪk.ɪt/", "pos": "noun", "ex": "Here is my ticket.", "ex_tr": "İşte benim biletim."},
    "hotel": {"translation": "otel", "phonetic": "/həʊˈtel/", "pos": "noun", "ex": "The hotel is downtown.", "ex_tr": "Otel şehir merkezindedir."},
    "interview": {"translation": "mülakat / görüşme", "phonetic": "/ˈɪn.tə.vjuː/", "pos": "noun", "ex": "The interview went well.", "ex_tr": "Mülakat iyi geçti."},
    "experience": {"translation": "deneyim / tecrübe", "phonetic": "/ɪkˈspɪə.ri.əns/", "pos": "noun", "ex": "I have 5 years of experience.", "ex_tr": "5 yıllık deneyimim var."},
    "improve": {"translation": "geliştirmek / ilerletmek", "phonetic": "/ɪmˈpruːv/", "pos": "verb", "ex": "I want to improve my English.", "ex_tr": "İngilizcemi geliştirmek istiyorum."},
    "practice": {"translation": "pratik yapmak / alıştırma", "phonetic": "/ˈpræk.tɪs/", "pos": "verb/noun", "ex": "Practice speaking every day.", "ex_tr": "Her gün konuşma pratiği yapın."},
}


@lru_cache(maxsize=1000)
def lookup_word(term: str, native_language: str = "tr") -> dict:
    """Translates and enriches any English word or phrase with a native-language meaning, IPA and example sentence."""
    native_language = normalize_native_language(native_language)
    lang = native_language_name(native_language)
    clean_term = term.strip().strip(".,!?\"';:").lower()

    # The offline cache is Turkish-only; other languages go straight to the LLM lookup below.
    if native_language == "tr" and clean_term in COMMON_DICTIONARY:
        d = COMMON_DICTIONARY[clean_term]
        return {
            "term": term,
            "translation": d["translation"],
            "phonetic": d["phonetic"],
            "part_of_speech": d["pos"],
            "example_en": d["ex"],
            "example_tr": d["ex_tr"]
        }

    # If Groq API key is present, query LLM for rapid instant lookup
    if settings.groq_api_key:
        try:
            client = OpenAI(
                base_url="https://api.groq.com/openai/v1",
                api_key=settings.groq_api_key
            )
            prompt = (
                f"You are an English-{lang} dictionary. For the English word or phrase '{term}', "
                "return a strict JSON object with keys: "
                f"'translation' (natural {lang} meaning, 1-4 words), "
                "'phonetic' (IPA phonetic transcription, e.g. '/ɪmˈpruːv/'), "
                "'part_of_speech' (e.g. 'noun', 'verb', 'adjective', 'adverb', 'phrase'), "
                "'example_en' (short clear English sentence using the word), "
                f"'example_tr' ({lang} translation of the example sentence)."
            )
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "You are a bilingual dictionary. Respond ONLY in valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,
                response_format={"type": "json_object"}
            )
            raw = completion.choices[0].message.content
            data = json.loads(raw)
            return {
                "term": term,
                "translation": data.get("translation", term),
                "phonetic": data.get("phonetic", ""),
                "part_of_speech": data.get("part_of_speech", ""),
                "example_en": data.get("example_en", ""),
                "example_tr": data.get("example_tr", "")
            }
        except Exception:
            pass

    # Fallback
    return {
        "term": term,
        "translation": clean_term,
        "phonetic": "",
        "part_of_speech": "word",
        "example_en": f"Example with {term}.",
        "example_tr": ""
    }
