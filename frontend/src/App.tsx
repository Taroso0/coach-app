import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AthletePage from './pages/AthletePage'
import AthletesPage from './pages/AthletesPage'
import PlaceholderPage from './pages/PlaceholderPage'
import PlansPage from './pages/PlansPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/athletes" replace />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/athletes/:id" element={<AthletePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/calendar" element={<PlaceholderPage title="Календарь" />} />
        <Route path="*" element={<PlaceholderPage title="Страница не найдена" />} />
      </Route>
    </Routes>
  )
}
