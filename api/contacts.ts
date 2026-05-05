import { asc } from 'drizzle-orm'
import { getDb } from '../db'
import { mapContact } from '../db/mappers/contacts'
import { contactsTable } from '../db/schema'

type CreateContactRequest = {
  name?: string
  relationship?: string
  targetFrequencyDays?: number
}

const validRelationships = new Set([
  'family',
  'friend',
  'colleague',
  'other',
])

export async function GET(_request: Request) {
  const db = getDb()

  if (!db) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(asc(contactsTable.name))

    return Response.json(contacts.map(mapContact))
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown database error',
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  const db = getDb()

  if (!db) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

  let body: CreateContactRequest

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = body.name?.trim()
  const relationship = body.relationship?.trim()
  const targetFrequencyDays = body.targetFrequencyDays

  if (!name) {
    return Response.json({ error: 'Name is required' }, { status: 400 })
  }

  if (!relationship || !validRelationships.has(relationship)) {
    return Response.json({ error: 'Relationship is invalid' }, { status: 400 })
  }

  if (
    typeof targetFrequencyDays !== 'number' ||
    !Number.isInteger(targetFrequencyDays) ||
    targetFrequencyDays < 1
  ) {
    return Response.json(
      { error: 'Preferred frequency must be a positive integer' },
      { status: 400 },
    )
  }

  try {
    const now = new Date()
    const createdContacts = await db
      .insert(contactsTable)
      .values({
        id: crypto.randomUUID(),
        name,
        relationship,
        targetFrequencyDays,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    return Response.json(mapContact(createdContacts[0]), { status: 201 })
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown database error',
      },
      { status: 500 },
    )
  }
}
