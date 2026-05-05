import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../features/contacts/pages/DashboardPage'
import ContactsPage from '../../features/contacts/pages/ContactsPage'
import HistoryPage from '../../features/contacts/pages/HistoryPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default AppRoutes
