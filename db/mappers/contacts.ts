type ContactRecord = {
  id: string
  name: string
  relationship: string
  targetFrequencyDays: number
  createdAt: Date
  updatedAt: Date
}

function mapContact(contact: ContactRecord) {
  return {
    id: contact.id,
    name: contact.name,
    relationship: contact.relationship,
    targetFrequencyDays: contact.targetFrequencyDays,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  }
}

export { mapContact }
