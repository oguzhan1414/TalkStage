import hmac
from datetime import datetime, timezone

from fastapi import APIRouter, Header, HTTPException, Request, status

from app.core.config import settings
from app.core.supabase_client import get_service_client

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

_EXPIRED_EVENTS = {"EXPIRATION"}
_CANCELLED_EVENTS = {"CANCELLATION"}


def _map_status(event: dict) -> str:
    event_type = event.get("type")
    if event_type in _EXPIRED_EVENTS:
        return "expired"
    if event_type in _CANCELLED_EVENTS:
        return "cancelled"
    if event.get("period_type") == "TRIAL":
        return "trial"
    return "active"


@router.post("/revenuecat", status_code=status.HTTP_200_OK)
async def revenuecat_webhook(request: Request, authorization: str | None = Header(default=None)) -> dict:
    if not settings.revenuecat_webhook_auth_header or not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Webhook auth not configured")
    if not hmac.compare_digest(authorization, settings.revenuecat_webhook_auth_header):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook credentials")

    body = await request.json()
    event = body.get("event", {})

    # RevenueCat's app_user_id must be the Supabase auth user id — the mobile app
    # sets this when it configures the RevenueCat SDK (Görev 19: Purchases.configure(
    # apiKey, appUserID: supabaseUserId)). Without that, this webhook can't match a row.
    user_id = event.get("app_user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing app_user_id")

    expiration_ms = event.get("expiration_at_ms")
    current_period_end = (
        datetime.fromtimestamp(expiration_ms / 1000, tz=timezone.utc).isoformat() if expiration_ms else None
    )

    get_service_client().table("subscriptions").upsert(
        {
            "user_id": user_id,
            "revenuecat_customer_id": event.get("original_app_user_id", user_id),
            "product_id": event.get("product_id"),
            "status": _map_status(event),
            "current_period_end": current_period_end,
        },
        on_conflict="user_id",
    ).execute()

    return {"status": "ok"}
