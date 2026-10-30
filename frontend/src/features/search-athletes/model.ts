import type { Athlete } from '../../entities/athlete/model'

export function filterAthletes(athletes: Athlete[], query: string): Athlete[] {
  const needle = query.trim().toLowerCase()
  return athletes.filter((athlete) => athlete.name.toLowerCase().includes(needle))
}
