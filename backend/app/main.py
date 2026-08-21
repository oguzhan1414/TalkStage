from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    onboarding,
    profiles,
    reading,
    scenarios,
    sessions,
    tts,
    vocab,
    webhooks,
    ws_session,
)
from app.core.config import settings
from app.core.observability import init_sentry

init_sentry()

app = FastAPI(title="TalkStage API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(onboarding.router)
app.include_router(profiles.router)
app.include_router(scenarios.router)
app.include_router(vocab.router)
app.include_router(reading.router)
app.include_router(tts.router)
app.include_router(sessions.router)
app.include_router(webhooks.router)
app.include_router(ws_session.router)


@app.get("/health")
def health():
    return {"status": "ok", "environment": settings.environment}
