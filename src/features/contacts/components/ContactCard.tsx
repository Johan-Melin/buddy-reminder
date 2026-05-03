import type { Contact } from '../types/contact'
import styles from './ContactCard.module.css'

type ContactCardProps = {
  contact: Contact
}

function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className={styles.card}>
      <h3>{contact.name}</h3>
      <p>{contact.relationship}</p>
    </div>
  )
}

export default ContactCard