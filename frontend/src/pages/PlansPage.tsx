import { ActionIcon, Badge, Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { KIND_COLORS, KIND_LABELS, getWeekPlan } from '../data/plans'
import { WEEKDAYS, addDays, formatShort, formatWeekRange, mondayOf } from '../lib/date'

export default function PlansPage() {
  const [offset, setOffset] = useState(0)

  const monday = addDays(mondayOf(new Date()), offset * 7)
  const plan = getWeekPlan(offset)
  const total = Object.values(plan).reduce((sum, sessions) => sum + sessions.length, 0)

  return (
    <>
      <Group justify="space-between" align="center" mb="md" wrap="wrap">
        <Title order={2}>Планы тренировок</Title>
        <Group gap="xs">
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => setOffset(offset - 1)}
            aria-label="Предыдущая неделя"
          >
            <IconChevronLeft size={18} />
          </ActionIcon>
          <Text fw={500} w={130} ta="center">
            {formatWeekRange(monday)}
          </Text>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => setOffset(offset + 1)}
            aria-label="Следующая неделя"
          >
            <IconChevronRight size={18} />
          </ActionIcon>
          {offset !== 0 && (
            <Button variant="subtle" size="compact-sm" onClick={() => setOffset(0)}>
              Текущая неделя
            </Button>
          )}
        </Group>
      </Group>

      <Text c="dimmed" size="sm" mb="md">
        Тренировок на неделе: {total}
      </Text>

      <Stack gap="sm">
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
                      <Badge color={KIND_COLORS[session.kind]} variant="light">
                        {KIND_LABELS[session.kind]}
                      </Badge>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )
        })}
      </Stack>
    </>
  )
}
