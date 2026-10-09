from __future__ import annotations

import enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.attendance import Attendance


class AthleteStatus(str, enum.Enum):
    active = "active"
    injured = "injured"
    rest = "rest"


class Athlete(Base):
    __tablename__ = "athletes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    age: Mapped[int]
    group: Mapped[str] = mapped_column(String(50), index=True)
    status: Mapped[AthleteStatus] = mapped_column(
        Enum(AthleteStatus, native_enum=False, create_constraint=True, length=20),
        default=AthleteStatus.active,
    )
    phone: Mapped[str] = mapped_column(String(20), default="")
    goal: Mapped[str] = mapped_column(String(255), default="")

    attendance: Mapped[list[Attendance]] = relationship(
        back_populates="athlete",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
