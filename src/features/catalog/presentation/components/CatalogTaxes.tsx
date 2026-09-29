import { Plus, Trash2 } from 'lucide-react'
import type { useCatalogViewModel } from '../viewmodel/useCatalogViewModel'

export default function CatalogTaxes({
  taxes,
  setTaxes,
  kind,
}: Pick<ReturnType<typeof useCatalogViewModel>, 'taxes' | 'setTaxes'> & {
  kind: 'customers' | 'products'
}) {
  return (
    <>
      {kind === 'products' && (
        <>
          <h3 className="mb-4 text-sm font-semibold text-neutral-100">
            Impuestos
          </h3>
          {taxes.map((tax, index) => (
            <div
              className="mb-4 grid items-end gap-4 sm:grid-cols-2"
              key={index}
            >
              <label>
                Tipo de impuesto
                <input
                  required
                  placeholder="01: IVA / 04: consumo"
                  value={tax.code}
                  onChange={(e) =>
                    setTaxes(
                      taxes.map((t, i) =>
                        i === index ? { ...t, code: e.target.value } : t,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Porcentaje del impuesto
                <input
                  required
                  value={tax.rate}
                  onChange={(e) =>
                    setTaxes(
                      taxes.map((t, i) =>
                        i === index ? { ...t, rate: e.target.value } : t,
                      ),
                    )
                  }
                />
              </label>
              <label className="tax-excluded inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 shrink-0 accent-white"
                  checked={tax.is_excluded}
                  onChange={(e) =>
                    setTaxes(
                      taxes.map((t, i) =>
                        i === index
                          ? {
                              ...t,
                              is_excluded: e.target.checked,
                              rate: e.target.checked ? '0.00' : t.rate,
                            }
                          : t,
                      ),
                    )
                  }
                />
                Excluido del impuesto
              </label>
              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-800 hover:text-white"
                disabled={taxes.length === 1}
                onClick={() => setTaxes(taxes.filter((_, i) => i !== index))}
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Quitar impuesto
              </button>
            </div>
          ))}
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-800 hover:text-white"
            disabled={taxes.length >= 20}
            onClick={() =>
              setTaxes([
                ...taxes,
                { code: '04', rate: '0.00', is_excluded: false },
              ])
            }
          >
            <Plus className="size-4" aria-hidden="true" />
            Agregar impuesto
          </button>
        </>
      )}
    </>
  )
}
