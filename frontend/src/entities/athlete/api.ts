import { ATHLETES, type Athlete, findAthlete } from './model'

export type NewAthlete = Pick<Athlete, 'name' | 'age' | 'group' | 'status' | 'phone' | 'goal'>

// Заглушка API до ЛР5: те же асинхронные функции потом будут ходить в backend,
// а задержка нужна, чтобы экраны уже сейчас показывали состояние загрузки
const DELAY_MS = 400

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY_MS))
}

export function fetchAthletes(): Promise<Athlete[]> {
  return delay([...ATHLETES])
}

export function fetchAthlete(id: string | undefined): Promise<Athlete | undefined> {
  return delay(findAthlete(id))
}

/** Добавленный спортсмен живёт до перезагрузки страницы, как и отметки посещений. */
export function createAthlete(data: NewAthlete): Promise<Athlete> {
  const athlete: Athlete = {
    ...data,
    id: Math.max(0, ...ATHLETES.map((a) => a.id)) + 1,
    attendance: 0,
    injuries: [],
    nutrition: [],
    history: [],
  }
  ATHLETES.push(athlete)
  return delay(athlete)
}
