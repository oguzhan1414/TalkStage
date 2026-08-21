from dataclasses import dataclass

from fastapi import Depends
from supabase import Client

from app.core.security import CurrentUser, get_current_user
from app.core.supabase_client import get_user_client


@dataclass
class AuthContext:
    user: CurrentUser
    db: Client


def get_auth_context(current_user: CurrentUser = Depends(get_current_user)) -> AuthContext:
    return AuthContext(user=current_user, db=get_user_client(current_user.access_token))
