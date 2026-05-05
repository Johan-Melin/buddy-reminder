import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const contactsTable = pgTable('contacts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  relationship: text('relationship').notNull(),
  targetFrequencyDays: integer('target_frequency_days').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const contactEventsTable = pgTable('contact_events', {
  id: text('id').primaryKey(),
  contactId: text('contact_id')
    .notNull()
    .references(() => contactsTable.id, { onDelete: 'cascade' }),
  occurredAt: timestamp('date', { withTimezone: true }).notNull(),
  method: text('method').notNull(),
})
