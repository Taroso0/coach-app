import datetime as dt
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import TrainingSession
from app.schemas.training_session import TrainingSessionCreate, TrainingSessionUpdate
from app.services.errors import BusinessRuleError, NotFoundError


def list_sessions(
    db: Session,
    date_from: dt.date | None = None,
    date_to: dt.date | None = None,
    group: str | None = None,
) -> Sequence[TrainingSession]:
    if date_from is not None and date_to is not None and date_from > date_to:
        raise BusinessRuleError("Дата начала периода позже даты окончания")
    query = select(TrainingSession).order_by(TrainingSession.date, TrainingSession.time)
    if date_from is not None:
        query = query.where(TrainingSession.date >= date_from)
    if date_to is not None:
        query = query.where(TrainingSession.date <= date_to)
    if group is not None:
        query = query.where(TrainingSession.group == group)
    return db.scalars(query).all()


def get_session(db: Session, session_id: int) -> TrainingSession:
    training_session = db.get(TrainingSession, session_id)
    if training_session is None:
        raise NotFoundError("Занятие не найдено")
    return training_session


def create_session(db: Session, data: TrainingSessionCreate) -> TrainingSession:
    training_session = TrainingSession(**data.model_dump())
    db.add(training_session)
    db.commit()
    db.refresh(training_session)
    return training_session


def update_session(db: Session, session_id: int, data: TrainingSessionUpdate) -> TrainingSession:
    training_session = get_session(db, session_id)
    for field, value in data.model_dump(exclude_unset=True, exclude_none=True).items():
        setattr(training_session, field, value)
    db.commit()
    db.refresh(training_session)
    return training_session


def delete_session(db: Session, session_id: int) -> None:
    db.delete(get_session(db, session_id))
    db.commit()
