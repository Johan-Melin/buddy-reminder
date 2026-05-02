import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../features/contacts/pages/DashboardPage'
import ContactsPage from '../../features/contacts/pages/ContactsPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  )
}

export default AppRoutes