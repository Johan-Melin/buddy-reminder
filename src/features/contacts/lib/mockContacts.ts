import type { Contact, ContactEvent } from '../types/contact'

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    relationship: 'family',
    targetFrequencyDays: 14,
    createdAt: '2026-01-10T09:15:00.000Z',
    updatedAt: '2026-04-28T18:45:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    relationship: 'friend',
    targetFrequencyDays: 14,
    createdAt: '2025-12-22T14:00:00.000Z',
    updatedAt: '2026-04-10T16:20:00.000Z',
  },
  {
    id: '3',
    name: 'Jim Doe',
    relationship: 'colleague',
    targetFrequencyDays: 7,
    createdAt: '2026-02-01T07:50:00.000Z',
    updatedAt: '2026-04-30T09:10:00.000Z',
  },
  {
    id: '4',
    name: 'Jill Doe',
    relationship: 'other',
    targetFrequencyDays: 30,
    createdAt: '2025-11-18T11:25:00.000Z',
    updatedAt: '2026-03-02T10:05:00.000Z',
  },
  {
    id: '5',
    name: 'Jack Doe',
    relationship: 'family',
    targetFrequencyDays: 30,
    createdAt: '2026-01-28T20:10:00.000Z',
    updatedAt: '2026-04-15T07:35:00.000Z',
  },
  {
    id: '6',
    name: 'Jill Doe',
    relationship: 'friend',
    targetFrequencyDays: 60,
    createdAt: '2025-10-05T15:40:00.000Z',
    updatedAt: '2026-02-21T21:00:00.000Z',
  },
  {
    id: '7',
    name: 'Jill Doe',
    relationship: 'friend',
    targetFrequencyDays: 14,
    createdAt: '2026-03-08T08:05:00.000Z',
    updatedAt: '2026-05-01T12:00:00.000Z',
  },
]

const mockContactHistory: ContactEvent[] = [
  {
    id: '1',
    contactId: '3',
    date: '2026-02-03T19:30:00.000Z',
    method: 'phone',
  },
  {
    id: '2',
    contactId: '6',
    date: '2026-03-14T12:15:00.000Z',
    method: 'message',
  },
  {
    id: '3',
    contactId: '3',
    date: '2026-04-27T08:00:00.000Z',
    method: 'meeting',
  },
]

export { mockContacts, mockContactHistory }
