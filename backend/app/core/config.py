from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/app/core/config.py -> backend/. Путь к .env не зависит от папки,
# из которой запущен uvicorn.
BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    """Настройки приложения из переменных окружения и файла backend/.env."""

    model_config = SettingsConfigDict(env_file=BACKEND_DIR / ".env", env_file_encoding="utf-8")

    app_name: str = "Coach App API"
    debug: bool = False
    # Без значения по умолчанию: если строки подключения нет, приложение
    # упадёт при старте с понятной ошибкой, а не при первом запросе к БД.
    database_url: str


@lru_cache
def get_settings() -> Settings:
    # .env читается один раз, дальше возвращается тот же объект.
    return Settings()
