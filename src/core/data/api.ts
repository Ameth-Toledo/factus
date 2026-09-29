import type { Session } from '../../features/auth/domain/models/Session'
import { saveSession } from '../../features/auth/data/session/saveSession.ts'
import { ApiError } from '../errors/ApiError.ts'

export async function api<T>(
  path: string,
  session: Session | null,
  method = 'GET',
  body?: unknown,
  acceptError?: (status: number, data: unknown) => boolean,
): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 95000)
  try {
    const response = await fetch(`/api${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    })
    if (response.status === 204) return undefined as T
    const data = await response.json().catch(() => null)
    if (response.status === 401 && session) {
      saveSession(null)
      window.dispatchEvent(new Event('session-expired'))
    }
    if (!response.ok && !acceptError?.(response.status, data))
      throw new ApiError(
        data?.error ||
          data?.message ||
          `La API respondió ${response.status}. Comprueba que el servidor Go esté iniciado.`,
        response.status,
      )
    if (data === null)
      throw new Error(
        'La API no devolvió JSON. Comprueba el servidor Go y el proxy.',
      )
    return data as T
  } catch (error) {
    if (
      error instanceof TypeError ||
      (error instanceof DOMException && error.name === 'AbortError')
    )
      throw new Error(
        'No se recibió respuesta de la API. Si estabas facturando, conserva la referencia y consulta el mismo envío antes de crear otro.',
        { cause: error },
      )
    throw error
  } finally {
    clearTimeout(timer)
  }
}
