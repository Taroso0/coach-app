import { ActionIcon, Group, Text } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface PeriodSwitcherProps {
  /** Подпись текущего периода между стрелками. */
  label: string
  /** Фиксированная ширина подписи, иначе стрелки дёргались бы при смене дат. */
  labelWidth: number
  prevLabel: string
  nextLabel: string
  onPrev: () => void
  onNext: () => void
  /** Дополнительные кнопки справа от стрелок. */
  children?: ReactNode
}

/** Стрелки «назад / вперёд» с подписью периода: неделя в планах, месяц в календаре. */
export default function PeriodSwitcher({
  label,
  labelWidth,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  children,
}: PeriodSwitcherProps) {
  return (
    <Group gap="xs">
      <ActionIcon variant="default" size="lg" onClick={onPrev} aria-label={prevLabel}>
        <IconChevronLeft size={18} />
      </ActionIcon>
      <Text fw={500} w={labelWidth} ta="center">
        {label}
      </Text>
      <ActionIcon variant="default" size="lg" onClick={onNext} aria-label={nextLabel}>
        <IconChevronRight size={18} />
      </ActionIcon>
      {children}
    </Group>
  )
}
