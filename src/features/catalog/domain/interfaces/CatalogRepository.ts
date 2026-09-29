import type { Session } from '../../../auth/domain/models/Session'
import type { CatalogKind } from '../models/CatalogKind'
import type { Customer } from '../models/Customer'
import type { Product } from '../models/Product'

export interface CatalogRepository {
  list(
    kind: CatalogKind,
    session: Session,
    offset: number,
  ): Promise<(Customer | Product)[]>
  save(
    kind: CatalogKind,
    session: Session,
    payload: Record<string, unknown>,
  ): Promise<unknown>
  update(
    kind: CatalogKind,
    session: Session,
    id: number,
    payload: Record<string, unknown>,
  ): Promise<unknown>
  remove(kind: CatalogKind, session: Session, id: number): Promise<unknown>
  allCustomers(session: Session): Promise<Customer[]>
  allProducts(session: Session): Promise<Product[]>
}
