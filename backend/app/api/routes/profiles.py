from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.core.supabase_client import get_service_client
from app.schemas.profile import ProfileOut, ProfileUpdate

router = APIRouter(tags=["profile"])


@router.get("/me", response_model=ProfileOut)
def get_me(ctx: AuthContext = Depends(get_auth_context)) -> ProfileOut:
    try:
        result = ctx.db.table("profiles").select("*").eq("id", ctx.user.id).single().execute()
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found") from exc
    return ProfileOut(**result.data)


@router.patch("/me", response_model=ProfileOut)
def update_me(payload: ProfileUpdate, ctx: AuthContext = Depends(get_auth_context)) -> ProfileOut:
    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        return get_me(ctx)
    try:
        result = (
            ctx.db.table("profiles")
            .update(updates)
            .eq("id", ctx.user.id)
            .execute()
        )
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return ProfileOut(**result.data[0])


@router.delete("/me/account", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_account(ctx: AuthContext = Depends(get_auth_context)) -> None:
    """Permanently delete the authenticated Supabase Auth user.

    `profiles.id` references `auth.users` with ON DELETE CASCADE and every
    user-owned learning table cascades from profiles, so this single trusted
    server-side operation removes the account and its learning history. The
    service-role credential never leaves the backend.
    """
    try:
        get_service_client().auth.admin.delete_user(ctx.user.id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Account could not be deleted",
        ) from exc
