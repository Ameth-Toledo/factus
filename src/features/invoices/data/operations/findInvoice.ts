import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'

export function findInvoice(session: Session, id: string) {
  return api<Invoice>(`/invoices/${id}`, session)
}
