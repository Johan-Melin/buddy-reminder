import type { Contact } from '../types/contact'
import styles from './ContactCard.module.css'

type ContactCardProps = {
  contact: Contact
  lastContacted?: string
}

function ContactCard({ contact, lastContacted }: ContactCardProps) {
  return (
    <div className={styles.card}>
      <h3>{contact.name}</h3>
      <p>{contact.relationship}</p>
      <p>
        Last contacted:{' '}
        {lastContacted
          ? new Date(lastContacted).toLocaleDateString()
          : 'No contact yet'}
      </p>
    </div>
  )
}

export default ContactCard
