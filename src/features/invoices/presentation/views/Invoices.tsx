import InvoiceForm from '../components/InvoiceForm'
import InvoiceLookup from '../components/InvoiceLookup'
import type { Session } from '../../../auth/domain/models/Session'
import InvoiceHistory from '../components/InvoiceHistory'
import Result from '../components/Result'
import { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'

export default function Invoices({ session }: { session: Session }) {
  const {
    submitted,
    draft,
    customers,
    products,
    ranges,
    loading,
    setLoading,
    busy,
    error,
    loadError,
    setRevision,
    result,
    found,
    setFound,
    lookup,
    setLookup,
    lookupBusy,
    lookupError,
    setLookupError,
    calculated,
    calculationError,
    patch,
    send,
    newInvoice,
    consult,
  } = useInvoicesViewModel({ session })
  return (
    <section>
      <h2>Crear factura</h2>
      <p>
        Se utilizarán los precios e impuestos guardados en tu catálogo. Este
        flujo no envía correos.
      </p>
      {loadError && (
        <p role="alert" className="error">
          {loadError}
        </p>
      )}
      {loading && <p role="status">Cargando clientes, productos y rangos…</p>}
      <button
        className="secondary"
        disabled={loading || busy}
        onClick={() => {
          setLoading(true)
          setRevision((v) => v + 1)
        }}
      >
        Actualizar catálogos y rangos
      </button>
      {!loading &&
        !loadError &&
        (!customers.length || !products.length || !ranges.length) && (
          <p>
            Necesitas al menos un cliente, un producto y un rango disponible
            para facturar.
          </p>
        )}
      {submitted && (
        <p role="status">
          Envío guardado con referencia{' '}
          <strong>{submitted.reference_code}</strong>. Consultar el mismo envío
          conserva sus datos y evita duplicarlo. Si queda pendiente o sin
          confirmar, requiere revisión en Factus.
        </p>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <InvoiceForm
        send={send}
        busy={busy}
        submitted={submitted}
        loading={loading}
        loadError={loadError}
        draft={draft}
        patch={patch}
        customers={customers}
        ranges={ranges}
        products={products}
        calculated={calculated}
        calculationError={calculationError}
        result={result}
        newInvoice={newInvoice}
      />
      {result && <Result invoice={result} session={session} />}
      <InvoiceHistory
        session={session}
        refreshKey={result?.id || 0}
        onSelect={(invoice) => {
          setFound(invoice)
          setLookup(String(invoice.id))
          setLookupError('')
          document
            .getElementById('invoice-detail')
            ?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      <InvoiceLookup
        consult={consult}
        lookup={lookup}
        setLookup={setLookup}
        lookupBusy={lookupBusy}
        lookupError={lookupError}
      />
      {found && <Result invoice={found} session={session} />}
    </section>
  )
}
