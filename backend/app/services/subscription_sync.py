"""Pulls a user's Pro state straight from RevenueCat (REST API v1) into `subscriptions`.

Webhooks keep the table current for purchases and renewals, but two cases need a direct read:
  * "Satın alımları geri yükle" in the app: the store receipt may belong to this account already (no webhook comes)
    or be moved here from another account (a TRANSFER webhook, which carries no expiry date).
  * the TRANSFER webhook itself: both the receiving and the losing account are re-read.
Needs REVENUECAT_API_KEY (the secret key); without it nothing is changed.
"""
import logging
from datetime import datetime, timezone

import httpx

from app.core.config import settings
from app.core.supabase_client import get_service_client

logger = logging.getLogger(__name__)

PRO_ENTITLEMENT_ID = "pro"
_API = "https://api.revenuecat.com/v1/subscribers/"


def _parse(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def status_from_subscriber(subscriber: dict, now: datetime) -> tuple[str, str | None, str | None] | None:
    """(status, current_period_end ISO, product_id) for the Pro entitlement, or None when it never existed."""
    entitlement = (subscriber.get("entitlements") or {}).get(PRO_ENTITLEMENT_ID)
    if not entitlement:
        return None
    product_id = entitlement.get("product_identifier")
    expires = _parse(entitlement.get("expires_date"))
    if expires is not None and expires <= now:
        return "expired", expires.isoformat(), product_id
    store_sub = (subscriber.get("subscriptions") or {}).get(product_id or "", {})
    if store_sub.get("unsubscribe_detected_at"):
        status = "cancelled"  # auto-renew off, still entitled until the period ends
    elif store_sub.get("period_type") == "trial":
        status = "trial"
    else:
        status = "active"
    return status, expires.isoformat() if expires else None, product_id


async def sync_from_revenuecat(user_id: str) -> str | None:
    """Writes the user's current Pro state; returns the status written, or None when nothing was changed."""
    if not settings.revenuecat_api_key:
        return None
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(_API + user_id, headers={"Authorization": f"Bearer {settings.revenuecat_api_key}"})
    if response.status_code != 200:
        logger.warning("RevenueCat subscriber lookup failed: %s", response.status_code)
        return None
    subscriber = response.json().get("subscriber") or {}
    now = datetime.now(timezone.utc)
    result = status_from_subscriber(subscriber, now)
    db = get_service_client()
    if result is None:
        # No Pro on this account at RevenueCat: an existing row is now out of date (e.g. moved to another account).
        rows = db.table("subscriptions").select("user_id").eq("user_id", user_id).execute().data
        if not rows:
            return None
        result = ("expired", None, None)
    status, period_end, product_id = result
    row = {
        "user_id": user_id,
        "revenuecat_customer_id": subscriber.get("original_app_user_id") or user_id,
        "status": status,
        "current_period_end": period_end,
        # Webhooks for events before this read are older than what was just written (see webhooks.py stale guard).
        "last_event_ms": int(now.timestamp() * 1000),
    }
    if product_id:
        row["product_id"] = product_id
    db.table("subscriptions").upsert(row, on_conflict="user_id").execute()
    return status
