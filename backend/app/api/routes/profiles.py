from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
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
