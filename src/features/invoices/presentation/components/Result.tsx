import { ArrowUpRight, ReceiptText } from 'lucide-react'
import { safeLink } from '../../../../shared/browser/safeLink'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import InvoiceDownloads from './InvoiceDownloads'
import InvoiceStatusBadge from './InvoiceStatusBadge'

export default function Result({
  invoice,
  session,
}: {
  invoice: Invoice
  session: Session
}) {
  const url = safeLink(invoice.factus_response?.data?.links?.public_url)

  return (
    <article className="space-y-6 overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-6">
      <div className="-mx-6 -mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <ReceiptText className="size-5 text-neutral-500" aria-hidden="true" />
          <h3 className="font-semibold text-neutral-100">
            {invoice.number || `Factura #${invoice.id}`}
          </h3>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </div>
      {invoice.status !== 'validated' && (
        <p className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
          {invoice.failure ||
            'No se ha confirmado la validación. Revisa el resultado antes de emitir otra factura.'}
        </p>
      )}
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-neutral-500">Referencia local</dt>
          <dd className="mt-1 break-all text-neutral-200">
            {invoice.reference_code}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">Referencia en Factus</dt>
          <dd className="mt-1 break-all text-neutral-200">
            {invoice.factus_reference || '—'}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">Número</dt>
          <dd className="mt-1 text-neutral-200">
            {invoice.number || 'Pendiente'}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-neutral-500">CUFE</dt>
          <dd className="mt-1 break-all font-mono text-xs leading-6 text-neutral-400">
            {invoice.cufe || 'Pendiente'}
          </dd>
        </div>
      </dl>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
        >
          Abrir factura en Factus
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
      {invoice.factus_response?.data?.totals && (
        <dl className="grid grid-cols-2 gap-4 border-y border-neutral-800 py-4">
          {Object.entries(invoice.factus_response.data.totals).map(
            ([key, value]) => (
              <div key={key}>
                <dt className="text-xs text-neutral-500">{key}</dt>
                <dd className="mt-1 font-medium text-neutral-100 tabular-nums">
                  {value}
                </dd>
              </div>
            ),
          )}
        </dl>
      )}
      <InvoiceDownloads invoice={invoice} session={session} />
    </article>
  )
}
