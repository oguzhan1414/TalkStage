import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field

from app.api.deps import AuthContext, get_auth_context
from app.core.supabase_client import get_service_client
from app.services.badges import BADGE_DEFS, BADGE_IDS, evaluate, gather_stats

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/badges", tags=["badges"])


class BadgeSyncRequest(BaseModel):
    #: True: istemci bir etkinliği (sahne, ders, podcast…) az önce bitirdi → saat tabanlı rozetler (Early Bird/Night Owl) değerlendirilir.
    after_activity: bool = False
    local_hour: int | None = Field(default=None, ge=0, le=23)


class BadgeState(BaseModel):
    id: str
    earned: bool
    earned_at: str | None = None
    current: int
    target: int
    #: Kazanıldı ama kutlama henüz gösterilmedi.
    unseen: bool = False


class BadgeSeenRequest(BaseModel):
    ids: list[str] = Field(max_length=40)


@router.post("/sync", response_model=list[BadgeState])
def sync_badges(payload: BadgeSyncRequest, ctx: AuthContext = Depends(get_auth_context)) -> list[BadgeState]:
    """Koşulları DB'deki gerçek verilerden değerlendirir, yeni kazanılanları kaydeder, tüm rozetlerin durumunu döndürür.
    İdempotent: istemci istediği kadar çağırabilir."""
    db = get_service_client()  # yazma yalnızca sunucuda; RLS kullanıcıya sadece okuma verir
    user_id = ctx.user.id
    progress = evaluate(gather_stats(db, user_id), after_activity=payload.after_activity, local_hour=payload.local_hour)

    persist = True
    try:
        stored = {
            row["badge_id"]: row
            for row in (db.table("user_badges").select("badge_id,earned_at,seen_at").eq("user_id", user_id).execute().data or [])
        }
    except Exception:
        # Migration 0028 henüz uygulanmadı: rozetler hesaplanır ama kaydedilmez (kutlama tekrarlanmasın diye "görüldü" sayılır).
        logger.warning("user_badges not available (migration 0028 applied?)", exc_info=True)
        stored, persist = {}, False
    now = datetime.now(timezone.utc).isoformat()
    fresh = [
        {"user_id": user_id, "badge_id": b.id, "earned_at": now}
        for b in BADGE_DEFS
        if b.id not in stored and progress.get(b.id, 0) >= b.target
    ]
    if fresh:
        if persist:
            db.table("user_badges").upsert(fresh, on_conflict="user_id,badge_id", ignore_duplicates=True).execute()
        for row in fresh:
            stored[row["badge_id"]] = {"badge_id": row["badge_id"], "earned_at": now, "seen_at": None if persist else now}

    states = []
    for b in BADGE_DEFS:
        row = stored.get(b.id)
        earned = row is not None
        states.append(
            BadgeState(
                id=b.id,
                earned=earned,
                earned_at=row["earned_at"] if row else None,
                current=b.target if earned else min(progress.get(b.id, 0), b.target),
                target=b.target,
                unseen=bool(row and not row.get("seen_at")),
            )
        )
    return states


@router.post("/seen", status_code=status.HTTP_204_NO_CONTENT)
def mark_badges_seen(payload: BadgeSeenRequest, ctx: AuthContext = Depends(get_auth_context)) -> None:
    ids = [i for i in payload.ids if i in BADGE_IDS]
    if not ids:
        return
    get_service_client().table("user_badges").update({"seen_at": datetime.now(timezone.utc).isoformat()}).eq(
        "user_id", ctx.user.id
    ).in_("badge_id", ids).execute()
