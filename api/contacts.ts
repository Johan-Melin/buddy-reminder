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
    const contacts = await sql`
      select
        id,
        name,
        relationship,
        target_frequency_days,
        created_at,
        updated_at
      from contacts
      order by name asc
    `

    const mappedContacts = contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      relationship: contact.relationship,
      targetFrequencyDays: contact.target_frequency_days,
      createdAt: contact.created_at,
      updatedAt: contact.updated_at,
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