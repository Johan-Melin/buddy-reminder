import { NavLink } from 'react-router-dom'

function AppHeader() {
  return (
    <header>
      <h1>AppHeader</h1>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </nav>
    </header>
  )
}

export default AppHeader