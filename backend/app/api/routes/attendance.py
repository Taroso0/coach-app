from typing import Annotated

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.attendance import AttendanceCreate, AttendanceRead, AttendanceUpdate
from app.services import attendance as service

router = APIRouter(prefix="/attendance", tags=["Посещения"])

DbSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[AttendanceRead], summary="Список отметок посещений")
def list_attendance(
    db: DbSession,
    session_id: Annotated[int | None, Query(gt=0)] = None,
    athlete_id: Annotated[int | None, Query(gt=0)] = None,
):
    return service.list_attendance(db, session_id, athlete_id)


@router.get("/{attendance_id}", response_model=AttendanceRead, summary="Отметка посещения по id")
def get_attendance(attendance_id: int, db: DbSession):
    return service.get_attendance(db, attendance_id)


@router.post("", response_model=AttendanceRead, status_code=status.HTTP_201_CREATED, summary="Отметить посещение")
def create_attendance(data: AttendanceCreate, db: DbSession):
    return service.create_attendance(db, data)


@router.patch("/{attendance_id}", response_model=AttendanceRead, summary="Изменить отметку посещения")
def update_attendance(attendance_id: int, data: AttendanceUpdate, db: DbSession):
    return service.update_attendance(db, attendance_id, data)


@router.delete("/{attendance_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Удалить отметку посещения")
def delete_attendance(attendance_id: int, db: DbSession) -> Response:
    service.delete_attendance(db, attendance_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
