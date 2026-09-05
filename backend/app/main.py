from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    chat,
    learning_flags,
    onboarding,
    profiles,
    progress,
    reading,
    scenarios,
    sessions,
    tts,
    vocab,
    vocab_library,
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
app.include_router(vocab_library.router)
app.include_router(reading.router)
app.include_router(progress.router)
app.include_router(tts.router)
app.include_router(sessions.router)
app.include_router(webhooks.router)
app.include_router(ws_session.router)
app.include_router(chat.router)
app.include_router(learning_flags.router)


@app.get("/health")
def health():
    return {"status": "ok", "environment": settings.environment}
