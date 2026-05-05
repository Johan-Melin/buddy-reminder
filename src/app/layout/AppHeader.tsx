import { NavLink } from 'react-router-dom'
import styles from './AppHeader.module.css'

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>Buddy Reminder</NavLink>
        <nav className={styles.nav}>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/contacts">Contacts</NavLink>
            <NavLink to="/history">History</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
