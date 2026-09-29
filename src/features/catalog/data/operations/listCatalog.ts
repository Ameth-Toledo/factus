import { api } from '../../../../core/data/api.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'
import type { Product } from '../../domain/models/Product'
import type { CatalogKind } from '../../domain/models/CatalogKind'

export function listCatalog(
  kind: CatalogKind,
  session: Session,
  offset: number,
) {
  return api<(Customer | Product)[]>(
    `/${kind}?limit=20&offset=${offset}`,
    session,
  )
}
