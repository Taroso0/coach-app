from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.services.errors import BusinessRuleError, ConflictError, NotFoundError, ServiceError

STATUS_BY_ERROR: dict[type[ServiceError], int] = {
    NotFoundError: status.HTTP_404_NOT_FOUND,
    ConflictError: status.HTTP_409_CONFLICT,
    BusinessRuleError: status.HTTP_400_BAD_REQUEST,
}


async def service_error_handler(_: Request, exc: Exception) -> JSONResponse:
    assert isinstance(exc, ServiceError)
    return JSONResponse(status_code=STATUS_BY_ERROR[type(exc)], content={"detail": exc.message})


def register_error_handlers(app: FastAPI) -> None:
    for error_type in STATUS_BY_ERROR:
        app.add_exception_handler(error_type, service_error_handler)
