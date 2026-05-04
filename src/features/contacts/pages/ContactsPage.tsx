import { useEffect, useState } from 'react'
import type { Contact } from '../types/contact'
import styles from './ContactsPage.module.css'

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContacts() {
      try {
        const response = await fetch('/api/contacts')
        
        if (!response.ok) {
          throw new Error('Failed to fetch contacts')
        }

        const data = await response.json()
        setContacts(data)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unknown error occurred',
        )
      }
    }

    loadContacts()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Contacts</h1>
      <div className={styles.list}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.row}>
            <p>{contact.name}</p>
            <p>{contact.relationship}</p>
            <p>Every {contact.targetFrequencyDays} days </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsPage
