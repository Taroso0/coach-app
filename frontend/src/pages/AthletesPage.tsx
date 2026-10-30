import { Group, Progress, Table, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AthleteStatusBadge from '../entities/athlete/AthleteStatusBadge'
import { ATHLETES } from '../entities/athlete/model'
import AthleteSearch from '../features/search-athletes/AthleteSearch'
import { filterAthletes } from '../features/search-athletes/model'
import EmptyState from '../shared/ui/EmptyState'

export default function AthletesPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // Отфильтрованный список не держим в отдельном состоянии: он однозначно
  // выводится из запроса, а два источника правды пришлось бы синхронизировать
  const visible = filterAthletes(ATHLETES, query)

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Спортсмены</Title>
        <AthleteSearch value={query} onChange={setQuery} />
      </Group>

      {visible.length === 0 ? (
        <EmptyState text="Спортсмены не найдены" hint="Измените запрос или очистите поиск" />
      ) : (
        // Уже 560px таблица не сжимается в кашу, а прокручивается по горизонтали
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
                // Кликабельна вся строка, а обернуть <tr> в ссылку нельзя —
                // HTML не допускает такую вложенность, поэтому переход программный
                <Table.Tr
                  key={a.id}
                  onClick={() => navigate(`/athletes/${a.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Table.Td>{a.name}</Table.Td>
                  <Table.Td>{a.age}</Table.Td>
                  <Table.Td>{a.group}</Table.Td>
                  <Table.Td>
                    <AthleteStatusBadge status={a.status} />
                  </Table.Td>
                  <Table.Td w={180}>
                    {/* Ширина у числа фиксированная, чтобы проценты во всех
                        строках стояли по одной вертикали */}
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
