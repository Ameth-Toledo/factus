import type { InvoiceInput } from '../../domain/models/InvoiceInput'

export function storedRequest(key: string): InvoiceInput | null {
  try {
    return JSON.parse(
      sessionStorage.getItem(key) || 'null',
    ) as InvoiceInput | null
  } catch {
    return null
  }
}
