import type { Contact } from '../types/contact'

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    relationship: 'family',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Doe',
    relationship: 'friend',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Jim Doe',
    relationship: 'colleague',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Jill Doe',
    relationship: 'other',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Jack Doe',
    relationship: 'family',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Jill Doe',
    relationship: 'friend',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Jill Doe',
    relationship: 'friend',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export { mockContacts }
