import { asc } from 'drizzle-orm'
import type { getDb } from '../index'
import { contactsTable } from '../schema'

type Database = NonNullable<ReturnType<typeof getDb>>

type CreateContactInput = {
  name: string
  relationship: string
  targetFrequencyDays: number
}

async function listContacts(db: Database) {
  return db.select().from(contactsTable).orderBy(asc(contactsTable.name))
}

async function createContact(db: Database, input: CreateContactInput) {
  const now = new Date()

  const createdContacts = await db
    .insert(contactsTable)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      relationship: input.relationship,
      targetFrequencyDays: input.targetFrequencyDays,
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  return createdContacts[0]
}

export { createContact, listContacts }
