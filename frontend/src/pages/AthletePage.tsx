import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import {
  INJURY_STATUS_COLORS,
  INJURY_STATUS_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
  findAthlete,
} from '../data/athletes'
import EmptyState from '../components/EmptyState'
import { formatFull } from '../lib/date'

export default function AthletePage() {
  const { id } = useParams()
  const athlete = findAthlete(id)

  if (!athlete) {
    return (
      <Stack align="flex-start">
        <Title order={2}>Спортсмен не найден</Title>
        <Text c="dimmed">Возможно, запись была удалена или ссылка неверна.</Text>
        <Button component={Link} to="/athletes" leftSection={<IconArrowLeft size={16} />}>
          К списку спортсменов
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <Button
        component={Link}
        to="/athletes"
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        mb="sm"
        px={0}
      >
        К списку спортсменов
      </Button>

      <Group justify="space-between" align="center" mb="lg">
        <Title order={2}>{athlete.name}</Title>
        <Badge color={STATUS_COLORS[athlete.status]} variant="light" size="lg">
          {STATUS_LABELS[athlete.status]}
        </Badge>
      </Group>

      <Tabs defaultValue="info">
        <Tabs.List mb="md">
          <Tabs.Tab value="info">Информация</Tabs.Tab>
          <Tabs.Tab value="injuries">Травмы</Tabs.Tab>
          <Tabs.Tab value="nutrition">Питание</Tabs.Tab>
          <Tabs.Tab value="attendance">Посещаемость</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed">
                Возраст
              </Text>
              <Text fw={500}>{athlete.age}</Text>
            </Paper>
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed">
                Группа
              </Text>
              <Text fw={500}>{athlete.group}</Text>
            </Paper>
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed">
                Телефон
              </Text>
              <Text fw={500}>{athlete.phone}</Text>
            </Paper>
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed">
                Цель
              </Text>
              <Text fw={500}>{athlete.goal}</Text>
            </Paper>
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="injuries">
          {athlete.injuries.length === 0 ? (
            <EmptyState text="Травм не зафиксировано" />
          ) : (
            <Stack gap="sm">
              {athlete.injuries.map((injury) => (
                <Card key={injury.id} withBorder padding="md">
                  <Group justify="space-between" mb={4}>
                    <Text fw={500}>{injury.title}</Text>
                    <Badge color={INJURY_STATUS_COLORS[injury.status]} variant="light">
                      {INJURY_STATUS_LABELS[injury.status]}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb={4}>
                    {formatFull(injury.date)}
                  </Text>
                  <Text size="sm">{injury.note}</Text>
                </Card>
              ))}
            </Stack>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="nutrition">
          {athlete.nutrition.length === 0 ? (
            <EmptyState text="Записей о питании пока нет" />
          ) : (
            <Table.ScrollContainer minWidth={480}>
              <Table verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Дата</Table.Th>
                    <Table.Th>Калории</Table.Th>
                    <Table.Th>Белок, г</Table.Th>
                    <Table.Th>Комментарий</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {athlete.nutrition.map((note) => (
                    <Table.Tr key={note.id}>
                      <Table.Td>{formatFull(note.date)}</Table.Td>
                      <Table.Td>{note.calories}</Table.Td>
                      <Table.Td>{note.protein}</Table.Td>
                      <Table.Td>{note.comment}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="attendance">
          <Paper withBorder p="md" mb="md">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                Посещаемость за месяц
              </Text>
              <Text fw={500}>{athlete.attendance}%</Text>
            </Group>
            <Progress value={athlete.attendance} />
          </Paper>

          {athlete.history.length === 0 ? (
            <EmptyState text="Занятий пока не было" />
          ) : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Дата</Table.Th>
                  <Table.Th>Занятие</Table.Th>
                  <Table.Th>Отметка</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {athlete.history.map((record) => (
                  <Table.Tr key={record.date}>
                    <Table.Td>{formatFull(record.date)}</Table.Td>
                    <Table.Td>{record.session}</Table.Td>
                    <Table.Td>
                      <Badge color={record.present ? 'teal' : 'red'} variant="light">
                        {record.present ? 'Был' : 'Не был'}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
