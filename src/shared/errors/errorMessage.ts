export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
}
