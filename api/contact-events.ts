import { neon } from '@neondatabase/serverless'

declare const process: {
  env: Record<string, string | undefined>
}

export async function GET(_request: Request) {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    const contactEvent = await sql`
      select
        id,
        contact_id,
        date,
        method
      from contact_events
      order by date asc
    `

    const mappedContacts = contactEvent.map((contact) => ({
      id: contact.id,
      contactId: contact.contact_id,
      occurredAt: contact.date,
      method: contact.method,
    }))

    return Response.json(mappedContacts)
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