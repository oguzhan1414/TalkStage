import hmac
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Header, HTTPException, Request, status

from app.core.config import settings
from app.core.supabase_client import get_service_client

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

# RevenueCat olay semantiği: https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields
_ACTIVATING_EVENTS = {
    "INITIAL_PURCHASE", "RENEWAL", "PRODUCT_CHANGE", "UNCANCELLATION",
    "NON_RENEWING_PURCHASE", "SUBSCRIPTION_EXTENDED",
}
# Bu olaylar hak durumunu değiştirmez (TEST, TRANSFER, BILLING_ISSUE, SUBSCRIPTION_PAUSED, bilinmeyenler…).
# Eskiden bilinmeyen her olay "active" yazıyordu; artık yalnızca bilinenler durum değiştirir.
_REFUND_CANCEL_REASONS = {"CUSTOMER_SUPPORT"}


def decide_status(event: dict, now_ms: int) -> str | None:
    """Olaydan yeni abonelik durumunu çıkarır; durumu değiştirmeyen olaylar için None."""
    event_type = event.get("type")
    if event_type in _ACTIVATING_EVENTS:
        return "trial" if event.get("period_type") == "TRIAL" else "active"
    if event_type == "EXPIRATION":
        return "expired"
    if event_type == "CANCELLATION":
        # CANCELLATION = otomatik yenileme kapandı; ödenen dönem bitene kadar hak sürer
        # (entitlements.is_pro `cancelled` + gelecekteki bitiş tarihini geçerli sayar).
        # İade (müşteri desteği) ya da dönemi zaten bitmiş iptal ise hak hemen biter.
        expiration_ms = event.get("expiration_at_ms")
        if event.get("cancel_reason") in _REFUND_CANCEL_REASONS:
            return "expired"
        if expiration_ms and expiration_ms <= now_ms:
            return "expired"
        return "cancelled"
    return None


def _is_uuid(value: object) -> bool:
    try:
        uuid.UUID(str(value))
        return True
    except (ValueError, AttributeError, TypeError):
        return False


@router.post("/revenuecat", status_code=status.HTTP_200_OK)
async def revenuecat_webhook(request: Request, authorization: str | None = Header(default=None)) -> dict:
    if not settings.revenuecat_webhook_auth_header or not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Webhook auth not configured")
    if not hmac.compare_digest(authorization, settings.revenuecat_webhook_auth_header):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook credentials")

    body = await request.json()
    event = body.get("event", {})
    if not isinstance(event, dict):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid event")

    # Sandbox/TEST olayı üretimde hak vermez.
    if event.get("environment") == "SANDBOX" and settings.environment == "production":
        return {"status": "ignored", "reason": "sandbox"}
    now_ms = int(datetime.now(timezone.utc).timestamp() * 1000)
    new_status = decide_status(event, now_ms)
    if new_status is None:
        return {"status": "ignored", "reason": "event_type"}

    # RevenueCat's app_user_id must be the Supabase auth user id — the mobile app
    # sets this when it configures the RevenueCat SDK (Görev 19: Purchases.configure(
    # apiKey, appUserID: supabaseUserId)). Without that, this webhook can't match a row.
    user_id = event.get("app_user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing app_user_id")
    if not _is_uuid(user_id):
        # Anonim RevenueCat kimliği ($RCAnonymousID:…) — eşleşecek bir kullanıcı yok, tekrar denemeye gerek yok.
        return {"status": "ignored", "reason": "anonymous_user"}

    db = get_service_client()
    event_ms = event.get("event_timestamp_ms")
    if isinstance(event_ms, (int, float)):
        rows = db.table("subscriptions").select("last_event_ms").eq("user_id", user_id).execute().data
        last_ms = rows[0].get("last_event_ms") if rows else None
        if last_ms is not None and event_ms <= last_ms:
            # Geç gelen eski olay, daha yeni durumu geri almasın.
            return {"status": "ignored", "reason": "stale_event"}

    expiration_ms = event.get("expiration_at_ms")
    current_period_end = (
        datetime.fromtimestamp(expiration_ms / 1000, tz=timezone.utc).isoformat() if expiration_ms else None
    )

    db.table("subscriptions").upsert(
        {
            "user_id": user_id,
            "revenuecat_customer_id": event.get("original_app_user_id", user_id),
            "product_id": event.get("product_id"),
            "status": new_status,
            "current_period_end": current_period_end,
            "last_event_ms": int(event_ms) if isinstance(event_ms, (int, float)) else None,
        },
        on_conflict="user_id",
    ).execute()

    return {"status": "ok"}
