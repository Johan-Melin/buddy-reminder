import { asc } from 'drizzle-orm'
import { getDb } from '../db'
import {
  databaseErrorResponse,
  databaseNotConfiguredResponse,
} from '../db/http'
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
    return databaseNotConfiguredResponse()
  }

  try {
    const contactEvents = await db
      .select()
      .from(contactEventsTable)
      .orderBy(asc(contactEventsTable.occurredAt))

    return Response.json(contactEvents.map(mapContactEvent))
  } catch (error) {
    return databaseErrorResponse(error)
  }
}
