import type { Contact, ContactEvent } from '../types/contact'

type CreateContactRequest = {
  name: string
  relationship: string
  targetFrequencyDays: number
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = (await response.json()) as { error?: string }
    throw new Error(data.error ?? 'Request failed')
  }

  return response.json() as Promise<T>
}

async function fetchContacts() {
  const response = await fetch('/api/contacts')

  return parseJsonResponse<Contact[]>(response)
}

async function fetchContactEvents() {
  const response = await fetch('/api/contact-events')

  return parseJsonResponse<ContactEvent[]>(response)
}

async function createContact(contact: CreateContactRequest) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  return parseJsonResponse<Contact>(response)
}

export { createContact, fetchContactEvents, fetchContacts }
