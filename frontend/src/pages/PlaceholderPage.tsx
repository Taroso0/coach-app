import { Text, Title } from '@mantine/core'

interface PlaceholderPageProps {
  title: string
}

/**
 * Заглушка для экрана без собственной вёрстки.
 * Сейчас используется как страница 404 на маршруте «*».
 */
export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <>
      <Title order={2} mb="md">
        {title}
      </Title>
      <Text c="dimmed">Экран в разработке</Text>
    </>
  )
}
