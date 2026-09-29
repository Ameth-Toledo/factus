import { Search, LoaderCircle } from 'lucide-react'
import type { useInvoiceLookupViewModel } from '../viewmodel/useInvoiceLookupViewModel'

export default function InvoiceLookup({
  consult,
  lookup,
  setLookup,
  lookupBusy,
  lookupError,
}: Pick<
  ReturnType<typeof useInvoiceLookupViewModel>,
  'consult' | 'lookup' | 'setLookup' | 'lookupBusy' | 'lookupError'
>) {
  return (
    <form
      onSubmit={consult}
      role="search"
      aria-label="Buscar factura"
      className="w-full sm:ml-auto sm:w-96"
    >
      <div className="relative">
        {lookupBusy ? (
          <LoaderCircle
            className="pointer-events-none absolute top-3.5 left-4 size-4 animate-spin text-neutral-500"
            aria-hidden="true"
          />
        ) : (
          <Search
            className="pointer-events-none absolute top-3.5 left-4 size-4 text-neutral-500"
            aria-hidden="true"
          />
        )}
        <input
          aria-label="Buscar factura por identificador"
          aria-describedby={lookupError ? 'invoice-search-error' : undefined}
          aria-busy={lookupBusy}
          required
          type="number"
          min="1"
          step="1"
          value={lookup}
          readOnly={lookupBusy}
          onChange={(event) => setLookup(event.target.value)}
          placeholder="Buscar factura por identificador…"
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pr-4 pl-11 text-sm text-neutral-100 outline-none focus:border-neutral-500"
        />
      </div>
      {lookupError && (
        <p
          id="invoice-search-error"
          role="alert"
          className="mt-2 text-sm text-rose-300"
        >
          {lookupError}
        </p>
      )}
    </form>
  )
}
