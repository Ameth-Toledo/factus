import { Plus } from 'lucide-react'
import type { Session } from '../../../auth/domain/models/Session'
import PageHeading from '../../../../shared/components/ui/PageHeading'
import ActionButton from '../../../../shared/components/ui/ActionButton'
import { useCustomersViewModel } from '../viewmodel/useCustomersViewModel'
import CustomersTable from '../components/CustomersTable'
import CustomerFormModal from '../components/CustomerFormModal'

export default function CustomersView({ session }: { session: Session }) {
  const model = useCustomersViewModel(session)

  return (
    <section>
      <PageHeading
        title="Clientes"
        description="Consulta y administra los datos de quienes confían en tu negocio."
        action={
          <ActionButton
            data-tour="create-customer"
            onClick={model.openCreate}
            disabled={model.busy}
          >
            <Plus className="size-4" aria-hidden="true" />
            Agregar cliente
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
      <CustomersTable
        customers={model.customers}
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
        <CustomerFormModal
          editing={model.editing}
          busy={model.busy}
          error={model.error}
          formVersion={model.formVersion}
          fields={model.fields}
          taxes={model.taxes}
          setTaxes={model.setTaxes}
          reset={model.reset}
          closeModal={model.closeModal}
          submitForm={model.submitForm}
        />
      )}
    </section>
  )
}
