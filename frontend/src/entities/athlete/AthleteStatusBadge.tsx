import { Badge, type MantineSize } from '@mantine/core'
import { STATUS_COLORS, STATUS_LABELS, type AthleteStatus } from './model'

interface AthleteStatusBadgeProps {
  status: AthleteStatus
  size?: MantineSize
}

export default function AthleteStatusBadge({ status, size }: AthleteStatusBadgeProps) {
  return (
    <Badge color={STATUS_COLORS[status]} variant="light" size={size}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
