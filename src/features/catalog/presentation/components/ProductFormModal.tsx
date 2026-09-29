import WorkspaceContent from '../../../../shared/components/layout/WorkspaceContent'
import Modal from '../../../../shared/components/ui/Modal'
import type { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import CatalogForm from './CatalogForm'

export default function ProductFormModal({
  editing,
  busy,
  error,
  formVersion,
  fields,
  taxes,
  setTaxes,
  reset,
  closeModal,
  submitProduct,
}: Pick<
  ReturnType<typeof useProductsViewModel>,
  | 'editing'
  | 'busy'
  | 'error'
  | 'formVersion'
  | 'fields'
  | 'taxes'
  | 'setTaxes'
  | 'reset'
  | 'closeModal'
  | 'submitProduct'
>) {
  return (
    <WorkspaceContent contained={false}>
      <Modal
        title={editing ? 'Editar producto' : 'Agregar producto'}
        busy={busy}
        onClose={closeModal}
      >
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <CatalogForm
          kind="products"
          hideTitle
          editing={editing}
          busy={busy}
          formVersion={formVersion}
          fields={fields}
          taxes={taxes}
          setTaxes={setTaxes}
          reset={reset}
          submit={submitProduct}
          onCancel={closeModal}
        />
      </Modal>
    </WorkspaceContent>
  )
}
