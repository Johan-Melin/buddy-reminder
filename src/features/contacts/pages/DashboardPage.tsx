import { mockContacts, mockContactHistory } from '../lib/mockContacts'
import ContactCard from '../components/ContactCard'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        {mockContacts.map((contact) => {
          const lastContacted = mockContactHistory
            .filter((event) => event.contactId === contact.id)
            .toSorted((firstEvent, secondEvent) =>
              secondEvent.date.localeCompare(firstEvent.date),
            )
            .at(0)?.date

          return (
            <ContactCard
              key={contact.id}
              contact={contact}
              lastContacted={lastContacted}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage
