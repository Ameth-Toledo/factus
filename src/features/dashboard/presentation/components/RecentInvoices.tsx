import { ArrowRight, ReceiptText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Invoice } from '../../../invoices/domain/models/Invoice'
import InvoiceStatusBadge from '../../../invoices/presentation/components/InvoiceStatusBadge'

export default function RecentInvoices({
  invoices,
  loading,
  unavailable,
}: {
  invoices: Invoice[]
  loading: boolean
  unavailable: boolean
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-6 py-5">
        <div>
          <h2 className="font-semibold text-neutral-50">
            Actividad de facturación
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            5 más recientes de los registros consultados
          </p>
        </div>
        <Link
          to="/invoices"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-neutral-200"
        >
          Ir a facturas
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      {loading ? (
        <p
          role="status"
          className="px-6 py-16 text-center text-sm text-neutral-400"
        >
          Cargando tus facturas…
        </p>
      ) : unavailable ? (
        <p className="px-6 py-16 text-center text-sm text-neutral-400">
          La actividad no está disponible. Intenta actualizar el resumen.
        </p>
      ) : !invoices.length ? (
        <div className="px-6 py-12 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-neutral-800">
            <ReceiptText
              className="size-6 text-neutral-400"
              aria-hidden="true"
            />
          </span>
          <h3 className="mt-4 text-sm font-semibold text-neutral-200">
            Aquí comienza tu historia
          </h3>
          <p className="mt-2 text-xs text-neutral-400">
            Cuando crees tu primera factura, aparecerá en este espacio.
          </p>
          <Link
            to="/invoices"
            className="mt-5 inline-block text-sm font-semibold text-neutral-300 hover:text-neutral-200"
          >
            Crear mi primera factura →
          </Link>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Actividad de facturación desplazable"
        >
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead className="border-y border-neutral-800 bg-white/[0.015] text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Factura
                </th>
                <th scope="col" className="px-4 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-4 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition-colors hover:bg-white/[0.025]"
                >
                  <td className="max-w-52 px-6 py-5">
                    <p className="font-medium text-neutral-100">
                      {invoice.number || `Factura #${invoice.id}`}
                    </p>
                    <p
                      className="mt-1 truncate text-xs text-neutral-400"
                      title={invoice.reference_code}
                    >
                      {invoice.reference_code}
                    </p>
                  </td>
                  <td className="px-4 py-5 text-xs whitespace-nowrap text-neutral-400">
                    {invoice.created_at
                      ? new Date(invoice.created_at).toLocaleDateString('es')
                      : '—'}
                  </td>
                  <td className="px-4 py-5">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-5 text-right text-sm font-medium whitespace-nowrap text-neutral-200">
                    {invoice.factus_response?.data?.totals?.total || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
