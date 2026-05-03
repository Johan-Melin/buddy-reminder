export type RelationshipCategory = 'family' | 'friend' | 'colleague' | 'other'
export type ContactMethod = "phone" | "message" | "meeting" | "other"

export interface Contact {
    id: string
    name: string
    relationship: RelationshipCategory
    targetFrequencyDays?: number
    createdAt: string
    updatedAt: string
    contactHistory: ContactEvent[]
}

export interface ContactEvent {
    id: string
    date: string
    method: ContactMethod
}
