import Modal from '../../../../shared/components/ui/Modal'
import type { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import ProductForm from './ProductForm'

export default function ProductFormModal({
  editing,
  busy,
  error,
  formVersion,
  fields,
  taxes,
  setTaxes,
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
    <>
      <Modal
        title={editing ? 'Editar producto' : 'Agregar producto'}
        busy={busy}
        onClose={closeModal}
      >
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-300"
          >
            {error}
          </p>
        )}
        <ProductForm
          editing={editing}
          busy={busy}
          formVersion={formVersion}
          fields={fields}
          taxes={taxes}
          setTaxes={setTaxes}
          submit={submitProduct}
          onCancel={closeModal}
        />
      </Modal>
    </>
  )
}
