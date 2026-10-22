from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import AuthContext, get_auth_context
from app.services.subscription_sync import sync_from_revenuecat

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.post("/sync")
async def sync_my_subscription(ctx: AuthContext = Depends(get_auth_context)) -> dict:
    """Called by the app after "Satın alımları geri yükle": re-reads this account's Pro state from RevenueCat."""
    try:
        new_status = await sync_from_revenuecat(ctx.user.id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Subscription sync failed") from exc
    return {"status": new_status or "unchanged"}
