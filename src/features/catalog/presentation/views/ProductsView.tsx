import { Plus } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import ProductsTable from '../components/ProductsTable'
import ProductFormModal from '../components/ProductFormModal'

export default function ProductsView({ session }: { session: Session }) {
  const model = useProductsViewModel(session)

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Productos y servicios
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Consulta y administra los productos de tu catálogo.
          </p>
        </div>
        <button
          type="button"
          onClick={model.openCreate}
          disabled={model.busy}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-black transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-4" aria-hidden="true" />
          Agregar producto
        </button>
      </div>
      {model.error && !model.isModalOpen && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300"
        >
          {model.error}
        </p>
      )}
      {model.notice && (
        <p role="status" className="mb-5 text-sm text-neutral-300">
          {model.notice}
        </p>
      )}
      <ProductsTable
        products={model.products}
        busy={model.busy}
        loading={model.loading}
        offset={model.offset}
        error={model.error}
        refresh={model.refresh}
        previousPage={model.previousPage}
        nextPage={model.nextPage}
        openCreate={model.openCreate}
        openEdit={model.openEdit}
        remove={model.remove}
      />
      {model.isModalOpen && (
        <ProductFormModal
          editing={model.editing}
          busy={model.busy}
          error={model.error}
          formVersion={model.formVersion}
          fields={model.fields}
          taxes={model.taxes}
          setTaxes={model.setTaxes}
          reset={model.reset}
          closeModal={model.closeModal}
          submitProduct={model.submitProduct}
        />
      )}
    </section>
  )
}
