from pydantic import BaseModel, ConfigDict, Field

from app.models import AthleteStatus


class AthleteBase(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=100, examples=["Иван Петров"])
    age: int = Field(ge=5, le=100, examples=[17])
    group: str = Field(min_length=1, max_length=50, examples=["Юниоры"])
    status: AthleteStatus = AthleteStatus.active
    phone: str = Field(default="", max_length=20, examples=["+7 900 123-45-67"])
    goal: str = Field(default="", max_length=255, examples=["Выполнить КМС"])


class AthleteCreate(AthleteBase):
    pass


class AthleteUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str | None = Field(default=None, min_length=1, max_length=100)
    age: int | None = Field(default=None, ge=5, le=100)
    group: str | None = Field(default=None, min_length=1, max_length=50)
    status: AthleteStatus | None = None
    phone: str | None = Field(default=None, max_length=20)
    goal: str | None = Field(default=None, max_length=255)


class AthleteRead(AthleteBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    attendance_rate: float | None = Field(
        default=None,
        description="Доля занятий, на которых спортсмен присутствовал, в процентах; null — отметок ещё нет",
        examples=[87.5],
    )
