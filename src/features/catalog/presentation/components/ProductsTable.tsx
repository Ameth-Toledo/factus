import { Package } from 'lucide-react'
import type { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import ProductTableRow from './ProductTableRow'
import ProductTableState from './ProductTableState'
import TablePagination from '../../../../shared/components/ui/TablePagination'
import TableToolbar from '../../../../shared/components/ui/TableToolbar'

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
      <TableToolbar
        title="Catálogo de productos"
        icon={Package}
        count={products.length}
        loading={loading}
        busy={busy}
        onRefresh={refresh}
      />
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
      <TablePagination
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
