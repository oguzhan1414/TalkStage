"""Read-only checks with mocked persistence and blocked outbound sockets."""
import ast
import asyncio
import json
import socket
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "backend"))

def emit(probe, **data):
    print(json.dumps({"probe": probe, **data}, ensure_ascii=True))

original_connect = socket.socket.connect
def no_network(sock, address):
    # asyncio on Windows uses an internal loopback socket pair.
    if isinstance(address, tuple) and address[0] in {"127.0.0.1", "::1"}:
        return original_connect(sock, address)
    raise RuntimeError("Network disabled for audit")

files = list((ROOT / "backend/app").rglob("*.py"))
for file in files:
    ast.parse(file.read_text(encoding="utf-8-sig"), filename=str(file))
emit("python-syntax", files=len(files), result="pass")

with patch.object(socket.socket, "connect", no_network):
    from app.core.config import settings
    settings.sentry_dsn = ""
    from app.main import app
    emit("app-import", routes=len(app.routes), result="pass")
    from app.api.routes import webhooks, sessions
    from app.services.entitlements import is_pro
    from app.core.security import user_from_token
    import jwt

    class DB:
        def __init__(self):
            self.row = None
        def table(self, name): return self
        def select(self, *args, **kwargs): return self
        def eq(self, *args): return self
        def upsert(self, row, **kwargs):
            self.row = row
            return self
        def execute(self): return SimpleNamespace(data=[self.row] if self.row else [])

    class Request:
        def __init__(self, event): self.event = event
        async def json(self): return {"event": self.event}

    settings.test_mode_unlimited = False
    settings.revenuecat_webhook_auth_header = "audit-only"
    future = int((datetime.now(timezone.utc) + timedelta(days=20)).timestamp() * 1000)
    db = DB()
    async def event(kind, expiration=future):
        await webhooks.revenuecat_webhook(Request({"type": kind, "app_user_id": "audit-user", "expiration_at_ms": expiration}), "audit-only")
    with patch.object(webhooks, "get_service_client", return_value=db):
        asyncio.run(event("CANCELLATION"))
        emit("cancel-before-expiry", status=db.row["status"], pro=is_pro(db, "audit-user"))
        asyncio.run(event("EXPIRATION", 1))
        asyncio.run(event("RENEWAL"))
        emit("delayed-event-overwrite", pro=is_pro(db, "audit-user"), note="No event timestamp or event id used")
        asyncio.run(event("TEST", None))
        emit("test-event", status=db.row["status"], pro=is_pro(db, "audit-user"))

    settings.supabase_url = ""
    settings.supabase_jwt_secret = "audit-only-key-at-least-thirty-two-characters"
    token = jwt.encode({"sub": "deleted-audit-user", "exp": datetime.now(timezone.utc) + timedelta(minutes=5), "aud": "authenticated", "iss": "audit"}, settings.supabase_jwt_secret, algorithm="HS256")
    emit("token-no-live-user-check", accepted=user_from_token(token).id == "deleted-audit-user", note="Synthetic token, not a real deleted production user")

    from app.schemas.session import SessionEndRequest
    payload = SessionEndRequest(scenario_id="audit-scenario", started_at="2026-10-07T09:00:00Z", ended_at="2026-10-07T09:01:00Z", transcript=[{"role": "user", "text": "Hello"}])
    class SessionsDB:
        def __init__(self): self.rows = []
        def table(self, name): return self
        def insert(self, row): self.rows.append(row); return self
        def execute(self): return SimpleNamespace(data=[self.rows[-1]])
    session_db = SessionsDB()
    ctx = SimpleNamespace(db=session_db, user=SimpleNamespace(id="audit-user"))
    with patch.object(sessions, "record_progress", side_effect=RuntimeError("simulated progress failure")):
        for _ in range(2):
            try: sessions.end_session(payload, ctx)
            except RuntimeError: pass
    emit("retry-after-partial-save", duplicateSessionRows=len(session_db.rows))
