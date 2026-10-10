from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import Attendance
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate
from app.services.athletes import get_athlete
from app.services.errors import BusinessRuleError, ConflictError, NotFoundError
from app.services.training_sessions import get_session


def list_attendance(
    db: Session,
    session_id: int | None = None,
    athlete_id: int | None = None,
) -> Sequence[Attendance]:
    query = select(Attendance).order_by(Attendance.session_id, Attendance.athlete_id)
    if session_id is not None:
        query = query.where(Attendance.session_id == session_id)
    if athlete_id is not None:
        query = query.where(Attendance.athlete_id == athlete_id)
    return db.scalars(query).all()


def get_attendance(db: Session, attendance_id: int) -> Attendance:
    attendance = db.get(Attendance, attendance_id)
    if attendance is None:
        raise NotFoundError("Отметка посещения не найдена")
    return attendance


def create_attendance(db: Session, data: AttendanceCreate) -> Attendance:
    athlete = get_athlete(db, data.athlete_id)
    training_session = get_session(db, data.session_id)
    if athlete.group != training_session.group:
        raise BusinessRuleError("Спортсмен не состоит в группе этого занятия")

    attendance = Attendance(**data.model_dump())
    db.add(attendance)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise ConflictError("Посещение этого спортсмена на занятии уже отмечено") from None
    db.refresh(attendance)
    return attendance


def update_attendance(db: Session, attendance_id: int, data: AttendanceUpdate) -> Attendance:
    attendance = get_attendance(db, attendance_id)
    attendance.present = data.present
    db.commit()
    db.refresh(attendance)
    return attendance


def delete_attendance(db: Session, attendance_id: int) -> None:
    db.delete(get_attendance(db, attendance_id))
    db.commit()
