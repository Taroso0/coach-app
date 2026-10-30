import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface AthleteSearchProps {
  value: string
  onChange: (value: string) => void
}

/** Поле поиска спортсмена по имени. */
export default function AthleteSearch({ value, onChange }: AthleteSearchProps) {
  return (
    // Контролируемое поле: значение живёт в состоянии страницы, поэтому список
    // фильтруется на каждое нажатие клавиши
    <TextInput
      placeholder="Поиск по имени"
      leftSection={<IconSearch size={16} />}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      // На телефоне поле во всю ширину, на десктопе — фиксированное
      w={{ base: '100%', sm: 280 }}
    />
  )
}
