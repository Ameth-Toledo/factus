import { RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function TableToolbar({
  title,
  icon: Icon,
  count,
  loading,
  busy = false,
  onRefresh,
}: {
  title: string
  icon: LucideIcon
  count: number
  loading: boolean
  busy?: boolean
  onRefresh: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-neutral-500" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-neutral-200">{title}</h2>
        <span
          aria-label="Registros en esta página"
          className="rounded-md bg-neutral-800/80 px-2 py-0.5 text-[11px] font-medium text-neutral-400"
        >
          {loading ? '…' : count}
        </span>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={busy || loading}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RefreshCw
          className={`size-3.5 ${loading ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        Actualizar
      </button>
    </div>
  )
}
