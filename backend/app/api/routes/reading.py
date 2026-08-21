from fastapi import APIRouter, Depends, HTTPException, status
from postgrest.exceptions import APIError

from app.api.deps import AuthContext, get_auth_context
from app.schemas.reading import ReadingPassageOut

router = APIRouter(prefix="/reading", tags=["reading"])


@router.get("", response_model=list[ReadingPassageOut])
def list_passages(
    scenario_id: str | None = None,
    ctx: AuthContext = Depends(get_auth_context),
) -> list[ReadingPassageOut]:
    query = ctx.db.table("reading_passages").select("*").order("sort_order")
    if scenario_id:
        query = query.eq("scenario_id", scenario_id)
    result = query.execute()
    return [ReadingPassageOut(**row) for row in result.data]


@router.get("/{slug}", response_model=ReadingPassageOut)
def get_passage(slug: str, ctx: AuthContext = Depends(get_auth_context)) -> ReadingPassageOut:
    try:
        result = ctx.db.table("reading_passages").select("*").eq("slug", slug).single().execute()
    except APIError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reading passage not found") from exc
    return ReadingPassageOut(**result.data)
