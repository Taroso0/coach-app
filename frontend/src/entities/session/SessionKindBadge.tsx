import { Badge } from '@mantine/core'
import { KIND_COLORS, KIND_LABELS, type SessionKind } from './model'

interface SessionKindBadgeProps {
  kind: SessionKind
}

export default function SessionKindBadge({ kind }: SessionKindBadgeProps) {
  return (
    <Badge color={KIND_COLORS[kind]} variant="light">
      {KIND_LABELS[kind]}
    </Badge>
  )
}
