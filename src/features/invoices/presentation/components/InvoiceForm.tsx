import type { useInvoiceCreationViewModel } from '../viewmodel/useInvoiceCreationViewModel'
import InvoiceHeaderFields from './InvoiceHeaderFields'
import InvoiceItems from './InvoiceItems'
import InvoicePayments from './InvoicePayments'

export default function InvoiceForm({
  send,
  busy,
  submitted,
  loading,
  loadError,
  draft,
  patch,
  customers,
  ranges,
  products,
  calculated,
  calculationError,
  result,
  newInvoice,
}: Pick<
  ReturnType<typeof useInvoiceCreationViewModel>,
  | 'send'
  | 'busy'
  | 'submitted'
  | 'loading'
  | 'loadError'
  | 'draft'
  | 'patch'
  | 'customers'
  | 'ranges'
  | 'products'
  | 'calculated'
  | 'calculationError'
  | 'result'
  | 'newInvoice'
>) {
  return (
    <>
      <form
        onSubmit={send}
        className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px] [&_label]:flex [&_label]:min-w-0 [&_label]:flex-col [&_label]:gap-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-neutral-400 [&_input]:min-w-0 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-neutral-800 [&_input]:bg-black [&_input]:px-3 [&_input]:py-3 [&_input]:text-sm [&_input]:text-neutral-100 [&_input]:outline-none [&_input:focus]:border-neutral-500 [&_select]:min-w-0 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-neutral-800 [&_select]:bg-black [&_select]:px-3 [&_select]:py-3 [&_select]:text-sm [&_select]:text-neutral-100 [&_select]:outline-none [&_select:focus]:border-neutral-500 [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40"
      >
        <fieldset
          className="min-w-0 space-y-6 disabled:opacity-60"
          disabled={busy || !!submitted || loading || !!loadError}
        >
          <div className="rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-5 sm:p-6">
            <h2 className="mb-5 text-sm font-semibold text-neutral-100">
              Cliente y datos de venta
            </h2>
            <InvoiceHeaderFields
              draft={draft}
              patch={patch}
              customers={customers}
              ranges={ranges}
            />
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-5 sm:p-6">
            <InvoiceItems draft={draft} patch={patch} products={products} />
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-5 sm:p-6">
            <InvoicePayments
              draft={draft}
              patch={patch}
              calculated={calculated}
            />
          </div>
        </fieldset>
        <aside className="space-y-5 rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-6 xl:sticky xl:top-8">
          <h2 className="text-sm font-semibold text-neutral-100">
            Resumen de venta
          </h2>
          <div className="flex justify-between border-b border-neutral-800 pb-4 text-xs text-neutral-400">
            <span>Productos agregados</span>
            <span className="text-neutral-100">
              {draft.items.filter((item) => item.product_id).length}
            </span>
          </div>
          <fieldset disabled={busy || !!submitted || loading || !!loadError}>
            <label>
              Ajuste de redondeo
              <input
                inputMode="decimal"
                value={draft.cash_rounding_amount}
                onChange={(e) => patch('cash_rounding_amount', e.target.value)}
              />
            </label>
          </fieldset>
          <div className="border-t border-neutral-800 pt-5">
            <p className="text-xs text-neutral-400">Total estimado</p>
            <p className="mt-2 break-all text-3xl font-semibold tracking-tight text-white tabular-nums">
              {calculated || '—'}
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Incluye impuestos y ajuste de redondeo.
            </p>
          </div>
          {calculationError && !loading && (
            <p className="text-xs leading-5 text-amber-300">
              {calculationError}
            </p>
          )}
          <button
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            disabled={
              busy ||
              (!submitted &&
                (loading ||
                  !!loadError ||
                  !!calculationError ||
                  !customers.length ||
                  !ranges.length))
            }
          >
            {busy
              ? 'Esperando validación…'
              : submitted
                ? 'Consultar mismo envío'
                : 'Crear y validar factura'}
          </button>
          {result && ['validated', 'rejected'].includes(result.status) && (
            <button
              type="button"
              className="w-full rounded-xl border border-neutral-700 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-900"
              disabled={busy}
              onClick={newInvoice}
            >
              Nueva factura
            </button>
          )}
        </aside>
      </form>
    </>
  )
}
