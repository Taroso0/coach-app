export type AthleteStatus = 'active' | 'injured' | 'rest'

export interface Athlete {
  id: number
  name: string
  age: number
  group: string
  status: AthleteStatus
  /** Посещаемость за последний месяц, % */
  attendance: number
}

export const STATUS_LABELS: Record<AthleteStatus, string> = {
  active: 'В строю',
  injured: 'Травма',
  rest: 'Отдых',
}

export const STATUS_COLORS: Record<AthleteStatus, string> = {
  active: 'teal',
  injured: 'red',
  rest: 'gray',
}

// Демонстрационные данные — на этапе ЛР5 будут заменены данными из API
export const ATHLETES: Athlete[] = [
  { id: 1, name: 'Иван Смирнов', age: 17, group: 'Юниоры', status: 'active', attendance: 92 },
  { id: 2, name: 'Алексей Кузнецов', age: 19, group: 'Юниоры', status: 'injured', attendance: 64 },
  { id: 3, name: 'Мария Попова', age: 16, group: 'Юниорки', status: 'active', attendance: 88 },
  { id: 4, name: 'Дмитрий Волков', age: 21, group: 'Основной состав', status: 'active', attendance: 95 },
  { id: 5, name: 'Анна Соколова', age: 18, group: 'Юниорки', status: 'rest', attendance: 71 },
  { id: 6, name: 'Егор Лебедев', age: 22, group: 'Основной состав', status: 'active', attendance: 83 },
  { id: 7, name: 'Ольга Новикова', age: 20, group: 'Основной состав', status: 'injured', attendance: 58 },
  { id: 8, name: 'Никита Морозов', age: 15, group: 'Юниоры', status: 'active', attendance: 90 },
]
