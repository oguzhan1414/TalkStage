from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    badges,
    chat,
    freechat_session,
    learning_flags,
    memory,
    onboarding,
    profiles,
    progress,
    reading,
    scenarios,
    scene_play_session,
    sessions,
    speech,
    tts,
    tutor,
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
app.include_router(freechat_session.router)
app.include_router(scene_play_session.router)
app.include_router(chat.router)
app.include_router(tutor.router)
app.include_router(learning_flags.router)
app.include_router(speech.router)
app.include_router(memory.router)
app.include_router(badges.router)


import os
from pathlib import Path
from fastapi.staticfiles import StaticFiles

videos_dir = Path(__file__).resolve().parent.parent.parent / "videos"
if videos_dir.exists():
    app.mount("/videos", StaticFiles(directory=str(videos_dir)), name="videos")

podcasts_dir = Path(__file__).resolve().parent.parent / "static" / "podcasts"
if podcasts_dir.exists():
    app.mount("/podcasts", StaticFiles(directory=str(podcasts_dir)), name="podcasts")


@app.get("/health")
def health():
    return {"status": "ok", "environment": settings.environment}
