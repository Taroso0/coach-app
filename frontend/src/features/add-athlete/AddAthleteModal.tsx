import { Button, Group, Modal, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { type NewAthlete, createAthlete } from '../../entities/athlete/api'
import { STATUS_LABELS, type AthleteStatus } from '../../entities/athlete/model'
import { EMPTY_ATHLETE, GROUPS, validateAthlete } from './model'

interface AddAthleteModalProps {
  opened: boolean
  onClose: () => void
  /** Вызывается после успешного сохранения — страница перезагружает список. */
  onAdded: () => void
}

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }))

export default function AddAthleteModal({ opened, onClose, onAdded }: AddAthleteModalProps) {
  const [saving, setSaving] = useState(false)
  const form = useForm<NewAthlete>({
    initialValues: EMPTY_ATHLETE,
    // Все поля проверяются при нажатии «Сохранить», а ошибка поля исчезает,
    // как только его начинают исправлять. Проверка при уходе с поля не подошла:
    // появившаяся ошибка сдвигала кнопку, и клик по «Сохранить» проходил мимо
    validate: validateAthlete,
  })

  function close() {
    form.reset()
    onClose()
  }

  async function submit(values: NewAthlete) {
    setSaving(true)
    await createAthlete({
      ...values,
      name: values.name.trim(),
      phone: values.phone.trim(),
      goal: values.goal.trim(),
    })
    setSaving(false)
    form.reset()
    onAdded()
  }

  return (
    // pop — окно «вырастает» из центра: видно, что открылась форма поверх списка
    <Modal opened={opened} onClose={close} title="Новый спортсмен" transitionProps={{ transition: 'pop' }}>
      <form onSubmit={form.onSubmit(submit)} noValidate>
        <Stack gap="sm">
          <TextInput label="Имя" placeholder="Иван Петров" withAsterisk {...form.getInputProps('name')} />
          <Group grow align="flex-start">
            <NumberInput label="Возраст" min={5} max={100} withAsterisk {...form.getInputProps('age')} />
            <Select
              label="Статус"
              data={STATUS_OPTIONS}
              allowDeselect={false}
              value={form.values.status}
              onChange={(value) => form.setFieldValue('status', value as AthleteStatus)}
            />
          </Group>
          <Select
            label="Группа"
            placeholder="Выберите группу"
            data={GROUPS}
            withAsterisk
            {...form.getInputProps('group')}
          />
          <TextInput label="Телефон" placeholder="+7 900 123-45-67" {...form.getInputProps('phone')} />
          <TextInput label="Цель" placeholder="Первый разряд к весне" {...form.getInputProps('goal')} />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close}>
              Отмена
            </Button>
            <Button type="submit" loading={saving}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
