import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import type { InvoiceInput } from '../../domain/models/InvoiceInput'

export function createInvoice(session: Session, payload: InvoiceInput) {
  return api<Invoice>('/invoices', session, 'POST', payload, (status, data) => {
    // Facturas rechazadas son registros consultables, no un éxito fiscal.
    const invoice = data as Partial<Invoice> | null
    return (
      status === 422 &&
      typeof invoice?.id === 'number' &&
      typeof invoice?.status === 'string'
    )
  })
}
