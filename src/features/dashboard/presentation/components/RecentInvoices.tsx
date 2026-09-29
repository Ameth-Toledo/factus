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
    <section className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-50">
            Últimos movimientos
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Las últimas 5 facturas de la página consultada
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
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0A]">
        {loading ? (
          <p
            role="status"
            className="px-6 py-16 text-center text-sm text-neutral-400"
          >
            Cargando tus facturas…
          </p>
        ) : unavailable ? (
          <p className="px-6 py-16 text-center text-sm text-neutral-400">
            No pudimos cargar la actividad. Vuelve a entrar a Inicio para
            intentarlo de nuevo.
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
              Aún no hay facturas
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Cuando crees tu primera factura, aparecerá en este espacio.
            </p>
            <Link
              to="/sales/new"
              className="mt-5 inline-block text-sm font-semibold text-neutral-300 hover:text-neutral-200"
            >
              Realizar mi primera venta →
            </Link>
          </div>
        ) : (
          <div
            className="overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="Últimos movimientos desplazable"
          >
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead className="border-b border-neutral-800 bg-white/[0.015] text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
                <tr>
                  <th scope="col" className="py-3 pr-4 pl-6">
                    Factura
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Estado
                  </th>
                  <th scope="col" className="py-3 pr-6 pl-4 text-right">
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
                    <td className="max-w-52 py-5 pr-4 pl-6">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="font-medium text-neutral-100 underline-offset-4 hover:underline"
                      >
                        {invoice.number || `Factura #${invoice.id}`}
                      </Link>
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
                    <td className="py-5 pr-6 pl-4 text-right text-sm font-medium whitespace-nowrap text-neutral-200">
                      {invoice.factus_response?.data?.totals?.total || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
