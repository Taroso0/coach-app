import { ATHLETES, type Athlete } from '../../entities/athlete/model'
import type { CalendarSession } from '../../entities/session/model'

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
