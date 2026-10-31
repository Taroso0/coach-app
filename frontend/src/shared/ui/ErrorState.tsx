import { Button, Stack, Text } from '@mantine/core'

interface ErrorStateProps {
  text: string
  onRetry: () => void
}

/** Сообщение об ошибке загрузки с возможностью повторить запрос. */
export default function ErrorState({ text, onRetry }: ErrorStateProps) {
  return (
    <Stack gap="sm" align="center" py="xl">
      <Text c="red">{text}</Text>
      <Button variant="light" onClick={onRetry}>
        Повторить
      </Button>
    </Stack>
  )
}
