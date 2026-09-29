import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../models/Invoice'
import type { InvoiceInput } from '../models/InvoiceInput'

export interface InvoiceRepository {
  save(session: Session, payload: InvoiceInput): Promise<Invoice>
  find(session: Session, id: string): Promise<Invoice>
  list(session: Session, offset: number): Promise<Invoice[]>
}
