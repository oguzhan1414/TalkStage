from dataclasses import dataclass

from fastapi import Depends, Header
from supabase import Client

from app.core.language import normalize_native_language
from app.core.security import CurrentUser, get_current_user
from app.core.supabase_client import get_user_client


@dataclass
class AuthContext:
    user: CurrentUser
    db: Client


def get_auth_context(current_user: CurrentUser = Depends(get_current_user)) -> AuthContext:
    return AuthContext(user=current_user, db=get_user_client(current_user.access_token))


def get_locale(x_app_locale: str | None = Header(default=None)) -> str:
    """İstemcinin arayüz dili (X-App-Locale). Bilinmiyorsa/boşsa Türkçe — içerik
    çevirileri (senaryo, okuma) bu dile göre üstüne yazılır."""
    return normalize_native_language(x_app_locale)
