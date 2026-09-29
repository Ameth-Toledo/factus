import PageHeading from '../../../../shared/components/ui/PageHeading'
import ActionButton from '../../../../shared/components/ui/ActionButton'
import { Plus } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import ProductsTable from '../components/ProductsTable'
import ProductFormModal from '../components/ProductFormModal'

export default function ProductsView({ session }: { session: Session }) {
  const model = useProductsViewModel(session)

  return (
    <section>
      <PageHeading
        title="Productos y servicios"
        description="Consulta y administra los productos de tu catálogo."
        action={
          <ActionButton
            data-tour="create-product"
            onClick={model.openCreate}
            disabled={model.busy}
          >
            <Plus className="size-4" aria-hidden="true" />
            Agregar producto
          </ActionButton>
        }
      />
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
