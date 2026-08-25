from pydantic import BaseModel


class ProgressOut(BaseModel):
    id: str
    practice_date: str
    minutes_practiced: int
    scenarios_completed: int
