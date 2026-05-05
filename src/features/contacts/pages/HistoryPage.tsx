import { useEffect, useState } from 'react'
import type { Contact, ContactEvent } from '../types/contact'
import styles from './HistoryPage.module.css'

function HistoryPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactEvents, setContactEvents] = useState<ContactEvent[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadHistoryPageData() {
      try {
        const [contactsResponse, contactEventsResponse] = await Promise.all([
          fetch('/api/contacts'),
          fetch('/api/contact-events'),
        ])

        if (!contactsResponse.ok || !contactEventsResponse.ok) {
          throw new Error('Failed to fetch history data')
        }

        const [contactsData, contactEventsData] = await Promise.all([
          contactsResponse.json(),
          contactEventsResponse.json(),
        ])

        setContacts(contactsData)
        setContactEvents(contactEventsData)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unknown error occurred',
        )
      }
    }

    loadHistoryPageData()
  }, [])

  if (error) {
    return <p>{error}</p>
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
