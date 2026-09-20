import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import {
  type CalendarSession,
  type Presence,
  defaultPresenceOf,
  presentCount,
  sessionAthletes,
  sessionsOf,
} from '../data/calendar'
import { KIND_COLORS, KIND_LABELS } from '../data/plans'
import { WEEKDAYS, addMonths, formatFull, formatMonth, monthGrid, startOfMonth, toISO } from '../lib/date'

export default function CalendarPage() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [selected, setSelected] = useState(() => new Date())
  const [marks, setMarks] = useState<Record<string, Presence>>({})
  const [editing, setEditing] = useState<CalendarSession | null>(null)
  const [draft, setDraft] = useState<Presence>({})

  const todayISO = toISO(new Date())
  const selectedISO = toISO(selected)
  const daySessions = sessionsOf(selected)

  const presenceOf = (session: CalendarSession): Presence =>
    marks[session.id] ?? defaultPresenceOf(session)

  function showMonth(shift: number) {
    const next = addMonths(month, shift)
    setMonth(next)
    setSelected(next)
  }

  function openEditor(session: CalendarSession) {
    setEditing(session)
    setDraft({ ...presenceOf(session) })
  }

  function saveEditor() {
    if (editing) setMarks({ ...marks, [editing.id]: draft })
    setEditing(null)
  }

  const editingAthletes = editing ? sessionAthletes(editing) : []

  return (
    <>
      <Group justify="space-between" align="center" mb="md" wrap="wrap">
        <Title order={2}>Календарь</Title>
        <Group gap="xs">
          <ActionIcon variant="default" size="lg" onClick={() => showMonth(-1)} aria-label="Предыдущий месяц">
            <IconChevronLeft size={18} />
          </ActionIcon>
          <Text fw={500} w={160} ta="center">
            {formatMonth(month)}
          </Text>
          <ActionIcon variant="default" size="lg" onClick={() => showMonth(1)} aria-label="Следующий месяц">
            <IconChevronRight size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <Paper withBorder p="md" mb="lg">
        <Box style={{ overflowX: 'auto' }}>
          <Box miw={480}>
            <SimpleGrid cols={7} spacing="xs" mb="xs">
              {WEEKDAYS.map((weekday) => (
                <Text key={weekday} size="sm" c="dimmed" ta="center">
                  {weekday}
                </Text>
              ))}
            </SimpleGrid>

            <Stack gap="xs">
              {monthGrid(month).map((week, index) => (
                <SimpleGrid key={index} cols={7} spacing="xs">
                  {week.map((day, dayIndex) => {
                    if (!day) return <div key={`empty-${dayIndex}`} />

                    const iso = toISO(day)
                    const count = sessionsOf(day).length
                    const isSelected = iso === selectedISO

                    return (
                      <UnstyledButton
                        key={iso}
                        onClick={() => setSelected(day)}
                        p="xs"
                        ta="center"
                        bg={isSelected ? 'teal.6' : undefined}
                        c={isSelected ? 'white' : undefined}
                        style={{
                          borderRadius: 'var(--mantine-radius-md)',
                          border:
                            iso === todayISO
                              ? '1px solid var(--mantine-color-teal-6)'
                              : '1px solid var(--mantine-color-default-border)',
                        }}
                      >
                        <Text size="sm" fw={iso === todayISO ? 700 : 400}>
                          {day.getDate()}
                        </Text>
                        <Text size="xs" c={isSelected ? 'white' : 'dimmed'}>
                          {count > 0 ? `${count} трен.` : '—'}
                        </Text>
                      </UnstyledButton>
                    )
                  })}
                </SimpleGrid>
              ))}
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Title order={3} size="h4" mb="sm">
        {formatFull(selected)}
      </Title>

      {daySessions.length === 0 ? (
        <EmptyState text="В этот день тренировок нет" hint="Выберите другой день в календаре" />
      ) : (
        <Stack gap="sm">
          {daySessions.map((session) => {
            const presence = presenceOf(session)
            const total = sessionAthletes(session).length

            return (
              <Card key={session.id} withBorder padding="md">
                <Group justify="space-between" wrap="wrap" gap="sm">
                  <div>
                    <Group gap="sm" mb={4}>
                      <Text fw={500}>{session.time}</Text>
                      <Text>{session.title}</Text>
                      <Badge color={KIND_COLORS[session.kind]} variant="light">
                        {KIND_LABELS[session.kind]}
                      </Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      {session.group} · присутствовали {presentCount(presence)} из {total}
                    </Text>
                  </div>
                  <Button variant="light" onClick={() => openEditor(session)}>
                    Отметить посещения
                  </Button>
                </Group>
              </Card>
            )
          })}
        </Stack>
      )}

      <Modal
        opened={editing !== null}
        onClose={() => setEditing(null)}
        title={editing ? `${editing.title} · ${editing.time}` : ''}
      >
        <Stack gap="sm">
          {editingAthletes.length === 0 ? (
            <EmptyState text="На это занятие никто не записан" />
          ) : (
            editingAthletes.map((athlete) => (
              <Checkbox
                key={athlete.id}
                label={athlete.name}
                description={athlete.group}
                checked={draft[athlete.id] ?? false}
                onChange={(event) =>
                  setDraft({ ...draft, [athlete.id]: event.currentTarget.checked })
                }
              />
            ))
          )}

          <Group justify="space-between" mt="md">
            <Text size="sm" c="dimmed">
              Отмечено: {presentCount(draft)} из {editingAthletes.length}
            </Text>
            <Group gap="xs">
              <Button variant="default" onClick={() => setEditing(null)}>
                Отмена
              </Button>
              <Button onClick={saveEditor}>Сохранить</Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
