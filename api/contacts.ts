import { neon } from '@neondatabase/serverless'

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 },
    )
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    const result = await sql`select 'Neon connection working' as message`

    return Response.json(result[0])
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
