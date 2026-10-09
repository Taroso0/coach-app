from __future__ import annotations

import datetime as dt
import enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.attendance import Attendance


class SessionKind(str, enum.Enum):
    strength = "strength"
    cardio = "cardio"
    technique = "technique"
    recovery = "recovery"


class TrainingSession(Base):
    __tablename__ = "training_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[dt.date] = mapped_column(index=True)
    time: Mapped[dt.time]
    title: Mapped[str] = mapped_column(String(100))
    group: Mapped[str] = mapped_column(String(50), index=True)
    kind: Mapped[SessionKind] = mapped_column(Enum(SessionKind, native_enum=False, create_constraint=True, length=20))

    attendance: Mapped[list[Attendance]] = relationship(
        back_populates="session",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
