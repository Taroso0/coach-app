import { Badge, Group, Progress, Table, Text, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { ATHLETES, STATUS_COLORS, STATUS_LABELS } from '../data/athletes'

export default function AthletesPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const visible = ATHLETES.filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Спортсмены</Title>
        <TextInput
          placeholder="Поиск по имени"
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          w={{ base: '100%', sm: 280 }}
        />
      </Group>

      {visible.length === 0 ? (
        <EmptyState text="Спортсмены не найдены" hint="Измените запрос или очистите поиск" />
      ) : (
        <Table.ScrollContainer minWidth={560}>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Имя</Table.Th>
                <Table.Th>Возраст</Table.Th>
                <Table.Th>Группа</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th>Посещаемость</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {visible.map((a) => (
                <Table.Tr
                  key={a.id}
                  onClick={() => navigate(`/athletes/${a.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Table.Td>{a.name}</Table.Td>
                  <Table.Td>{a.age}</Table.Td>
                  <Table.Td>{a.group}</Table.Td>
                  <Table.Td>
                    <Badge color={STATUS_COLORS[a.status]} variant="light">
                      {STATUS_LABELS[a.status]}
                    </Badge>
                  </Table.Td>
                  <Table.Td w={180}>
                    <Group gap="xs" wrap="nowrap">
                      <Progress value={a.attendance} flex={1} />
                      <Text size="sm" w={40} ta="right">
                        {a.attendance}%
                      </Text>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  )
}
