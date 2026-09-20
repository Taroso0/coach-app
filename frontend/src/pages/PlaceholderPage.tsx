import { Text, Title } from '@mantine/core'

interface PlaceholderPageProps {
  title: string
}

// Временная заглушка: экран будет сверстан на следующих шагах ЛР1
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
