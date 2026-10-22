import logging
from dataclasses import dataclass
from functools import lru_cache

import jwt
from fastapi import Header, HTTPException, status
from jwt import PyJWKClient
from jwt.exceptions import PyJWKClientError

from app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class CurrentUser:
    id: str
    email: str | None
    access_token: str


def _extract_bearer_token(authorization: str | None) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header",
        )
    return authorization.split(" ", 1)[1].strip()


@lru_cache
def _jwks_client() -> PyJWKClient:
    # Supabase's current default for new projects: asymmetric signing keys (ES256),
    # verified via this public JWKS endpoint — no shared secret involved at all.
    # Keys are cached for six hours (the default re-downloaded the key set every five minutes,
    # stalling one request each time). An unknown key id still triggers an immediate refresh.
    return PyJWKClient(
        f"{settings.supabase_url}/auth/v1/.well-known/jwks.json",
        cache_keys=True,
        lifespan=6 * 60 * 60,
        timeout=10,
    )


def warm_up_jwks() -> None:
    """Downloads the signing keys at startup instead of during the first user request."""
    if not settings.supabase_url:
        return
    try:
        _jwks_client().get_signing_keys()
    except Exception:
        pass


def decode_supabase_jwt(token: str) -> dict:
    """Tries JWKS/asymmetric verification first (Supabase's current default for new
    projects), then falls back to a legacy shared HS256 secret if one is configured.
    A token that fails every configured verification method is a 401 (bad
    credentials); only having *no* verification method configured at all is a 500
    (server misconfiguration) — a malformed/forged token must never surface as 500."""
    if settings.supabase_url:
        try:
            signing_key = _jwks_client().get_signing_key_from_jwt(token)
            return jwt.decode(
                token,
                signing_key.key,
                algorithms=["ES256", "RS256"],
                audience="authenticated",
                issuer=f"{settings.supabase_url.rstrip('/')}/auth/v1",
                options={"require": ["exp", "sub", "aud", "iss"]},
                leeway=10,
            )
        except (PyJWKClientError, jwt.PyJWTError):
            pass  # no matching/valid JWKS key — fall through to the legacy secret

    if settings.supabase_jwt_secret:
        try:
            return jwt.decode(
                token,
                settings.supabase_jwt_secret,
                algorithms=["HS256"],
                audience="authenticated",
                issuer=f"{settings.supabase_url.rstrip('/')}/auth/v1" if settings.supabase_url else None,
                options={"require": ["exp", "sub", "aud", "iss"]},
                leeway=10,
            )
        except jwt.PyJWTError:
            pass

    if not settings.supabase_url and not settings.supabase_jwt_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Neither SUPABASE_URL (for JWKS) nor SUPABASE_JWT_SECRET is configured",
        )
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")


def user_from_token(token: str) -> CurrentUser:
    payload = decode_supabase_jwt(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject claim",
        )
    return CurrentUser(id=user_id, email=payload.get("email"), access_token=token)


def account_exists(user_id: str) -> bool:
    """False only when Supabase Auth says the user is gone (deleted account). A JWT stays valid until it expires
    (about an hour), so a deleted account's old token would still pass `user_from_token`. HTTP endpoints are safe
    anyway (RLS finds no rows), but a voice room would run, and cost money, on such a token. Fails open: a lookup
    error is not treated as a deleted account."""
    from app.core.supabase_client import get_service_client

    try:
        result = get_service_client().auth.admin.get_user_by_id(user_id)
        return bool(getattr(result, "user", None))
    except Exception as exc:
        text = str(exc).lower()
        if getattr(exc, "status", None) == 404 or "not found" in text or "user_not_found" in text:
            return False
        logger.warning("Account existence check failed; allowing the session", exc_info=True)
        return True


def get_current_user(authorization: str | None = Header(default=None)) -> CurrentUser:
    token = _extract_bearer_token(authorization)
    return user_from_token(token)
