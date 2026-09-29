import { api } from '../../../../core/data/api'
import { catalogRepository } from '../../../catalog/di/catalogRepository'
import type { Session } from '../../../auth/domain/models/Session'
import type { Range } from '../../domain/models/Range'

export async function loadInvoiceOptions(session: Session) {
  const [cs, ps] = await Promise.all([
    catalogRepository.allCustomers(session),
    catalogRepository.allProducts(session),
  ])
  const rs: Range[] = []
  for (let page = 1; ; page++) {
    const data = await api<{
      data: { data: Range[]; pagination: { last_page: number } }
    }>(`/factus/numbering-ranges?document=21&is_active=1&page=${page}`, session)
    rs.push(
      ...data.data.data.filter(
        (r) => r.is_active && !r.is_expired && r.current <= r.to,
      ),
    )
    if (page >= data.data.pagination.last_page) break
  }
  return { cs, ps, rs }
}
