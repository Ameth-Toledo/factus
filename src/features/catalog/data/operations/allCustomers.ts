import { allPages } from '../../../../core/data/allPages.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'

export function allCustomers(session: Session) {
  return allPages<Customer>('/customers', session)
}
