export type SessionKind = 'strength' | 'cardio' | 'technique' | 'recovery'

export interface Session {
  id: number
  time: string
  title: string
  group: string
  kind: SessionKind
}

/** Тренировки недели по дням: 0 — понедельник, 6 — воскресенье. */
export type WeekPlan = Record<number, Session[]>

export const KIND_LABELS: Record<SessionKind, string> = {
  strength: 'Силовая',
  cardio: 'Кардио',
  technique: 'Техника',
  recovery: 'Восстановление',
}

export const KIND_COLORS: Record<SessionKind, string> = {
  strength: 'teal',
  cardio: 'blue',
  technique: 'grape',
  recovery: 'orange',
}

// Демонстрационные данные: ключ — смещение недели относительно текущей
const WEEK_PLANS: Record<number, WeekPlan> = {
  [-1]: {
    0: [{ id: 101, time: '18:00', title: 'Базовая силовая', group: 'Юниоры', kind: 'strength' }],
    2: [{ id: 102, time: '18:00', title: 'Техника рывка', group: 'Юниоры', kind: 'technique' }],
    4: [{ id: 103, time: '19:00', title: 'Интервальный бег', group: 'Основной состав', kind: 'cardio' }],
  },
  0: {
    0: [
      { id: 1, time: '17:00', title: 'Силовая: ноги', group: 'Юниоры', kind: 'strength' },
      { id: 2, time: '19:00', title: 'Силовая: ноги', group: 'Основной состав', kind: 'strength' },
    ],
    2: [
      { id: 3, time: '17:00', title: 'Техника толчка', group: 'Юниорки', kind: 'technique' },
      { id: 4, time: '19:00', title: 'Растяжка и ЛФК', group: 'Восстановление', kind: 'recovery' },
    ],
    4: [{ id: 5, time: '18:00', title: 'Кардио на выносливость', group: 'Все группы', kind: 'cardio' }],
    5: [{ id: 6, time: '11:00', title: 'Контрольная тренировка', group: 'Основной состав', kind: 'strength' }],
  },
  1: {
    0: [{ id: 201, time: '17:00', title: 'Силовая: спина', group: 'Юниоры', kind: 'strength' }],
    1: [{ id: 202, time: '19:00', title: 'Техника приседа', group: 'Основной состав', kind: 'technique' }],
    3: [{ id: 203, time: '18:00', title: 'Кардио восстановительное', group: 'Все группы', kind: 'cardio' }],
  },
}

export function getWeekPlan(offset: number): WeekPlan {
  return WEEK_PLANS[offset] ?? {}
}
