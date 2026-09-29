import type { Session } from '../../../auth/domain/models/Session'
import PageHeading from '../../../../shared/components/ui/PageHeading'
import SaleForm from '../components/SaleForm'
import { useSaleViewModel } from '../viewmodel/useSaleViewModel'

export default function SaleView({ session }: { session: Session }) {
  const model = useSaleViewModel(session)

  return (
    <section>
      <PageHeading
        title="Realizar venta"
        description="Selecciona el cliente, agrega los productos y genera la factura de tu venta."
      />
      <SaleForm session={session} model={model} />
    </section>
  )
}
