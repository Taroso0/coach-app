const DAY_MS = 24 * 60 * 60 * 1000

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

/** Понедельник недели, в которую попадает переданная дата. */
export function mondayOf(date: Date): Date {
  const result = new Date(date)
  // getDay(): 0 — воскресенье, поэтому воскресенье сдвигаем на 6 дней назад
  const shift = (result.getDay() + 6) % 7
  result.setHours(0, 0, 0, 0)
  result.setDate(result.getDate() - shift)
  return result
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS)
}

/** Дата в виде «14.09». */
export function formatShort(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
}

/** Дата в виде «14 сентября 2026». */
export function formatFull(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return value.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Диапазон недели в виде «14.09 — 20.09». */
export function formatWeekRange(monday: Date): string {
  return `${formatShort(monday)} — ${formatShort(addDays(monday, 6))}`
}
