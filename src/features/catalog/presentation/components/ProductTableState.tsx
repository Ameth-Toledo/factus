import { LoaderCircle, PackageOpen, Plus, TriangleAlert } from 'lucide-react'

export default function ProductTableState({
  loading,
  hasError,
  onCreate,
  busy,
}: {
  loading: boolean
  hasError: boolean
  busy: boolean
  onCreate: () => void
}) {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-16 text-center">
        {loading ? (
          <div
            role="status"
            className="flex flex-col items-center gap-3 text-neutral-400"
          >
            <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
            <span className="text-sm">Cargando productos…</span>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <TriangleAlert className="size-6" aria-hidden="true" />
            <span className="text-sm">
              No se pudo cargar el catálogo. Actualiza la lista para reintentar.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
              <PackageOpen
                className="size-6 text-neutral-500"
                aria-hidden="true"
              />
            </span>
            <p className="mt-4 font-medium text-neutral-200">
              No hay productos en esta página
            </p>
            <p className="mt-1.5 text-sm text-neutral-500">
              Agrega un producto para empezar a organizar tu catálogo.
            </p>
            <button
              type="button"
              onClick={onCreate}
              disabled={busy}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              Agregar producto
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
