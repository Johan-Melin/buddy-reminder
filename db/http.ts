function databaseNotConfiguredResponse() {
  return Response.json(
    { error: 'DATABASE_URL is not configured' },
    { status: 500 },
  )
}

function databaseErrorResponse(error: unknown) {
  return Response.json(
    {
      error: error instanceof Error ? error.message : 'Unknown database error',
    },
    { status: 500 },
  )
}

export { databaseErrorResponse, databaseNotConfiguredResponse }
