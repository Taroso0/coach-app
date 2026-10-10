import datetime as dt
from typing import Annotated

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.training_session import TrainingSessionCreate, TrainingSessionRead, TrainingSessionUpdate
from app.services import training_sessions as service

router = APIRouter(prefix="/sessions", tags=["Занятия"])

DbSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[TrainingSessionRead], summary="Список занятий")
def list_sessions(
    db: DbSession,
    date_from: dt.date | None = None,
    date_to: dt.date | None = None,
    group: Annotated[str | None, Query(max_length=50)] = None,
):
    return service.list_sessions(db, date_from, date_to, group)


@router.get("/{session_id}", response_model=TrainingSessionRead, summary="Занятие по id")
def get_session(session_id: int, db: DbSession):
    return service.get_session(db, session_id)


@router.post("", response_model=TrainingSessionRead, status_code=status.HTTP_201_CREATED, summary="Добавить занятие")
def create_session(data: TrainingSessionCreate, db: DbSession):
    return service.create_session(db, data)


@router.patch("/{session_id}", response_model=TrainingSessionRead, summary="Изменить занятие")
def update_session(session_id: int, data: TrainingSessionUpdate, db: DbSession):
    return service.update_session(db, session_id, data)


@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Удалить занятие")
def delete_session(session_id: int, db: DbSession) -> Response:
    service.delete_session(db, session_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
