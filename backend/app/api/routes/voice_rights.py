"""What the learner may open before entering a voice room, so the app can show a lock instead of a room that closes.

The rooms themselves still enforce the same rules (app/services/voice_access.py); this is only the read side.
"""
import asyncio

from fastapi import APIRouter, Depends

from app.api.deps import AuthContext, get_auth_context
from app.core.config import settings
from app.core.supabase_client import get_service_client
from app.services.entitlements import is_pro
from app.services.voice_access import free_block_reason

router = APIRouter(prefix="/voice", tags=["voice"])


@router.get("/access")
async def voice_access(ctx: AuthContext = Depends(get_auth_context)) -> dict:
    """`pro`, and for a free learner whether the Mivo chat trial and today's Scenes voice scene are still open."""
    if not settings.voice_quota_enabled:
        return {"pro": False, "quota": False, "free_chat": True, "scene": True}
    db = get_service_client()
    pro = await asyncio.to_thread(is_pro, db, ctx.user.id)
    if pro:
        return {"pro": True, "quota": True, "free_chat": True, "scene": True}
    chat_block, scene_block = await asyncio.gather(
        asyncio.to_thread(free_block_reason, db, ctx.user.id, "free_chat"),
        asyncio.to_thread(free_block_reason, db, ctx.user.id, "scene"),
    )
    return {"pro": False, "quota": True, "free_chat": chat_block is None, "scene": scene_block is None}
