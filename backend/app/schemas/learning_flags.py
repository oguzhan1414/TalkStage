from pydantic import BaseModel


class LearningFlagCreate(BaseModel):
    flag_key: str
