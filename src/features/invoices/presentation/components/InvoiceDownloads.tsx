import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import { useInvoiceDownloadsViewModel } from '../viewmodel/useInvoiceDownloadsViewModel'

export default function InvoiceDownloads({
  invoice,
  session,
}: {
  invoice: Invoice
  session: Session
}) {
  const { busy, error, download } = useInvoiceDownloadsViewModel({
    invoice,
    session,
  })
  if (
    !invoice.is_validated ||
    invoice.status !== 'validated' ||
    !invoice.number
  )
    return <span>Archivos disponibles al validar.</span>
  return (
    <div>
      <button
        type="button"
        className="secondary"
        disabled={!!busy}
        onClick={() => void download('pdf')}
      >
        {busy === 'pdf' ? 'Descargando…' : 'Descargar PDF'}
      </button>
      <button
        type="button"
        className="secondary"
        disabled={!!busy}
        onClick={() => void download('xml')}
      >
        {busy === 'xml' ? 'Descargando…' : 'Descargar XML'}
      </button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </div>
  )
}
