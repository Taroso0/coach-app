export type AthleteStatus = 'active' | 'injured' | 'rest'

export type InjuryStatus = 'healing' | 'closed'

export interface Injury {
  id: number
  date: string
  title: string
  status: InjuryStatus
  note: string
}

export interface NutritionNote {
  id: number
  date: string
  calories: number
  protein: number
  comment: string
}

export interface AttendanceRecord {
  date: string
  session: string
  present: boolean
}

export interface Athlete {
  id: number
  name: string
  age: number
  group: string
  status: AthleteStatus
  /** Посещаемость за последний месяц, % */
  attendance: number
  phone: string
  goal: string
  injuries: Injury[]
  nutrition: NutritionNote[]
  history: AttendanceRecord[]
}

// Подписи и цвета вынесены в словари: в данных хранится 'injured', а пользователь
// видит «Травма». Record по union-типу не даст забыть новый статус
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

export const INJURY_STATUS_LABELS: Record<InjuryStatus, string> = {
  healing: 'Восстановление',
  closed: 'Закрыта',
}

export const INJURY_STATUS_COLORS: Record<InjuryStatus, string> = {
  healing: 'orange',
  closed: 'gray',
}

// Демонстрационные данные — на этапе ЛР5 будут заменены данными из API
export const ATHLETES: Athlete[] = [
  {
    id: 1,
    name: 'Иван Смирнов',
    age: 17,
    group: 'Юниоры',
    status: 'active',
    attendance: 92,
    phone: '+7 900 123-45-67',
    goal: 'Первый разряд к весне',
    injuries: [
      {
        id: 1,
        date: '2026-05-12',
        title: 'Растяжение голеностопа',
        status: 'closed',
        note: 'Пропустил две недели, вернулся без ограничений.',
      },
    ],
    nutrition: [
      { id: 1, date: '2026-09-18', calories: 3100, protein: 145, comment: 'Набор массы' },
      { id: 2, date: '2026-09-11', calories: 3050, protein: 140, comment: 'Без изменений' },
    ],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: true },
      { date: '2026-09-17', session: 'Техника', present: true },
      { date: '2026-09-15', session: 'Кардио', present: false },
    ],
  },
  {
    id: 2,
    name: 'Алексей Кузнецов',
    age: 19,
    group: 'Юниоры',
    status: 'injured',
    attendance: 64,
    phone: '+7 900 222-11-03',
    goal: 'Восстановление после травмы колена',
    injuries: [
      {
        id: 2,
        date: '2026-09-02',
        title: 'Воспаление связки колена',
        status: 'healing',
        note: 'Только восстановительные тренировки, нагрузку не давать до октября.',
      },
      {
        id: 3,
        date: '2026-03-20',
        title: 'Ушиб плеча',
        status: 'closed',
        note: 'Восстановился за неделю.',
      },
    ],
    nutrition: [
      { id: 3, date: '2026-09-16', calories: 2600, protein: 130, comment: 'Снижение калорий на время травмы' },
    ],
    history: [
      { date: '2026-09-19', session: 'Восстановление', present: true },
      { date: '2026-09-17', session: 'Техника', present: false },
      { date: '2026-09-15', session: 'Кардио', present: false },
    ],
  },
  {
    id: 3,
    name: 'Мария Попова',
    age: 16,
    group: 'Юниорки',
    status: 'active',
    attendance: 88,
    phone: '+7 900 555-84-21',
    goal: 'Отбор на областные соревнования',
    injuries: [],
    nutrition: [
      { id: 4, date: '2026-09-18', calories: 2400, protein: 110, comment: 'Поддержание веса' },
    ],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: true },
      { date: '2026-09-17', session: 'Техника', present: true },
      { date: '2026-09-15', session: 'Кардио', present: true },
    ],
  },
  {
    id: 4,
    name: 'Дмитрий Волков',
    age: 21,
    group: 'Основной состав',
    status: 'active',
    attendance: 95,
    phone: '+7 900 447-30-12',
    goal: 'Удержать форму до чемпионата',
    injuries: [],
    nutrition: [
      { id: 5, date: '2026-09-18', calories: 3400, protein: 165, comment: 'Соревновательный период' },
      { id: 6, date: '2026-09-04', calories: 3300, protein: 160, comment: 'Плановый пересчёт' },
    ],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: true },
      { date: '2026-09-17', session: 'Техника', present: true },
      { date: '2026-09-15', session: 'Кардио', present: true },
    ],
  },
  {
    id: 5,
    name: 'Анна Соколова',
    age: 18,
    group: 'Юниорки',
    status: 'rest',
    attendance: 71,
    phone: '+7 900 318-76-40',
    goal: 'Возвращение к регулярным тренировкам',
    injuries: [],
    nutrition: [],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: false },
      { date: '2026-09-17', session: 'Техника', present: true },
    ],
  },
  {
    id: 6,
    name: 'Егор Лебедев',
    age: 22,
    group: 'Основной состав',
    status: 'active',
    attendance: 83,
    phone: '+7 900 671-25-98',
    goal: 'Улучшить выносливость',
    injuries: [],
    nutrition: [
      { id: 7, date: '2026-09-12', calories: 3200, protein: 150, comment: 'Акцент на углеводы' },
    ],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: true },
      { date: '2026-09-17', session: 'Техника', present: false },
      { date: '2026-09-15', session: 'Кардио', present: true },
    ],
  },
  {
    id: 7,
    name: 'Ольга Новикова',
    age: 20,
    group: 'Основной состав',
    status: 'injured',
    attendance: 58,
    phone: '+7 900 209-64-37',
    goal: 'Реабилитация спины',
    injuries: [
      {
        id: 4,
        date: '2026-08-25',
        title: 'Перегрузка поясницы',
        status: 'healing',
        note: 'Исключить становую тягу, добавить работу с тренером ЛФК.',
      },
    ],
    nutrition: [],
    history: [
      { date: '2026-09-19', session: 'Восстановление', present: true },
      { date: '2026-09-15', session: 'Кардио', present: false },
    ],
  },
  {
    id: 8,
    name: 'Никита Морозов',
    age: 15,
    group: 'Юниоры',
    status: 'active',
    attendance: 90,
    phone: '+7 900 843-59-16',
    goal: 'Освоить базовую технику',
    injuries: [],
    nutrition: [
      { id: 8, date: '2026-09-18', calories: 2700, protein: 120, comment: 'Рост, питание по возрасту' },
    ],
    history: [
      { date: '2026-09-19', session: 'Силовая', present: true },
      { date: '2026-09-17', session: 'Техника', present: true },
      { date: '2026-09-15', session: 'Кардио', present: true },
    ],
  },
]

export function findAthlete(id: string | undefined): Athlete | undefined {
  return ATHLETES.find((athlete) => String(athlete.id) === id)
}
