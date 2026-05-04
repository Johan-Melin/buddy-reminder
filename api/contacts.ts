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