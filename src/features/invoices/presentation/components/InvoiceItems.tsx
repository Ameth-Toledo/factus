import type { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'

export default function InvoiceItems({
  draft,
  patch,
  products,
}: Pick<
  ReturnType<typeof useInvoicesViewModel>,
  'draft' | 'patch' | 'products'
>) {
  return (
    <>
      <h3>Productos</h3>
      {draft.items.map((item, index) => (
        <div className="row" key={index}>
          <label>
            Producto
            <select
              required
              value={item.product_id || ''}
              onChange={(e) =>
                patch(
                  'items',
                  draft.items.map((x, i) =>
                    i === index
                      ? { ...x, product_id: Number(e.target.value) }
                      : x,
                  ),
                )
              }
            >
              <option value="">Seleccionar</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.price} sin impuestos
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad
            <input
              required
              inputMode="decimal"
              value={item.quantity}
              onChange={(e) =>
                patch(
                  'items',
                  draft.items.map((x, i) =>
                    i === index ? { ...x, quantity: e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          <label>
            Descuento %
            <input
              required
              inputMode="decimal"
              value={item.discount_rate}
              onChange={(e) =>
                patch(
                  'items',
                  draft.items.map((x, i) =>
                    i === index ? { ...x, discount_rate: e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          <button
            type="button"
            className="secondary"
            disabled={draft.items.length === 1}
            onClick={() =>
              patch(
                'items',
                draft.items.filter((_, i) => i !== index),
              )
            }
          >
            Quitar producto
          </button>
        </div>
      ))}
      <button
        type="button"
        className="secondary"
        disabled={draft.items.length >= 100}
        onClick={() =>
          patch('items', [
            ...draft.items,
            { product_id: 0, quantity: '1.00', discount_rate: '0.00' },
          ])
        }
      >
        Agregar producto
      </button>
    </>
  )
}
