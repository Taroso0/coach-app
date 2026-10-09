from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["Служебное"])


@router.get("")
def health() -> dict[str, str]:
    """Проверка, что сервер запущен и отвечает."""
    return {"status": "ok"}
