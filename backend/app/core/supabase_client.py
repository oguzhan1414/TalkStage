from functools import lru_cache

import httpx
from fastapi import HTTPException, status
from postgrest import SyncPostgrestClient
from postgrest.utils import SyncClient
from supabase import Client, create_client

from app.core.config import settings


@lru_cache
def _shared_transport() -> httpx.HTTPTransport:
    """One connection pool to Supabase for every user request. Building a full Supabase
    client per request opened a fresh TLS connection each time (measured: ~350 ms of setup
    plus a ~500 ms first query, against ~90 ms on a kept-alive connection).

    HTTP/1.1 on purpose: routes run on worker threads, and sharing one multiplexed HTTP/2
    connection between threads fails under load; with HTTP/1.1 each thread borrows its own
    kept-alive connection from the pool."""
    return httpx.HTTPTransport(
        http2=False,
        retries=1,
        limits=httpx.Limits(max_connections=50, max_keepalive_connections=20, keepalive_expiry=120),
    )


class UserDb(SyncPostgrestClient):
    """PostgREST client for one user's JWT (so RLS applies) that borrows the shared pool.
    Exposes the same `.table()` / `.rpc()` the routes already use."""

    def create_session(self, base_url, headers, timeout, verify=True, proxy=None) -> SyncClient:
        return SyncClient(
            base_url=base_url,
            headers=headers,
            timeout=timeout,
            transport=_shared_transport(),
            follow_redirects=True,
        )


@lru_cache
def get_service_client() -> Client:
    """Privileged client (service role key) — bypasses RLS. Only for backend-trusted
    operations like the RevenueCat webhook or the embedding pipeline, never per-user reads."""
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase service role credentials are not configured",
        )
    client = create_client(settings.supabase_url, settings.supabase_service_role_key)
    # This one client is shared by every thread: give its table/rpc calls the thread-safe pool too.
    client._postgrest = UserDb(
        f"{settings.supabase_url.rstrip('/')}/rest/v1",
        headers={
            "apikey": settings.supabase_service_role_key,
            "Authorization": f"Bearer {settings.supabase_service_role_key}",
        },
        timeout=httpx.Timeout(20.0, connect=8.0),
    )
    return client


def get_user_client(access_token: str) -> UserDb:
    """Client scoped to the requesting user's JWT so Postgres RLS policies enforce
    row ownership (auth.uid()) — the same client the tables were designed for."""
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase credentials are not configured",
        )
    return UserDb(
        f"{settings.supabase_url.rstrip('/')}/rest/v1",
        headers={
            "apikey": settings.supabase_anon_key,
            "Authorization": f"Bearer {access_token}",
        },
        timeout=httpx.Timeout(20.0, connect=8.0),
    )


def warm_up() -> None:
    """Opens a pooled connection at startup so the first user request does not pay for the TLS handshake."""
    if not settings.supabase_url or not settings.supabase_anon_key:
        return
    try:
        get_user_client(settings.supabase_anon_key).table("scenarios").select("id").limit(1).execute()
    except Exception:
        pass  # best-effort: a cold pool only makes the first request slower
