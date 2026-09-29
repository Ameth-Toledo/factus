import { LoaderCircle, TriangleAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export default function TableState({
  columns,
  loading,
  error,
  title,
  description,
  icon: Icon,
  action,
}: {
  columns: number
  loading: boolean
  error?: string
  title: string
  description: string
  icon: LucideIcon
  action?: ReactNode
}) {
  return (
    <tr>
      <td colSpan={columns} className="px-6 py-16 text-center">
        {loading ? (
          <div
            role="status"
            className="flex flex-col items-center gap-3 text-neutral-400"
          >
            <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
            <span className="text-sm">Cargando registros…</span>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-3 text-neutral-400"
          >
            <TriangleAlert className="size-6" aria-hidden="true" />
            <p className="max-w-md text-sm">{error}</p>
            <p className="text-xs text-neutral-500">
              Actualiza la lista para reintentar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
              <Icon className="size-6 text-neutral-500" aria-hidden="true" />
            </span>
            <p className="mt-4 font-medium text-neutral-200">{title}</p>
            <p className="mt-1.5 max-w-md text-sm text-neutral-500">
              {description}
            </p>
            {action && <div className="mt-5">{action}</div>}
          </div>
        )}
      </td>
    </tr>
  )
}
