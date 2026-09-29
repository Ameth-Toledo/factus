import type { Session } from '../../../auth/domain/models/Session'
import type { CatalogRepository } from '../../../catalog/domain/interfaces/CatalogRepository'
import type { InvoiceRepository } from '../../../invoices/domain/interfaces/InvoiceRepository'
import type { DashboardSummary } from '../../domain/models/DashboardSummary'

export async function loadDashboard(
  session: Session,
  catalogs: Pick<CatalogRepository, 'allCustomers' | 'allProducts'>,
  invoices: Pick<InvoiceRepository, 'list'>,
): Promise<DashboardSummary> {
  const [customers, products, records] = await Promise.all([
    catalogs.allCustomers(session),
    catalogs.allProducts(session),
    invoices.list(session, 0),
  ])

  return {
    customerCount: customers.length,
    productCount: products.length,
    invoices: records,
  }
}
