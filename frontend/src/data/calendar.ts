import { ATHLETES, type Athlete } from './athletes'
import type { SessionKind } from './plans'
import { toISO } from '../lib/date'

export interface CalendarSession {
  /** Ключ вида «2026-09-14-0»: дата плюс номер занятия в этот день. */
  id: string
  date: string
  time: string
  title: string
  group: string
  kind: SessionKind
}

type SessionTemplate = Omit<CalendarSession, 'id' | 'date'>

/** Расписание повторяется каждую неделю: 0 — понедельник, 6 — воскресенье. */
const WEEKLY_TEMPLATE: Record<number, SessionTemplate[]> = {
  0: [
    { time: '17:00', title: 'Силовая: ноги', group: 'Юниоры', kind: 'strength' },
    { time: '19:00', title: 'Силовая: ноги', group: 'Основной состав', kind: 'strength' },
  ],
  2: [
    { time: '17:00', title: 'Техника толчка', group: 'Юниорки', kind: 'technique' },
    { time: '19:00', title: 'Растяжка и ЛФК', group: 'Восстановление', kind: 'recovery' },
  ],
  4: [{ time: '18:00', title: 'Кардио на выносливость', group: 'Все группы', kind: 'cardio' }],
  5: [{ time: '11:00', title: 'Контрольная тренировка', group: 'Основной состав', kind: 'strength' }],
}

/** Занятия одного дня, собранные по недельному расписанию. */
export function sessionsOf(date: Date): CalendarSession[] {
  const weekday = (date.getDay() + 6) % 7
  const iso = toISO(date)

  return (WEEKLY_TEMPLATE[weekday] ?? []).map((template, index) => ({
    ...template,
    id: `${iso}-${index}`,
    date: iso,
  }))
}

/** Спортсмены, которых ждут на занятии: по группе, а на ЛФК — все с травмой. */
export function sessionAthletes(session: CalendarSession): Athlete[] {
  if (session.group === 'Все группы') return ATHLETES
  if (session.group === 'Восстановление') {
    return ATHLETES.filter((athlete) => athlete.status === 'injured')
  }
  return ATHLETES.filter((athlete) => athlete.group === session.group)
}

/**
 * Предзаполненная отметка для демонстрации: большинство присутствовало.
 * Считается по номеру спортсмена и дню, поэтому не меняется между отрисовками.
 */
function defaultPresence(athleteId: number, date: string): boolean {
  const day = Number(date.slice(-2))
  return (athleteId * 3 + day) % 7 !== 0
}

export type Presence = Record<number, boolean>

export function defaultPresenceOf(session: CalendarSession): Presence {
  const presence: Presence = {}
  for (const athlete of sessionAthletes(session)) {
    presence[athlete.id] = defaultPresence(athlete.id, session.date)
  }
  return presence
}

export function presentCount(presence: Presence): number {
  return Object.values(presence).filter(Boolean).length
}
