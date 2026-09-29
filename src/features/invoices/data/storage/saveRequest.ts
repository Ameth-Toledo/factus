import type { InvoiceInput } from '../../domain/models/InvoiceInput'

export function saveRequest(key: string, payload: InvoiceInput) {
  sessionStorage.setItem(key, JSON.stringify(payload))
}
