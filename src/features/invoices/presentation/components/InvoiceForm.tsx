import type { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'
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
  ReturnType<typeof useInvoicesViewModel>,
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
      <form onSubmit={send}>
        <fieldset disabled={busy || !!submitted || loading || !!loadError}>
          <InvoiceHeaderFields
            draft={draft}
            patch={patch}
            customers={customers}
            ranges={ranges}
          />
          <InvoiceItems draft={draft} patch={patch} products={products} />
          <InvoicePayments
            draft={draft}
            patch={patch}
            calculated={calculated}
          />
          <label>
            Ajuste de redondeo (±500.00)
            <input
              value={draft.cash_rounding_amount}
              onChange={(e) => patch('cash_rounding_amount', e.target.value)}
            />
          </label>
        </fieldset>
        <p>
          <strong>
            Total estimado con impuestos y ajuste: {calculated || '—'}
          </strong>
        </p>
        {calculationError && !loading && <p>{calculationError}</p>}
        <button
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
            className="secondary"
            disabled={busy}
            onClick={newInvoice}
          >
            Nueva factura
          </button>
        )}
      </form>
    </>
  )
}
