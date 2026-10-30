import { Button, Checkbox, Group, Modal, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import type { CalendarSession } from '../../entities/session/model'
import EmptyState from '../../shared/ui/EmptyState'
import { type Presence, presentCount, sessionAthletes } from './model'

interface MarkAttendanceModalProps {
  /** Занятие, посещения которого отмечаем; null — окно закрыто. */
  session: CalendarSession | null
  /** Отметки, с которыми окно открывается. */
  initial: Presence
  onClose: () => void
  onSave: (presence: Presence) => void
}

/**
 * Окно отметки посещений. Страница передаёт key по id занятия, поэтому
 * при открытии другого занятия черновик создаётся заново из initial.
 */
export default function MarkAttendanceModal({ session, initial, onClose, onSave }: MarkAttendanceModalProps) {
  // Черновик галочек: правим его, а не сохранённые отметки, чтобы работала кнопка «Отмена».
  // Копия, а не ссылка: иначе галочки правились бы прямо в сохранённых данных
  const [draft, setDraft] = useState<Presence>(() => ({ ...initial }))
  const athletes = session ? sessionAthletes(session) : []

  return (
    <Modal opened={session !== null} onClose={onClose} title={session ? `${session.title} · ${session.time}` : ''}>
      <Stack gap="sm">
        {athletes.length === 0 ? (
          <EmptyState text="На это занятие никто не записан" />
        ) : (
          athletes.map((athlete) => (
            <Checkbox
              key={athlete.id}
              label={athlete.name}
              description={athlete.group}
              // ?? false — чтобы поле не стало неконтролируемым при undefined
              checked={draft[athlete.id] ?? false}
              onChange={(event) => setDraft({ ...draft, [athlete.id]: event.currentTarget.checked })}
            />
          ))
        )}

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Отмечено: {presentCount(draft)} из {athletes.length}
          </Text>
          <Group gap="xs">
            <Button variant="default" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={() => onSave(draft)}>Сохранить</Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  )
}
