import { useEffect, useState } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { DashboardSummary } from '../../domain/models/DashboardSummary'
import type { DashboardRepository } from '../../domain/interfaces/DashboardRepository'
import { dashboardRepository } from '../../di/dashboardRepository'
import { errorMessage } from '../../../../shared/errors/errorMessage'

export function useDashboardViewModel(
  session: Session,
  repository: DashboardRepository = dashboardRepository,
) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    let active = true

    repository
      .load(session)
      .then((data) => {
        if (active) {
          setSummary(data)
          setError('')
        }
      })
      .catch((cause) => {
        if (active) setError(errorMessage(cause))
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [session, repository, revision])

  function refresh() {
    setLoading(true)
    setRevision((value) => value + 1)
  }

  const recentInvoices = [...(summary?.invoices ?? [])]
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .slice(0, 5)
  const pendingCount =
    summary?.invoices.filter((invoice) =>
      ['pending', 'unknown', 'not_validated'].includes(invoice.status),
    ).length ?? 0

  return { summary, loading, error, refresh, recentInvoices, pendingCount }
}
