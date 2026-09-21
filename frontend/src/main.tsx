import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css' // без этого импорта компоненты Mantine остаются без стилей
import App from './App.tsx'

/**
 * Единое оформление задаётся здесь, а не по компонентам: цвет кнопок,
 * бейджей и прогресс-баров и радиус скруглений меняются в одном месте.
 */
const theme = createTheme({
  primaryColor: 'teal',
  defaultRadius: 'md',
})

// Тема снаружи роутера: оформление нужно всему приложению независимо от маршрута,
// а BrowserRouter должен быть выше App, иначе хуки маршрутизации не найдут контекст
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
