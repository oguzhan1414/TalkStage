"""The learner's local calendar day.

Daily quota, streak, practice log and vocab review dates are about the learner's day, not the server's: with plain
`date.today()` (UTC) a Turkish learner's day ended at 03:00 and practice after midnight landed on the day before.

The app sends its UTC offset in minutes (`X-UTC-Offset` header on HTTP, `utc_offset` in the voice-room auth message).
`UtcOffsetMiddleware` / `set_utc_offset` put it in a context variable for the request; without it the default is
Turkey (UTC+3, no DST), the main market. A fixed offset is enough for "which day is it" and needs no tz database.
"""
from contextvars import ContextVar
from datetime import date, datetime, time, timedelta, timezone

DEFAULT_OFFSET_MINUTES = 180  # Turkey, UTC+3 all year
_MIN_OFFSET, _MAX_OFFSET = -12 * 60, 14 * 60

_offset_minutes: ContextVar[int | None] = ContextVar("utc_offset_minutes", default=None)


def parse_offset(raw: object) -> int | None:
    """Minutes east of UTC from the client, or None when missing or not plausible."""
    try:
        value = int(str(raw).strip())
    except (TypeError, ValueError):
        return None
    return value if _MIN_OFFSET <= value <= _MAX_OFFSET else None


def set_utc_offset(raw: object):
    """Sets the offset for the current request/connection; returns the token for `reset_utc_offset`."""
    return _offset_minutes.set(parse_offset(raw))


def reset_utc_offset(token) -> None:
    _offset_minutes.reset(token)


def local_tz() -> timezone:
    minutes = _offset_minutes.get()
    return timezone(timedelta(minutes=DEFAULT_OFFSET_MINUTES if minutes is None else minutes))


def local_today() -> date:
    return datetime.now(local_tz()).date()


def local_day_start() -> datetime:
    """Midnight of the learner's today, as an aware datetime (compare it with timestamptz columns)."""
    return datetime.combine(local_today(), time.min, tzinfo=local_tz())


class UtcOffsetMiddleware:
    """Pure ASGI middleware: reads `X-UTC-Offset` for HTTP and WebSocket scopes."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] not in ("http", "websocket"):
            await self.app(scope, receive, send)
            return
        raw = None
        for name, value in scope.get("headers") or []:
            if name == b"x-utc-offset":
                raw = value.decode("latin-1")
                break
        token = set_utc_offset(raw)
        try:
            await self.app(scope, receive, send)
        finally:
            reset_utc_offset(token)
