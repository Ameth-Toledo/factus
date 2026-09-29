import type { useInvoiceCreationViewModel } from '../viewmodel/useInvoiceCreationViewModel'

export default function InvoiceHeaderFields({
  draft,
  patch,
  customers,
  ranges,
}: Pick<
  ReturnType<typeof useInvoiceCreationViewModel>,
  'draft' | 'patch' | 'customers' | 'ranges'
>) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          Cliente
          <select
            required
            value={draft.customer_id || ''}
            onChange={(e) => patch('customer_id', Number(e.target.value))}
          >
            <option value="">Seleccionar</option>
            {customers.map((c) => (
              <option value={c.id} key={c.id}>
                {c.names || c.company} — {c.identification}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rango de numeración
          <select
            required
            value={draft.numbering_range_id || ''}
            onChange={(e) =>
              patch('numbering_range_id', Number(e.target.value))
            }
          >
            <option value="">Seleccionar</option>
            {ranges.map((r) => (
              <option value={r.id} key={r.id}>
                {r.prefix} / {r.id} — vence {r.end_date}
              </option>
            ))}
          </select>
        </label>
        <label>
          Observación (opcional)
          <input
            placeholder="Agrega una nota para esta venta"
            maxLength={250}
            value={draft.observation}
            onChange={(e) => patch('observation', e.target.value)}
          />
        </label>
        <div className="flex min-w-0 flex-col gap-2 border-t border-neutral-800 pt-4 sm:col-span-2">
          <span className="text-xs font-medium text-neutral-500">
            Referencia única
          </span>
          <span className="font-mono text-xs break-all text-neutral-400">
            {draft.reference_code}
          </span>
        </div>
      </div>
    </>
  )
}
