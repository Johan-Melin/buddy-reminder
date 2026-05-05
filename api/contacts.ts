import { neon } from '@neondatabase/serverless'

declare const process: {
  env: Record<string, string | undefined>
}

type ContactRow = {
  id: string
  name: string
  relationship: string
  target_frequency_days: number
  created_at: string
  updated_at: string
}

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

function mapContact(contact: ContactRow) {
  return {
    id: contact.id,
    name: contact.name,
    relationship: contact.relationship,
    targetFrequencyDays: contact.target_frequency_days,
    createdAt: contact.created_at,
    updatedAt: contact.updated_at,
  }
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  return neon(process.env.DATABASE_URL)
}

export async function GET(_request: Request) {
  const sql = getSql()

  if (!sql) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

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

    const mappedContacts = contacts.map((contact) =>
      mapContact(contact as ContactRow),
    )

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

export async function POST(request: Request) {
  const sql = getSql()

  if (!sql) {
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

  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  try {
    const createdContacts = await sql`
      insert into contacts (
        id,
        name,
        relationship,
        target_frequency_days,
        created_at,
        updated_at
      ) values (
        ${id},
        ${name},
        ${relationship},
        ${targetFrequencyDays},
        ${now},
        ${now}
      )
      returning
        id,
        name,
        relationship,
        target_frequency_days,
        created_at,
        updated_at
    `

    return Response.json(mapContact(createdContacts[0] as ContactRow), {
      status: 201,
    })
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
