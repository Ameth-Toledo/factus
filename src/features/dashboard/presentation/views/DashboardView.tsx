import { AlertCircle, RefreshCw } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel'
import DashboardWelcome from '../components/DashboardWelcome'
import DashboardStats from '../components/DashboardStats'
import RecentInvoices from '../components/RecentInvoices'
import QuickActions from '../components/QuickActions'

export default function DashboardView({ session }: { session: Session }) {
  const { summary, loading, error, refresh, recentInvoices, pendingCount } =
    useDashboardViewModel(session)

  return (
    <div className="space-y-7">
      <DashboardWelcome name={session.user.first_name} />
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-50">
            Resumen de tu negocio
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Lo esencial, siempre a la mano.
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-medium text-neutral-400 transition hover:border-neutral-500/40 hover:text-neutral-300 disabled:cursor-wait disabled:opacity-50"
        >
          <RefreshCw
            className={`size-3.5 ${loading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          {loading ? 'Actualizando' : 'Actualizar'}
        </button>
      </div>
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
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
        <RecentInvoices
          invoices={recentInvoices}
          loading={loading}
          unavailable={!!error && !summary}
        />
        <QuickActions />
      </div>
      <p className="pb-2 text-center text-[11px] text-neutral-400">
        Un espacio para administrar, facturar y seguir creciendo.
      </p>
    </div>
  )
}
