import type { Contact } from '../types/contact'

type ContactCardProps = {
  contact: Contact
}

function ContactCard({ contact }: ContactCardProps) {
  return (
    <div>
      <h3>{contact.name}</h3>
      <p>{contact.relationship}</p>
    </div>
  )
}

export default ContactCard