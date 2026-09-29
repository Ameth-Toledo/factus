import { ListFilter, RefreshCw } from 'lucide-react'
import type { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import ProductTableRow from './ProductTableRow'
import ProductTableState from './ProductTableState'
import ProductTablePagination from './ProductTablePagination'

export default function ProductsTable({
  products,
  busy,
  loading,
  offset,
  error,
  refresh,
  previousPage,
  nextPage,
  openCreate,
  openEdit,
  remove,
}: Pick<
  ReturnType<typeof useProductsViewModel>,
  | 'products'
  | 'busy'
  | 'loading'
  | 'offset'
  | 'error'
  | 'refresh'
  | 'previousPage'
  | 'nextPage'
  | 'openCreate'
  | 'openEdit'
  | 'remove'
>) {
  return (
    <section
      aria-label="Catálogo de productos"
      className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div className="flex items-center gap-3">
          <ListFilter className="size-4 text-neutral-500" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-neutral-200">
            Catálogo de productos
          </h2>
          <span
            className="rounded-md bg-neutral-800/80 px-2 py-0.5 text-[11px] font-medium text-neutral-400"
            aria-label="Productos en esta página"
          >
            {loading ? '…' : products.length}
          </span>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={busy || loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RefreshCw
            className={`size-3.5 ${loading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          Actualizar
        </button>
      </div>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Tabla de productos desplazable"
      >
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="sr-only">
            Productos, códigos, precios sin impuestos y acciones de edición y
            eliminación.
          </caption>
          <thead className="border-y border-neutral-800 bg-white/[0.015] text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
            <tr>
              <th scope="col" className="py-3 pr-4 pl-6">
                Producto
              </th>
              <th scope="col" className="px-4 py-3">
                Código
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Precio sin impuestos
              </th>
              <th scope="col" className="px-5 py-3">
                Impuestos
              </th>
              <th scope="col" className="py-3 pr-6 pl-4 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading || !products.length ? (
              <ProductTableState
                loading={loading}
                hasError={!!error}
                onCreate={openCreate}
                busy={busy}
              />
            ) : (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  busy={busy}
                  onEdit={openEdit}
                  onRemove={(row) => void remove(row)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <ProductTablePagination
        offset={offset}
        count={products.length}
        loading={loading}
        busy={busy}
        onPrevious={previousPage}
        onNext={nextPage}
      />
    </section>
  )
}
