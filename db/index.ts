import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

declare const process: {
  env: Record<string, string | undefined>
}

function getDb() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  const sql = neon(process.env.DATABASE_URL)

  return drizzle({ client: sql, schema })
}

export { getDb }
