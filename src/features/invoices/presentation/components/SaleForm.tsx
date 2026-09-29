import type { Session } from '../../../auth/domain/models/Session'
import type { useSaleViewModel } from '../viewmodel/useSaleViewModel'
import InvoiceForm from './InvoiceForm'
import Result from './Result'

export default function SaleForm({
  session,
  model,
}: {
  session: Session
  model: ReturnType<typeof useSaleViewModel>
}) {
  return (
    <>
      <div className="space-y-5 [&_fieldset]:min-w-0 [&_label]:min-w-0 [&_label]:max-w-full [&_select]:min-w-0 [&_select]:max-w-full">
        {model.loadError && (
          <p
            role="alert"
            className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300"
          >
            {model.loadError}
          </p>
        )}
        {model.loading && (
          <p role="status">Cargando clientes, productos y rangos…</p>
        )}
        {!model.loading &&
          !model.loadError &&
          (!model.customers.length ||
            !model.products.length ||
            !model.ranges.length) && (
            <p>
              Necesitas al menos un cliente, un producto y un rango disponible
              para facturar.
            </p>
          )}
        {model.submitted && (
          <p
            role="status"
            className="rounded-xl border border-neutral-700 bg-neutral-900 p-4"
          >
            Envío guardado con referencia{' '}
            <strong>{model.submitted.reference_code}</strong>. Consultar el
            mismo envío conserva sus datos y evita duplicarlo. Si queda
            pendiente o sin confirmar, requiere revisión en Factus.
          </p>
        )}
        {model.error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300"
          >
            {model.error}
          </p>
        )}
        <InvoiceForm
          send={model.send}
          busy={model.busy}
          submitted={model.submitted}
          loading={model.loading}
          loadError={model.loadError}
          draft={model.draft}
          patch={model.patch}
          customers={model.customers}
          ranges={model.ranges}
          products={model.products}
          calculated={model.calculated}
          calculationError={model.calculationError}
          result={model.result}
          newInvoice={model.newInvoice}
        />
        {model.result && <Result invoice={model.result} session={session} />}
      </div>
    </>
  )
}
