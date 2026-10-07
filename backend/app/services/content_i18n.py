"""Çok dilli içerik katmanı.

Senaryo ve okuma parçaları Türkçe (kaynak dil) olarak ana satırlarda durur;
diğer diller `translations` jsonb sütununda `{ "es": {alan: değer, ...} }`
biçiminde saklanır. İstek diline göre ilgili alanlar üstüne yazılır; çeviri
yoksa önce İngilizce'ye, o da yoksa Türkçe kaynağa düşülür.
"""
from app.core.language import normalize_native_language


def overlay_translation(row: dict, lang: str | None) -> dict:
    lang = normalize_native_language(lang)
    if lang == "tr":
        return row
    translations = row.get("translations") or {}
    chosen = translations.get(lang) or translations.get("en")
    if not chosen:
        return row
    merged = dict(row)
    for key, value in chosen.items():
        if value not in (None, "", []):
            merged[key] = value
    return merged


def overlay_all(rows: list[dict], lang: str | None) -> list[dict]:
    return [overlay_translation(r, lang) for r in rows]
