import type { CatalogRepository } from '../domain/interfaces/CatalogRepository'

import { listCatalog } from './operations/listCatalog.ts'
import { saveCatalog } from './operations/saveCatalog.ts'
import { updateCatalog } from './operations/updateCatalog.ts'
import { deleteCatalog } from './operations/deleteCatalog.ts'
import { allCustomers } from './operations/allCustomers.ts'
import { allProducts } from './operations/allProducts.ts'

export const catalogRepository: CatalogRepository = {
  list: listCatalog,
  save: saveCatalog,
  update: updateCatalog,
  remove: deleteCatalog,
  allCustomers,
  allProducts,
}
