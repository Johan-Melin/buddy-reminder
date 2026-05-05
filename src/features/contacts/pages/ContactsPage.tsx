import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchContacts } from '../lib/api'
import type { Contact } from '../types/contact'
import styles from './ContactsPage.module.css'

function ContactsPage() {
  const { data: contacts = [], error } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  })

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h1>Contacts</h1>
      <Link to="/contacts/new">Add contact</Link>
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
