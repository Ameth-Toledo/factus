import { ApiError } from '../../../../core/errors/ApiError'
import { saveSession } from '../../../auth/data/session/saveSession.ts'
import type { Session } from '../../../auth/domain/models/Session'

export async function downloadInvoice(
  id: number,
  format: 'pdf' | 'xml',
  session: Session,
): Promise<Blob> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 75000)
  try {
    const response = await fetch(`/api/invoices/${id}/download/${format}`, {
      headers: { Authorization: `Bearer ${session.token}` },
      signal: controller.signal,
    })
    if (response.status === 401) {
      saveSession(null)
      window.dispatchEvent(new Event('session-expired'))
    }
    if (!response.ok) {
      const data = await response.json().catch(() => null)
      throw new ApiError(
        data?.error || `No se pudo descargar el archivo (${response.status}).`,
        response.status,
      )
    }
    const type = response.headers.get('Content-Type') || ''
    if (
      !type.startsWith(format === 'pdf' ? 'application/pdf' : 'application/xml')
    )
      throw new Error('El servidor no devolvió el formato esperado.')
    return await response.blob()
  } catch (error) {
    if (
      error instanceof TypeError ||
      (error instanceof DOMException && error.name === 'AbortError')
    )
      throw new Error(
        'No se pudo completar la descarga. Inténtalo nuevamente.',
        { cause: error },
      )
    throw error
  } finally {
    clearTimeout(timer)
  }
}
