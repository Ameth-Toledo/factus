import WorkspaceContent from '../../../../shared/components/layout/WorkspaceContent'
import Modal from '../../../../shared/components/ui/Modal'
import type { useCustomersViewModel } from '../viewmodel/useCustomersViewModel'
import CatalogForm from './CatalogForm'

export default function CustomerFormModal({
  editing,
  busy,
  error,
  formVersion,
  fields,
  taxes,
  setTaxes,
  reset,
  closeModal,
  submitForm,
}: Pick<
  ReturnType<typeof useCustomersViewModel>,
  | 'editing'
  | 'busy'
  | 'error'
  | 'formVersion'
  | 'fields'
  | 'taxes'
  | 'setTaxes'
  | 'reset'
  | 'closeModal'
  | 'submitForm'
>) {
  return (
    <WorkspaceContent contained={false}>
      <Modal
        title={editing ? 'Editar cliente' : 'Agregar cliente'}
        busy={busy}
        onClose={closeModal}
      >
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <CatalogForm
          kind="customers"
          hideTitle
          editing={editing}
          busy={busy}
          formVersion={formVersion}
          fields={fields}
          taxes={taxes}
          setTaxes={setTaxes}
          reset={reset}
          submit={submitForm}
          onCancel={closeModal}
        />
      </Modal>
    </WorkspaceContent>
  )
}
