import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendar, IconClipboardList, IconUsers } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  icon: ReactNode
}

// Пункты меню описаны данными, а не разметкой: новый экран добавляется
// строкой в массив, а не копированием JSX
const NAV_ITEMS: NavItem[] = [
  { label: 'Спортсмены', to: '/athletes', icon: <IconUsers size={20} /> },
  { label: 'Планы тренировок', to: '/plans', icon: <IconClipboardList size={20} /> },
  { label: 'Календарь', to: '/calendar', icon: <IconCalendar size={20} /> },
]

export default function Layout() {
  const [opened, { toggle, close }] = useDisclosure()
  const { pathname } = useLocation()

  return (
    <AppShell
      header={{ height: 56 }}
      // Уже брейкпоинта sm меню считается мобильным и скрыто, пока его не раскрыли
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* На десктопе меню развёрнуто всегда, поэтому бургер там не нужен.
              aria-label — у кнопки нет текста, только иконка */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Меню" />
          <Title order={3}>Coach App</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            // Внешне компонент Mantine, в разметке — ссылка React Router:
            // переход без перезагрузки страницы
            component={Link}
            to={item.to}
            label={item.label}
            leftSection={item.icon}
            // startsWith, а не строгое сравнение: на /athletes/5 пункт
            // «Спортсмены» должен оставаться подсвеченным
            active={pathname.startsWith(item.to)}
            // На телефоне панель перекрыла бы только что открытый экран,
            // поэтому после выбора закрываем её
            onClick={close}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
