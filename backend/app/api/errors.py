from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.services.errors import BusinessRuleError, ConflictError, NotFoundError, ServiceError

STATUS_BY_ERROR: dict[type[ServiceError], int] = {
    NotFoundError: status.HTTP_404_NOT_FOUND,
    ConflictError: status.HTTP_409_CONFLICT,
    BusinessRuleError: status.HTTP_400_BAD_REQUEST,
}

VALIDATION_MESSAGES: dict[str, str] = {
    "missing": "Обязательное поле",
    "string_type": "Должно быть строкой",
    "string_too_short": "Минимальная длина — {min_length} симв.",
    "string_too_long": "Максимальная длина — {max_length} симв.",
    "int_type": "Должно быть целым числом",
    "int_parsing": "Должно быть целым числом",
    "int_from_float": "Должно быть целым числом",
    "greater_than": "Должно быть больше {gt}",
    "greater_than_equal": "Должно быть не меньше {ge}",
    "less_than": "Должно быть меньше {lt}",
    "less_than_equal": "Должно быть не больше {le}",
    "bool_type": "Должно быть true или false",
    "bool_parsing": "Должно быть true или false",
    "enum": "Допустимые значения: {expected}",
    "date_type": "Должно быть датой в формате ГГГГ-ММ-ДД",
    "date_parsing": "Должно быть датой в формате ГГГГ-ММ-ДД",
    "date_from_datetime_parsing": "Должно быть датой в формате ГГГГ-ММ-ДД",
    "date_from_datetime_inexact": "Должно быть датой без времени",
    "time_type": "Должно быть временем в формате ЧЧ:ММ",
    "time_parsing": "Должно быть временем в формате ЧЧ:ММ",
    "json_invalid": "Некорректный JSON",
    "model_attributes_type": "Ожидается объект",
    "dict_type": "Ожидается объект",
}

LOCATION_NAMES: dict[str, str] = {"body": "тело запроса", "path": "путь", "query": "параметр запроса"}


def translate_error(error: dict[str, Any]) -> dict[str, Any]:
    template = VALIDATION_MESSAGES.get(error["type"], "Некорректное значение")
    context = {key: str(value).replace(" or ", ", ") for key, value in error.get("ctx", {}).items()}
    try:
        message = template.format(**context)
    except (KeyError, IndexError):
        message = "Некорректное значение"
    location = [str(part) for part in error["loc"]]
    field_path = location[1:] if error["type"] != "json_invalid" else []
    field = ".".join(field_path) or LOCATION_NAMES.get(location[0], location[0])
    return {"field": field, "message": message, "type": error["type"], "loc": error["loc"]}


async def validation_error_handler(_: Request, exc: Exception) -> JSONResponse:
    assert isinstance(exc, RequestValidationError)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content=jsonable_encoder({"detail": [translate_error(error) for error in exc.errors()]}),
    )


async def service_error_handler(_: Request, exc: Exception) -> JSONResponse:
    assert isinstance(exc, ServiceError)
    return JSONResponse(status_code=STATUS_BY_ERROR[type(exc)], content={"detail": exc.message})


def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(RequestValidationError, validation_error_handler)
    for error_type in STATUS_BY_ERROR:
        app.add_exception_handler(error_type, service_error_handler)
