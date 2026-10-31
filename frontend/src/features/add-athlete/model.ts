import type { NewAthlete } from '../../entities/athlete/api'

export const GROUPS = ['Юниоры', 'Юниорки', 'Основной состав']

export const EMPTY_ATHLETE: NewAthlete = {
  name: '',
  age: 16,
  group: '',
  status: 'active',
  phone: '',
  goal: '',
}

// Ограничения повторяют схему AthleteCreate в backend: ошибку видно сразу
// у поля, а не после ответа 422 от сервера
export function validateAthlete(values: NewAthlete): Partial<Record<keyof NewAthlete, string>> {
  const errors: Partial<Record<keyof NewAthlete, string>> = {}
  const name = values.name.trim()

  if (!name) errors.name = 'Введите имя'
  else if (name.length > 100) errors.name = 'Не длиннее 100 символов'

  if (!Number.isInteger(values.age)) errors.age = 'Введите возраст целым числом'
  else if (values.age < 5 || values.age > 100) errors.age = 'Возраст — от 5 до 100 лет'

  if (!values.group) errors.group = 'Выберите группу'

  if (values.phone && !/^\+?[\d\s()-]{5,20}$/.test(values.phone.trim())) {
    errors.phone = 'Телефон — цифры, пробелы, скобки и дефисы, до 20 символов'
  }

  if (values.goal.length > 255) errors.goal = 'Не длиннее 255 символов'

  return errors
}
