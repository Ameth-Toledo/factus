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
          <h4>Impuestos</h4>
          {taxes.map((tax, index) => (
            <div className="row" key={index}>
              <label>
                Código (01 IVA / 04 INC)
                <input
                  required
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
                Tasa %
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
              <label className="check">
                <input
                  type="checkbox"
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
                Excluido
              </label>
              <button
                type="button"
                className="secondary"
                disabled={taxes.length === 1}
                onClick={() => setTaxes(taxes.filter((_, i) => i !== index))}
              >
                Quitar impuesto
              </button>
            </div>
          ))}
          <button
            type="button"
            className="secondary"
            disabled={taxes.length >= 20}
            onClick={() =>
              setTaxes([
                ...taxes,
                { code: '04', rate: '0.00', is_excluded: false },
              ])
            }
          >
            Agregar impuesto
          </button>
        </>
      )}
    </>
  )
}
