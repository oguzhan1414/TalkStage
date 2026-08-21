from functools import lru_cache

from fastapi import HTTPException, status
from supabase import Client, create_client

from app.core.config import settings


@lru_cache
def get_service_client() -> Client:
    """Privileged client (service role key) — bypasses RLS. Only for backend-trusted
    operations like the RevenueCat webhook or the embedding pipeline, never per-user reads."""
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase service role credentials are not configured",
        )
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def get_user_client(access_token: str) -> Client:
    """Client scoped to the requesting user's JWT so Postgres RLS policies enforce
    row ownership (auth.uid()) — the same client the tables were designed for."""
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase credentials are not configured",
        )
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    client.postgrest.auth(access_token)
    return client
