import { ReceiptText } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import TableToolbar from '../../../../shared/components/ui/TableToolbar'
import TablePagination from '../../../../shared/components/ui/TablePagination'
import TableState from '../../../../shared/components/ui/TableState'
import InvoiceTableRow from './InvoiceTableRow'
import { useInvoiceHistoryViewModel } from '../viewmodel/useInvoiceHistoryViewModel'

export default function InvoiceHistory({
  session,
  onSelect,
  refreshKey,
}: {
  session: Session
  onSelect: (invoice: Invoice) => void
  refreshKey: number
}) {
  const { rows, offset, loading, error, refresh, previousPage, nextPage } =
    useInvoiceHistoryViewModel({ session, refreshKey })

  return (
    <section
      data-tour="invoice-history"
      aria-label="Historial de facturas"
      className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
    >
      <TableToolbar
        title="Historial de facturas"
        icon={ReceiptText}
        count={rows.length}
        loading={loading}
        onRefresh={refresh}
      />
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Tabla de facturas desplazable"
      >
        <table className="w-full min-w-[780px] text-left text-sm">
          <caption className="sr-only">
            Facturas emitidas, fechas, estados, totales y descargas.
          </caption>
          <thead className="border-y border-neutral-800 bg-white/[0.015] text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
            <tr>
              <th scope="col" className="py-3 pr-4 pl-6">
                Factura
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha
              </th>
              <th scope="col" className="px-5 py-3">
                Estado
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Total
              </th>
              <th scope="col" className="py-3 pr-6 pl-4 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading || !rows.length ? (
              <TableState
                columns={5}
                loading={loading}
                error={error}
                title="No hay facturas en esta página"
                description="Crea una factura para comenzar a registrar tus ventas."
                icon={ReceiptText}
              />
            ) : (
              rows.map((invoice) => (
                <InvoiceTableRow
                  key={invoice.id}
                  invoice={invoice}
                  session={session}
                  onSelect={onSelect}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        offset={offset}
        count={rows.length}
        loading={loading}
        busy={false}
        onPrevious={previousPage}
        onNext={nextPage}
      />
    </section>
  )
}
