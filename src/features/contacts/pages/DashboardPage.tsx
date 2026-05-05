import { mockContacts, mockContactHistory } from '../lib/mockContacts'
import ContactCard from '../components/ContactCard'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  return (
    <div>
      <h1>Reminders</h1>
      <div className={styles.cards}>
        {mockContacts.map((contact) => {
          const lastContacted = mockContactHistory
            .filter((event) => event.contactId === contact.id)
            .toSorted((firstEvent, secondEvent) =>
              secondEvent.occurredAt.localeCompare(firstEvent.occurredAt),
            )
            .at(0)?.occurredAt

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
