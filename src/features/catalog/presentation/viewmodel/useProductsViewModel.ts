import type { Session } from '../../../auth/domain/models/Session'
import type { Product } from '../../domain/models/Product'
import { useCatalogPageViewModel } from './useCatalogPageViewModel'

export function useProductsViewModel(session: Session) {
  const catalog = useCatalogPageViewModel('products', session)
  const products = catalog.rows.filter(
    (row): row is Product => 'code_reference' in row,
  )
  return { ...catalog, products, submitProduct: catalog.submitForm }
}
