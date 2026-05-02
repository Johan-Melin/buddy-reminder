type RelationshipCategory = 'family' | 'friend' | 'colleague' | 'other'

interface Contact {
    id: string
    name: string
    relationship: RelationshipCategory
    createdAt: string
    updatedAt: string
}

export type { Contact }
