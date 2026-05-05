import { getDb } from '../db'
import {
  databaseErrorResponse,
  databaseNotConfiguredResponse,
} from '../db/http'
import { mapContact } from '../db/mappers/contacts'
import { createContact, listContacts } from '../db/repositories/contacts'
import {
  type CreateContactRequest,
  validateCreateContact,
} from '../db/validators/contacts'

export async function GET(_request: Request) {
  const db = getDb()

  if (!db) {
    return databaseNotConfiguredResponse()
  }

  try {
    const contacts = await listContacts(db)

    return Response.json(contacts.map(mapContact))
  } catch (error) {
    return databaseErrorResponse(error)
  }
}

export async function POST(request: Request) {
  const db = getDb()

  if (!db) {
    return databaseNotConfiguredResponse()
  }

  let body: CreateContactRequest

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const validationResult = validateCreateContact(body)

  if ('error' in validationResult) {
    return Response.json({ error: validationResult.error }, { status: 400 })
  }

  try {
    const { name, relationship, targetFrequencyDays } = validationResult.data
    const createdContact = await createContact(db, {
      name,
      relationship,
      targetFrequencyDays,
    })

    return Response.json(mapContact(createdContact), { status: 201 })
  } catch (error) {
    return databaseErrorResponse(error)
  }
}
