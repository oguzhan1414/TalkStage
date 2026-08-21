from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

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


settings = Settings()
