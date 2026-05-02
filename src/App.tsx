import './App.css'

import AppHeader from './app/layout/AppHeader'
import DashboardPage from './features/contacts/pages/DeashboardPage'

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <DashboardPage />
      </main>
    </>
  )
}

export default App
