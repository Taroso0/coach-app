from pydantic import BaseModel, ConfigDict, Field


class AttendanceCreate(BaseModel):
    athlete_id: int = Field(gt=0)
    session_id: int = Field(gt=0)
    present: bool = True


class AttendanceUpdate(BaseModel):
    present: bool


class AttendanceRead(AttendanceCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
