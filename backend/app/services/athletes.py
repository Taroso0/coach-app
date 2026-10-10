from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Athlete
from app.schemas.athlete import AthleteCreate, AthleteUpdate
from app.services.errors import NotFoundError


def list_athletes(db: Session, group: str | None = None) -> Sequence[Athlete]:
    query = select(Athlete).order_by(Athlete.name)
    if group is not None:
        query = query.where(Athlete.group == group)
    return db.scalars(query).all()


def get_athlete(db: Session, athlete_id: int) -> Athlete:
    athlete = db.get(Athlete, athlete_id)
    if athlete is None:
        raise NotFoundError("Спортсмен не найден")
    return athlete


def create_athlete(db: Session, data: AthleteCreate) -> Athlete:
    athlete = Athlete(**data.model_dump())
    db.add(athlete)
    db.commit()
    db.refresh(athlete)
    return athlete


def update_athlete(db: Session, athlete_id: int, data: AthleteUpdate) -> Athlete:
    athlete = get_athlete(db, athlete_id)
    for field, value in data.model_dump(exclude_unset=True, exclude_none=True).items():
        setattr(athlete, field, value)
    db.commit()
    db.refresh(athlete)
    return athlete


def delete_athlete(db: Session, athlete_id: int) -> None:
    db.delete(get_athlete(db, athlete_id))
    db.commit()
