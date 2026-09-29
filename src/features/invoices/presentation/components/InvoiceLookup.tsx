import type { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'

export default function InvoiceLookup({
  consult,
  lookup,
  setLookup,
  lookupBusy,
  lookupError,
}: Pick<
  ReturnType<typeof useInvoicesViewModel>,
  'consult' | 'lookup' | 'setLookup' | 'lookupBusy' | 'lookupError'
>) {
  return (
    <>
      <h2 id="invoice-detail">Consultar factura guardada</h2>
      <form onSubmit={consult}>
        <label>
          ID de factura
          <input
            required
            type="number"
            min="1"
            step="1"
            value={lookup}
            onChange={(e) => setLookup(e.target.value)}
          />
        </label>
        <button disabled={lookupBusy}>
          {lookupBusy ? 'Consultando…' : 'Consultar por ID'}
        </button>
      </form>
      {lookupError && (
        <p role="alert" className="error">
          {lookupError}
        </p>
      )}
    </>
  )
}
