import { FileDown, FileCode2, LoaderCircle, LockKeyhole } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import { useInvoiceDownloadsViewModel } from '../viewmodel/useInvoiceDownloadsViewModel'

export default function InvoiceDownloads({
  invoice,
  session,
  compact = false,
}: {
  invoice: Invoice
  session: Session
  compact?: boolean
}) {
  const { busy, error, download } = useInvoiceDownloadsViewModel({
    invoice,
    session,
  })

  if (
    !invoice.is_validated ||
    invoice.status !== 'validated' ||
    !invoice.number
  ) {
    return compact ? (
      <span
        title="Archivos disponibles al validar"
        className="relative inline-flex size-9 items-center justify-center text-neutral-600"
      >
        <LockKeyhole className="size-3.5" aria-hidden="true" />
        <span className="sr-only">Archivos disponibles al validar.</span>
      </span>
    ) : (
      <p className="text-xs text-neutral-500">
        Archivos disponibles al validar.
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          title="Descargar PDF"
          aria-label={`Descargar PDF de ${invoice.number}`}
          disabled={!!busy}
          onClick={() => void download('pdf')}
          className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-neutral-400 transition hover:bg-neutral-800 hover:text-white disabled:cursor-wait disabled:opacity-40 ${compact ? 'size-9' : 'border border-neutral-800 px-3 py-2 text-xs'}`}
        >
          {busy === 'pdf' ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <FileDown className="size-4" aria-hidden="true" />
          )}
          {!compact && (busy === 'pdf' ? 'Descargando…' : 'Descargar PDF')}
        </button>
        <button
          type="button"
          title="Descargar XML"
          aria-label={`Descargar XML de ${invoice.number}`}
          disabled={!!busy}
          onClick={() => void download('xml')}
          className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-neutral-400 transition hover:bg-neutral-800 hover:text-white disabled:cursor-wait disabled:opacity-40 ${compact ? 'size-9' : 'border border-neutral-800 px-3 py-2 text-xs'}`}
        >
          {busy === 'xml' ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <FileCode2 className="size-4" aria-hidden="true" />
          )}
          {!compact && (busy === 'xml' ? 'Descargando…' : 'Descargar XML')}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 max-w-xs text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}
