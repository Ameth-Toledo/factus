import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import type { Session } from '../../../auth/domain/models/Session'
import PageHeading from '../../../../shared/components/ui/PageHeading'
import Result from '../components/Result'
import { useInvoiceDetailViewModel } from '../viewmodel/useInvoiceDetailViewModel'

export default function InvoiceDetailView({ session }: { session: Session }) {
  const { id = '' } = useParams()
  const { invoice, loading, error } = useInvoiceDetailViewModel(session, id)

  return (
    <section>
      <PageHeading
        title="Detalle de factura"
        description="Consulta el estado, los datos y los documentos de tu factura."
        action={
          <Link
            to="/invoices"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-4 py-3 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver a facturas
          </Link>
        }
      />
      {loading && (
        <p role="status" className="text-sm text-neutral-400">
          Cargando factura…
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-sm text-rose-300"
        >
          {error}
        </p>
      )}
      {invoice && <Result invoice={invoice} session={session} />}
    </section>
  )
}
