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

/** Дата в виде «2026-09-14» — ключ для хранения занятий и отметок. */
export function toISO(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Месяц и год в виде «сентябрь 2026». */
export function formatMonth(date: Date): string {
  return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
}

/** Первое число месяца, к которому относится дата. */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/** Первое число месяца, сдвинутого на `months` от переданного. */
export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

/**
 * Дни месяца, разложенные по неделям Пн–Вс.
 * Ячейки до первого и после последнего числа заполняются null.
 */
export function monthGrid(month: Date): (Date | null)[][] {
  const first = startOfMonth(month)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7

  const cells: (Date | null)[] = Array.from({ length: lead }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day))
  }
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}
