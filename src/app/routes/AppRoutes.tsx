import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../features/contacts/pages/DashboardPage'
import ContactEditorPage from '../../features/contacts/pages/ContactEditorPage'
import ContactsPage from '../../features/contacts/pages/ContactsPage'
import HistoryPage from '../../features/contacts/pages/HistoryPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/new" element={<ContactEditorPage />} />
      <Route path="/contacts/:contactId" element={<ContactEditorPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  )
}

export default AppRoutes
