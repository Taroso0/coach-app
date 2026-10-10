from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.errors import register_error_handlers
from app.api.routes import athletes, attendance, health, training_sessions
from app.core.config import get_settings
from app.db.session import engine
from app.models import Base

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title=settings.app_name, debug=settings.debug, lifespan=lifespan)

register_error_handlers(app)

app.include_router(health.router)
app.include_router(athletes.router)
app.include_router(training_sessions.router)
app.include_router(attendance.router)
