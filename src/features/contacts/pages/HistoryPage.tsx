import { useQuery } from '@tanstack/react-query'
import { fetchContactEvents, fetchContacts } from '../lib/api'
import type { Contact, ContactEvent } from '../types/contact'
import styles from './HistoryPage.module.css'

function HistoryPage() {
  const { data: contacts = [], error: contactsError } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  })

  const { data: contactEvents = [], error: contactEventsError } = useQuery<
    ContactEvent[]
  >({
    queryKey: ['contact-events'],
    queryFn: fetchContactEvents,
  })

  if (contactsError || contactEventsError) {
    return <p>{contactsError?.message ?? contactEventsError?.message}</p>
  }

  return (
    <div>
      <h1>History</h1>
      <div className={styles.list}>
        {contactEvents.map((contactEvent) => {
          const contact = contacts.find(
            (savedContact) => savedContact.id === contactEvent.contactId,
          )

          return (
            <div key={contactEvent.id} className={styles.row}>
              <p>{contact?.name ?? 'Unknown contact'}</p>
              <p>{contactEvent.method}</p>
              <p>{new Date(contactEvent.occurredAt).toLocaleDateString()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryPage
