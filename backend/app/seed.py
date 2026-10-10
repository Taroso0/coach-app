import datetime as dt
import random

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.session import SessionLocal, engine
from app.models import Athlete, AthleteStatus, Attendance, Base, SessionKind, TrainingSession

ATHLETES = [
    ("Иван Смирнов", 17, "Юниоры", AthleteStatus.active, "+7 900 123-45-67", "Первый разряд к весне"),
    ("Алексей Кузнецов", 19, "Юниоры", AthleteStatus.injured, "+7 900 222-11-03", "Восстановление после травмы колена"),
    ("Мария Попова", 16, "Юниорки", AthleteStatus.active, "+7 900 555-84-21", "Отбор на областные соревнования"),
    ("Дмитрий Волков", 21, "Основной состав", AthleteStatus.active, "+7 900 447-30-12", "Удержать форму до чемпионата"),
    ("Анна Соколова", 18, "Юниорки", AthleteStatus.rest, "+7 900 318-76-40", "Возвращение к регулярным тренировкам"),
    ("Егор Лебедев", 22, "Основной состав", AthleteStatus.active, "+7 900 671-25-98", "Улучшить выносливость"),
    ("Ольга Новикова", 20, "Основной состав", AthleteStatus.injured, "+7 900 209-64-37", "Реабилитация спины"),
    ("Никита Морозов", 15, "Юниоры", AthleteStatus.active, "+7 900 843-59-16", "Освоить базовую технику"),
]

WEEKLY_TEMPLATE: dict[int, list[tuple[str, str, str, SessionKind]]] = {
    0: [
        ("17:00", "Силовая: ноги", "Юниоры", SessionKind.strength),
        ("19:00", "Силовая: ноги", "Основной состав", SessionKind.strength),
    ],
    2: [
        ("17:00", "Техника толчка", "Юниорки", SessionKind.technique),
        ("19:00", "Растяжка и ЛФК", "Основной состав", SessionKind.recovery),
    ],
    4: [
        ("17:00", "Кардио на выносливость", "Юниоры", SessionKind.cardio),
        ("18:00", "Кардио на выносливость", "Юниорки", SessionKind.cardio),
    ],
    5: [("11:00", "Контрольная тренировка", "Основной состав", SessionKind.strength)],
}

PRESENCE_CHANCE = {AthleteStatus.active: 0.9, AthleteStatus.rest: 0.5, AthleteStatus.injured: 0.2}


def build_sessions(monday: dt.date, weeks: int) -> list[TrainingSession]:
    sessions = []
    for day in range(weeks * 7):
        date = monday + dt.timedelta(days=day)
        for time, title, group, kind in WEEKLY_TEMPLATE.get(date.weekday(), []):
            sessions.append(
                TrainingSession(date=date, time=dt.time.fromisoformat(time), title=title, group=group, kind=kind)
            )
    return sessions


def seed(db: Session, today: dt.date) -> None:
    rng = random.Random(42)
    athletes = [
        Athlete(name=name, age=age, group=group, status=status, phone=phone, goal=goal)
        for name, age, group, status, phone, goal in ATHLETES
    ]
    current_monday = today - dt.timedelta(days=today.weekday())
    sessions = build_sessions(current_monday - dt.timedelta(weeks=3), weeks=5)
    db.add_all(athletes + sessions)
    db.flush()

    for training_session in sessions:
        if training_session.date >= today:
            continue
        for athlete in athletes:
            if athlete.group == training_session.group:
                present = rng.random() < PRESENCE_CHANCE[athlete.status]
                db.add(Attendance(athlete_id=athlete.id, session_id=training_session.id, present=present))
    db.commit()


def main() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.scalar(select(func.count()).select_from(Athlete)):
            print("В базе уже есть спортсмены — начальные данные не добавлены.")
            return
        seed(db, dt.date.today())
        counts = {
            "спортсменов": db.scalar(select(func.count()).select_from(Athlete)),
            "занятий": db.scalar(select(func.count()).select_from(TrainingSession)),
            "отметок посещений": db.scalar(select(func.count()).select_from(Attendance)),
        }
    print("Добавлено: " + ", ".join(f"{count} {name}" for name, count in counts.items()) + ".")


if __name__ == "__main__":
    main()
