import { useEffect, useState } from 'react'

interface AsyncResult<T> {
  load: () => Promise<T>
  attempt: number
  data: T | undefined
  error: string | null
}

/**
 * Загрузка данных с тремя состояниями: идёт загрузка, ошибка, данные получены.
 * load должна быть стабильной (функция модуля или useCallback): новая load — новый запрос.
 * reload повторяет запрос — для кнопки «Повторить» и после изменения данных.
 */
export function useAsync<T>(load: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<AsyncResult<T> | null>(null)

  useEffect(() => {
    // Ответ на устаревший запрос (например, после перехода на другого спортсмена)
    // не должен перезаписать ответ на актуальный
    let cancelled = false
    load().then(
      (data) => {
        if (!cancelled) setResult({ load, attempt, data, error: null })
      },
      () => {
        if (!cancelled) setResult({ load, attempt, data: undefined, error: 'Не удалось загрузить данные' })
      },
    )
    return () => {
      cancelled = true
    }
  }, [load, attempt])

  // Загрузка не хранится отдельным флагом: если последний результат относится
  // к другому запросу, значит, ответ на актуальный ещё не пришёл
  const loading = result === null || result.load !== load || result.attempt !== attempt

  return {
    data: loading ? undefined : result.data,
    loading,
    error: loading ? null : result.error,
    reload: () => setAttempt((n) => n + 1),
  }
}
