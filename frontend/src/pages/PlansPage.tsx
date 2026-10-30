import { Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import SessionKindBadge from '../entities/session/SessionKindBadge'
import { getWeekPlan } from '../entities/session/model'
import { WEEKDAYS, addDays, formatShort, formatWeekRange, mondayOf } from '../shared/lib/date'
import EmptyState from '../shared/ui/EmptyState'
import PeriodSwitcher from '../shared/ui/PeriodSwitcher'

export default function PlansPage() {
  // Всё состояние экрана — смещение недели относительно текущей.
  // Понедельник и содержимое плана из него вычисляются
  const [offset, setOffset] = useState(0)

  const monday = addDays(mondayOf(new Date()), offset * 7)
  const plan = getWeekPlan(offset)
  const total = Object.values(plan).reduce((sum, sessions) => sum + sessions.length, 0)

  return (
    <>
      <Group justify="space-between" align="center" mb="md" wrap="wrap">
        <Title order={2}>Планы тренировок</Title>
        <PeriodSwitcher
          label={formatWeekRange(monday)}
          labelWidth={130}
          prevLabel="Предыдущая неделя"
          nextLabel="Следующая неделя"
          onPrev={() => setOffset(offset - 1)}
          onNext={() => setOffset(offset + 1)}
        >
          {/* Сравнение явное: offset && ... отрисовало бы на экране цифру 0 */}
          {offset !== 0 && (
            <Button variant="subtle" size="compact-sm" onClick={() => setOffset(0)}>
              Текущая неделя
            </Button>
          )}
        </PeriodSwitcher>
      </Group>

      <Text c="dimmed" size="sm" mb="md">
        Тренировок на неделе: {total}
      </Text>

      {total === 0 ? (
        <EmptyState text="На эту неделю тренировок не запланировано" hint="Выберите другую неделю" />
      ) : (
        <Stack gap="sm">
          {/* Рисуем все семь дней, включая пустые: тренер должен видеть
              структуру недели целиком, а не только занятые дни */}
          {WEEKDAYS.map((weekday, index) => {
            const sessions = plan[index] ?? []
            const date = addDays(monday, index)

            return (
              <Paper key={weekday} withBorder p="md">
                <Group justify="space-between" mb={sessions.length > 0 ? 'sm' : 0}>
                  <Text fw={500}>
                    {weekday}, {formatShort(date)}
                  </Text>
                  {sessions.length === 0 && (
                    <Text size="sm" c="dimmed">
                      Выходной
                    </Text>
                  )}
                </Group>

                <Stack gap="xs">
                  {sessions.map((session) => (
                    <Card key={session.id} withBorder padding="sm" radius="sm">
                      <Group justify="space-between" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap">
                          <Text fw={500} w={50}>
                            {session.time}
                          </Text>
                          <div>
                            <Text size="sm">{session.title}</Text>
                            <Text size="xs" c="dimmed">
                              {session.group}
                            </Text>
                          </div>
                        </Group>
                        <SessionKindBadge kind={session.kind} />
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            )
          })}
        </Stack>
      )}
    </>
  )
}
