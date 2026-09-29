import { allPages } from '../../../../core/data/allPages.ts'
import type { Session } from '../../../auth/domain/models/Session'
import type { Product } from '../../domain/models/Product'

export function allProducts(session: Session) {
  return allPages<Product>('/products', session)
}
