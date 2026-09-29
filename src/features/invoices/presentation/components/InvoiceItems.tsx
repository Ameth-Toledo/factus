import { Plus, Trash2 } from 'lucide-react'
import type { useInvoiceCreationViewModel } from '../viewmodel/useInvoiceCreationViewModel'

export default function InvoiceItems({
  draft,
  patch,
  products,
}: Pick<
  ReturnType<typeof useInvoiceCreationViewModel>,
  'draft' | 'patch' | 'products'
>) {
  return (
    <>
      <h2 className="mb-5 text-sm font-semibold text-neutral-100">Productos</h2>
      {draft.items.map((item, index) => (
        <div
          className="mb-4 grid items-end gap-3 rounded-xl border border-neutral-800/70 bg-black/30 p-4 sm:grid-cols-[minmax(0,1fr)_90px_100px_36px]"
          key={index}
        >
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
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-3 py-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
            disabled={draft.items.length === 1}
            onClick={() =>
              patch(
                'items',
                draft.items.filter((_, i) => i !== index),
              )
            }
          >
            <Trash2 className="size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">Quitar producto</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-3 py-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
        disabled={draft.items.length >= 100}
        onClick={() =>
          patch('items', [
            ...draft.items,
            { product_id: 0, quantity: '1.00', discount_rate: '0.00' },
          ])
        }
      >
        <Plus className="size-4" aria-hidden="true" />
        Agregar producto
      </button>
    </>
  )
}
