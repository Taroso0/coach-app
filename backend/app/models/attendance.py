from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.athlete import Athlete
    from app.models.training_session import TrainingSession


class Attendance(Base):
    __tablename__ = "attendance"
    __table_args__ = (UniqueConstraint("athlete_id", "session_id", name="uq_attendance_athlete_session"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    athlete_id: Mapped[int] = mapped_column(ForeignKey("athletes.id", ondelete="CASCADE"))
    session_id: Mapped[int] = mapped_column(ForeignKey("training_sessions.id", ondelete="CASCADE"), index=True)
    present: Mapped[bool] = mapped_column(default=False)

    athlete: Mapped[Athlete] = relationship(back_populates="attendance")
    session: Mapped[TrainingSession] = relationship(back_populates="attendance")
