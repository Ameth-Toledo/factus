import { ReceiptText, Eye } from 'lucide-react'
import type { Invoice } from '../../domain/models/Invoice'
import type { Session } from '../../../auth/domain/models/Session'
import InvoiceStatusBadge from './InvoiceStatusBadge'
import InvoiceDownloads from './InvoiceDownloads'

export default function InvoiceTableRow({
  invoice,
  session,
  onSelect,
}: {
  invoice: Invoice
  session: Session
  onSelect: (invoice: Invoice) => void
}) {
  return (
    <tr className="group border-b border-neutral-800/70 transition-colors last:border-b-0 hover:bg-white/[0.025]">
      <td className="py-5 pr-4 pl-6">
        <div className="flex items-center gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400">
            <ReceiptText className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span className="block font-medium text-neutral-100">
              {invoice.number || `Factura #${invoice.id}`}
            </span>
            <span
              className="mt-1 block max-w-52 truncate text-xs text-neutral-500"
              title={invoice.reference_code}
            >
              {invoice.reference_code}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-5 text-xs whitespace-nowrap text-neutral-400">
        {new Date(invoice.created_at).toLocaleString('es')}
      </td>
      <td className="px-5 py-5">
        <InvoiceStatusBadge status={invoice.status} />
      </td>
      <td className="px-5 py-5 text-right font-medium whitespace-nowrap text-neutral-200 tabular-nums">
        {invoice.factus_response?.data?.totals?.total || '—'}
      </td>
      <td className="py-5 pr-6 pl-4">
        <div className="flex items-start justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onSelect(invoice)}
            aria-label={`Ver detalle de ${invoice.number || `factura ${invoice.id}`}`}
            title="Ver detalle"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <Eye className="size-4" aria-hidden="true" />
          </button>
          <InvoiceDownloads invoice={invoice} session={session} compact />
        </div>
      </td>
    </tr>
  )
}
