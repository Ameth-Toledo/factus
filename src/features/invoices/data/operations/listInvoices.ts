import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'

export function listInvoices(session: Session, offset: number) {
  return api<Invoice[]>(`/invoices?limit=20&offset=${offset}`, session)
}
