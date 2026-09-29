import type { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'

export default function InvoiceHeaderFields({
  draft,
  patch,
  customers,
  ranges,
}: Pick<
  ReturnType<typeof useInvoicesViewModel>,
  'draft' | 'patch' | 'customers' | 'ranges'
>) {
  return (
    <>
      <div className="grid">
        <label>
          Referencia única
          <input
            required
            maxLength={100}
            value={draft.reference_code}
            onChange={(e) => patch('reference_code', e.target.value)}
          />
        </label>
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
          Observación
          <input
            maxLength={250}
            value={draft.observation}
            onChange={(e) => patch('observation', e.target.value)}
          />
        </label>
      </div>
    </>
  )
}
