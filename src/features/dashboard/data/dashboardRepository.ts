import { catalogRepository } from '../../catalog/di/catalogRepository'
import { invoiceRepository } from '../../invoices/di/invoiceRepository'
import type { DashboardRepository } from '../domain/interfaces/DashboardRepository'
import { loadDashboard } from './operations/loadDashboard'

export const dashboardRepository: DashboardRepository = {
  load: (session) =>
    loadDashboard(session, catalogRepository, invoiceRepository),
}
