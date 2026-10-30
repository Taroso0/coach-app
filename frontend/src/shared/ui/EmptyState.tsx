import { Stack, Text } from '@mantine/core'

interface EmptyStateProps {
  /** Что именно отсутствует — короткой фразой. */
  text: string
  /** Подсказка, что с этим делать. */
  hint?: string
}

/** Единое оформление сообщения о том, что показывать нечего. */
export default function EmptyState({ text, hint }: EmptyStateProps) {
  return (
    <Stack gap={4} align="center" py="xl">
      <Text c="dimmed">{text}</Text>
      {hint && (
        <Text size="sm" c="dimmed">
          {hint}
        </Text>
      )}
    </Stack>
  )
}
