import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    badges,
    chat,
    freechat_session,
    grammar,
    learning_flags,
    memory,
    onboarding,
    profiles,
    progress,
    reading,
    reports,
    scenarios,
    scene_play_session,
    sessions,
    speech,
    subscriptions,
    tts,
    tutor,
    vocab,
    vocab_library,
    webhooks,
    writing,
    ws_session,
)
from app.core.clock import UtcOffsetMiddleware
from app.core.config import settings
from app.core.observability import init_sentry
from app.core.security import warm_up_jwks
from app.core.supabase_client import warm_up

init_sentry()

# The app's own info lines (voice timings, stt_utterance health) were invisible: without this only warnings reach
# the uvicorn console / docker logs.
logging.getLogger("app").setLevel(logging.INFO)
if not logging.getLogger("app").handlers:
    _handler = logging.StreamHandler()
    _handler.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))
    logging.getLogger("app").addHandler(_handler)


async def _warm_up() -> None:
    await run_in_threadpool(warm_up_jwks)
    await run_in_threadpool(warm_up)


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Pay for the Supabase TLS handshake and the JWKS download once at boot, not on a user's first request.
    # Runs in the background: uvicorn only opens its port after startup returns, and a slow or unreachable
    # Supabase must never keep the API from answering /health.
    warm = asyncio.create_task(_warm_up())
    yield
    warm.cancel()


# In production the interactive API docs and the OpenAPI schema stay private.
_is_prod = settings.environment == "production"
app = FastAPI(
    title="Spekvia API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=None if _is_prod else "/docs",
    redoc_url=None if _is_prod else "/redoc",
    openapi_url=None if _is_prod else "/openapi.json",
)

# The learner's calendar day (X-UTC-Offset) for quota, streak and review dates, see app/core/clock.py.
app.add_middleware(UtcOffsetMiddleware)
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
app.include_router(subscriptions.router)
app.include_router(ws_session.router)
app.include_router(freechat_session.router)
app.include_router(scene_play_session.router)
app.include_router(chat.router)
app.include_router(tutor.router)
app.include_router(learning_flags.router)
app.include_router(speech.router)
app.include_router(memory.router)
app.include_router(badges.router)
app.include_router(reports.router)
app.include_router(writing.router)
app.include_router(grammar.router)


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
