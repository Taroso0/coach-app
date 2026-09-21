import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AthletePage from './pages/AthletePage'
import AthletesPage from './pages/AthletesPage'
import CalendarPage from './pages/CalendarPage'
import PlaceholderPage from './pages/PlaceholderPage'
import PlansPage from './pages/PlansPage'

export default function App() {
  return (
    <Routes>
      {/* Маршрут без path — общая обёртка: шапка и меню не перемонтируются
          при переходах, меняется только содержимое внутри <Outlet /> */}
      <Route element={<Layout />}>
        {/* replace, а не push: иначе «Назад» вернула бы на «/», который снова
            редиректит, и переход зациклился бы */}
        <Route index element={<Navigate to="/athletes" replace />} />
        <Route path="/athletes" element={<AthletesPage />} />
        {/* :id — динамический сегмент, читается через useParams в AthletePage */}
        <Route path="/athletes/:id" element={<AthletePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* Всё, что не совпало с маршрутами выше */}
        <Route path="*" element={<PlaceholderPage title="Страница не найдена" />} />
      </Route>
    </Routes>
  )
}
