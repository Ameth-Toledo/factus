import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'
import { useCatalogPageViewModel } from './useCatalogPageViewModel'

export function useCustomersViewModel(session: Session) {
  const catalog = useCatalogPageViewModel('customers', session)
  const customers = catalog.rows.filter(
    (row): row is Customer => 'identification' in row,
  )

  return { ...catalog, customers }
}
