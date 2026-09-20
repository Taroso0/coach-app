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
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Меню" />
          <Title order={3}>Coach App</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            component={Link}
            to={item.to}
            label={item.label}
            leftSection={item.icon}
            active={pathname.startsWith(item.to)}
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
