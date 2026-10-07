import asyncio

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context
from app.core.language import normalize_native_language
from app.services.chat_memory import load_memory, update_memory_sync

router = APIRouter(prefix="/memory", tags=["memory"])


class MemoryTopic(BaseModel):
    topic: str
    at: str | None = None


class MemoryOut(BaseModel):
    summary: str = ""
    topics: list[MemoryTopic] = []
    facts: list[str] = []
    session_count: int = 0
    last_session_at: str | None = None


class MemoryTurn(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=2_000)


class MemoryUpdateRequest(BaseModel):
    history: list[MemoryTurn] = Field(max_length=60)


@router.get("", response_model=MemoryOut)
def get_memory(ctx: AuthContext = Depends(get_auth_context)) -> MemoryOut:
    row = load_memory(ctx.db, ctx.user.id)
    if not row:
        return MemoryOut()
    return MemoryOut(
        summary=row.get("summary") or "",
        topics=[MemoryTopic(**t) for t in (row.get("topics") or []) if isinstance(t, dict) and t.get("topic")],
        facts=[f for f in (row.get("facts") or []) if isinstance(f, str)],
        session_count=row.get("session_count") or 0,
        last_session_at=row.get("last_session_at"),
    )


@router.post("/update", status_code=status.HTTP_202_ACCEPTED)
async def update_memory(payload: MemoryUpdateRequest, ctx: AuthContext = Depends(get_auth_context)) -> dict:
    """Yazarak sohbetten çıkarken mobil tarafından çağrılır (sesli oturumda sunucu kendisi yapar)."""
    profile = ctx.db.table("profiles").select("native_language").eq("id", ctx.user.id).limit(1).execute().data or [{}]
    native = normalize_native_language(profile[0].get("native_language"))
    history = [t.model_dump() for t in payload.history]
    saved = await asyncio.to_thread(update_memory_sync, ctx.db, ctx.user.id, history, native)
    return {"saved": saved}


class MemoryFactsUpdate(BaseModel):
    facts: list[str] = Field(max_length=12)


@router.patch("/facts", response_model=MemoryOut)
def replace_facts(payload: MemoryFactsUpdate, ctx: AuthContext = Depends(get_auth_context)) -> MemoryOut:
    """Kullanıcı "hatırladıkların" listesinden yanlış/istemediği maddeleri çıkarır (liste tamamen değiştirilir)."""
    facts = [f.strip()[:140] for f in payload.facts if f.strip()]
    ctx.db.table("chat_memory").update({"facts": facts}).eq("user_id", ctx.user.id).execute()
    return get_memory(ctx)


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_memory(ctx: AuthContext = Depends(get_auth_context)) -> None:
    ctx.db.table("chat_memory").delete().eq("user_id", ctx.user.id).execute()
