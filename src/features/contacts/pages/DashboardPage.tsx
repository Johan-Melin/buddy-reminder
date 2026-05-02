import { mockContacts } from '../lib/mockContacts'
import ContactCard from '../components/ContactCard'

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {mockContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage