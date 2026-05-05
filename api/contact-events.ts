import { asc } from 'drizzle-orm'
import { getDb } from '../db'
import { contactEventsTable } from '../db/schema'

function mapContactEvent(contactEvent: {
  id: string
  contactId: string
  occurredAt: Date
  method: string
}) {
  return {
    id: contactEvent.id,
    contactId: contactEvent.contactId,
    occurredAt: contactEvent.occurredAt.toISOString(),
    method: contactEvent.method,
  }
}

export async function GET(_request: Request) {
  const db = getDb()

  if (!db) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

  try {
    const contactEvents = await db
      .select()
      .from(contactEventsTable)
      .orderBy(asc(contactEventsTable.occurredAt))

    return Response.json(contactEvents.map(mapContactEvent))
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
