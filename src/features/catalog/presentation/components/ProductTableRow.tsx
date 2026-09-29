import { Package, Pencil, Trash2 } from 'lucide-react'
import type { Product } from '../../domain/models/Product'

export default function ProductTableRow({
  product,
  busy,
  onEdit,
  onRemove,
}: {
  product: Product
  busy: boolean
  onEdit: (product: Product) => void
  onRemove: (product: Product) => void
}) {
  return (
    <tr className="group border-b border-neutral-800/70 transition-colors last:border-b-0 hover:bg-white/[0.025]">
      <td className="py-5 pr-4 pl-6">
        <div className="flex items-center gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 group-hover:text-neutral-200">
            <Package className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span
              className="block max-w-64 truncate font-medium text-neutral-100"
              title={product.name}
            >
              {product.name}
            </span>
            <span
              className="mt-1 block max-w-64 truncate text-xs text-neutral-500"
              title={product.note || undefined}
            >
              #{product.id}
              {product.note ? ` · ${product.note}` : ''}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-5">
        <span
          className="inline-block max-w-40 truncate rounded-md border border-neutral-800 bg-neutral-900/70 px-2.5 py-1 font-mono text-xs text-neutral-400"
          title={product.code_reference}
        >
          {product.code_reference}
        </span>
      </td>
      <td className="px-5 py-5 text-right font-medium whitespace-nowrap text-neutral-200 tabular-nums">
        {product.price}
      </td>
      <td className="px-5 py-5">
        <div className="flex max-w-60 flex-wrap gap-1.5">
          {product.taxes.length ? (
            product.taxes.map((tax, index) => (
              <span
                key={index}
                className="rounded-full border border-neutral-700/70 px-2.5 py-1 text-[11px] whitespace-nowrap text-neutral-400"
              >
                {tax.is_excluded
                  ? 'Excluido'
                  : `${tax.code === '01' ? 'IVA' : tax.code === '04' ? 'INC' : tax.code} ${tax.rate}%`}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-500">Sin impuestos</span>
          )}
        </div>
      </td>
      <td className="py-5 pr-6 pl-4">
        <div className="flex justify-end gap-1.5">
          <button
            type="button"
            disabled={busy}
            onClick={() => onEdit(product)}
            aria-label={`Editar ${product.name}`}
            title="Editar producto"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onRemove(product)}
            aria-label={`Eliminar ${product.name}`}
            title="Eliminar producto"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-neutral-500 transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  )
}
