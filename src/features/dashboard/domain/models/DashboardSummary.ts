import type { Invoice } from '../../../invoices/domain/models/Invoice'

export interface DashboardSummary {
  customerCount: number
  productCount: number
  invoices: Invoice[]
}
