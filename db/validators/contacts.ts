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

function validateCreateContact(body: CreateContactRequest) {
  const name = body.name?.trim()
  const relationship = body.relationship?.trim()
  const targetFrequencyDays = body.targetFrequencyDays

  if (!name) {
    return { error: 'Name is required' as const }
  }

  if (!relationship || !validRelationships.has(relationship)) {
    return { error: 'Relationship is invalid' as const }
  }

  if (
    typeof targetFrequencyDays !== 'number' ||
    !Number.isInteger(targetFrequencyDays) ||
    targetFrequencyDays < 1
  ) {
    return { error: 'Preferred frequency must be a positive integer' as const }
  }

  return {
    data: {
      name,
      relationship,
      targetFrequencyDays,
    },
  }
}

export type { CreateContactRequest }
export { validateCreateContact }
