from typing import Annotated

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.athlete import AthleteCreate, AthleteRead, AthleteUpdate
from app.services import athletes as service

router = APIRouter(prefix="/athletes", tags=["Спортсмены"])

DbSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[AthleteRead], summary="Список спортсменов")
def list_athletes(db: DbSession, group: Annotated[str | None, Query(max_length=50)] = None):
    return service.list_athletes(db, group)


@router.get("/{athlete_id}", response_model=AthleteRead, summary="Спортсмен по id")
def get_athlete(athlete_id: int, db: DbSession):
    return service.get_athlete(db, athlete_id)


@router.post("", response_model=AthleteRead, status_code=status.HTTP_201_CREATED, summary="Добавить спортсмена")
def create_athlete(data: AthleteCreate, db: DbSession):
    return service.create_athlete(db, data)


@router.patch("/{athlete_id}", response_model=AthleteRead, summary="Изменить спортсмена")
def update_athlete(athlete_id: int, data: AthleteUpdate, db: DbSession):
    return service.update_athlete(db, athlete_id, data)


@router.delete("/{athlete_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Удалить спортсмена")
def delete_athlete(athlete_id: int, db: DbSession) -> Response:
    service.delete_athlete(db, athlete_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
