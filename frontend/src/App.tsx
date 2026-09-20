import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AthletesPage from './pages/AthletesPage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/athletes" replace />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/athletes/:id" element={<PlaceholderPage title="Карточка спортсмена" />} />
        <Route path="/plans" element={<PlaceholderPage title="Планы тренировок" />} />
        <Route path="/calendar" element={<PlaceholderPage title="Календарь" />} />
        <Route path="*" element={<PlaceholderPage title="Страница не найдена" />} />
      </Route>
    </Routes>
  )
}
