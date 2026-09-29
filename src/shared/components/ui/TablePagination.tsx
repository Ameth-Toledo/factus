import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TablePagination({
  offset,
  count,
  loading,
  busy,
  onPrevious,
  onNext,
}: {
  offset: number
  count: number
  loading: boolean
  busy: boolean
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 px-6 py-4">
      <span className="text-xs text-neutral-500">
        {loading ? (
          'Actualizando registros…'
        ) : count ? (
          <>
            Mostrando{' '}
            <span className="font-medium text-neutral-300">
              {offset + 1}–{offset + count}
            </span>
          </>
        ) : (
          'Sin registros en esta página'
        )}
      </span>
      <div className="flex items-center gap-3">
        <span className="mr-1 text-xs text-neutral-500">
          Página{' '}
          <span className="font-medium text-neutral-300">
            {offset / 20 + 1}
          </span>
        </span>
        <button
          type="button"
          aria-label="Página anterior"
          title="Página anterior"
          disabled={offset === 0 || loading || busy}
          onClick={onPrevious}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Página siguiente"
          title="Página siguiente"
          disabled={count < 20 || loading || busy}
          onClick={onNext}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
