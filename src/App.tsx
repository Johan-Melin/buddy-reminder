import './App.css'

import AppHeader from './app/layout/AppHeader'
import AppRoutes from './app/routes/AppRoutes'

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App
