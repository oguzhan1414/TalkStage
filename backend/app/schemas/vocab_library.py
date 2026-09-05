from pydantic import BaseModel


class VocabLibraryProgressCreate(BaseModel):
    word_id: str
