import type { DashboardRepository } from '../domain/interfaces/DashboardRepository'
import { dashboardRepository as httpRepository } from '../data/dashboardRepository'

export const dashboardRepository: DashboardRepository = httpRepository
