import type { Session } from '../../../auth/domain/models/Session'
import PageHeading from '../../../../shared/components/ui/PageHeading'
import InvoiceHistory from '../components/InvoiceHistory'
import InvoiceLookup from '../components/InvoiceLookup'
import { useInvoiceWorkspaceViewModel } from '../viewmodel/useInvoiceWorkspaceViewModel'

export default function Invoices({ session }: { session: Session }) {
  const model = useInvoiceWorkspaceViewModel(session)

  return (
    <section>
      <PageHeading
        title="Facturas"
        description="Consulta tus ventas, revisa su estado y administra tus documentos."
        action={
          <InvoiceLookup
            consult={model.consult}
            lookup={model.lookup}
            setLookup={model.setLookup}
            lookupBusy={model.lookupBusy}
            lookupError={model.lookupError}
          />
        }
      />
      <InvoiceHistory
        session={session}
        refreshKey={0}
        onSelect={model.showDetail}
      />
    </section>
  )
}
