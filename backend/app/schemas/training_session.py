import datetime as dt

from pydantic import BaseModel, ConfigDict, Field

from app.models import SessionKind


class TrainingSessionBase(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    date: dt.date = Field(examples=["2026-10-12"])
    time: dt.time = Field(examples=["17:00"])
    title: str = Field(min_length=1, max_length=100, examples=["Силовая: ноги"])
    group: str = Field(min_length=1, max_length=50, examples=["Юниоры"])
    kind: SessionKind


class TrainingSessionCreate(TrainingSessionBase):
    pass


class TrainingSessionUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    date: dt.date | None = None
    time: dt.time | None = None
    title: str | None = Field(default=None, min_length=1, max_length=100)
    group: str | None = Field(default=None, min_length=1, max_length=50)
    kind: SessionKind | None = None


class TrainingSessionRead(TrainingSessionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
