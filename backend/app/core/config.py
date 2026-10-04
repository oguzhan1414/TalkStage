from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=BACKEND_DIR / ".env", extra="ignore")

    environment: str = "development"

    # Supabase
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_jwt_secret: str = ""

    # STT
    deepgram_api_key: str = ""
    groq_api_key: str = ""

    # LLM
    openai_api_key: str = ""
    gemini_api_key: str = ""

    # TTS
    cartesia_api_key: str = ""
    cartesia_voice_id: str = ""
    elevenlabs_api_key: str = ""

    # Payments
    revenuecat_api_key: str = ""
    revenuecat_webhook_auth_header: str = ""

    # Cache
    redis_url: str = ""

    # Observability
    sentry_dsn: str = ""

    # Testing-only override — see entitlements.py::is_pro. Lifts the free-tier
    # daily session cap and the 5-minute per-session limit so real-device
    # testing isn't rate-limited by the same rules real users will hit.
    # Remove/set to false before any real user ever sees this backend.
    test_mode_unlimited: bool = False
    voice_quota_enabled: bool = False


settings = Settings()
