import type { Session } from '../../../auth/domain/models/Session'
import type { DashboardSummary } from '../models/DashboardSummary'

export interface DashboardRepository {
  load(session: Session): Promise<DashboardSummary>
}
