import { AlertCircle } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel'
import DashboardWelcome from '../components/DashboardWelcome'
import DashboardStats from '../components/DashboardStats'
import RecentInvoices from '../components/RecentInvoices'

export default function DashboardView({ session }: { session: Session }) {
  const { summary, loading, error, recentInvoices, pendingCount } =
    useDashboardViewModel(session)

  return (
    <div className="space-y-7">
      <DashboardWelcome />
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">No pudimos actualizar el resumen</p>
            <p className="mt-1 break-words">{error}</p>
            {summary && (
              <p className="mt-1 text-xs">
                Se muestran los últimos datos cargados.
              </p>
            )}
          </div>
        </div>
      )}
      <DashboardStats summary={summary} pendingCount={pendingCount} />
      <RecentInvoices
        invoices={recentInvoices}
        loading={loading}
        unavailable={!!error && !summary}
      />
    </div>
  )
}
