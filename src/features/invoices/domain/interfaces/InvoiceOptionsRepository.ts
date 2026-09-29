import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../../catalog/domain/models/Customer'
import type { Product } from '../../../catalog/domain/models/Product'
import type { Range } from '../models/Range'

export interface InvoiceOptionsRepository {
  load(
    session: Session,
  ): Promise<{ cs: Customer[]; ps: Product[]; rs: Range[] }>
}
