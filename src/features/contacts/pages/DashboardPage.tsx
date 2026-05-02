import { mockContacts } from '../lib/mockContacts'
import ContactCard from '../components/ContactCard'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        {mockContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage