import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import InvoiceDownloads from './InvoiceDownloads'
import { useInvoiceHistoryViewModel } from '../viewmodel/useInvoiceHistoryViewModel'

export default function InvoiceHistory({
  session,
  onSelect,
  refreshKey,
}: {
  session: Session
  onSelect: (invoice: Invoice) => void
  refreshKey: number
}) {
  const {
    rows,
    offset,
    setOffset,
    setRevision,
    loading,
    setLoading,
    error,
    labels,
  } = useInvoiceHistoryViewModel({ session, refreshKey })
  return (
    <section>
      <h2>Historial de facturas</h2>
      <button
        type="button"
        className="secondary"
        disabled={loading}
        onClick={() => {
          setLoading(true)
          setRevision((v) => v + 1)
        }}
      >
        Actualizar historial
      </button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {loading ? (
        <p role="status">Cargando historial…</p>
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID / Fecha</th>
                  <th>Número / Referencia</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      {invoice.id}
                      <br />
                      {new Date(invoice.created_at).toLocaleString('es')}
                    </td>
                    <td>
                      {invoice.number || 'Sin número'}
                      <br />
                      <small>{invoice.reference_code}</small>
                    </td>
                    <td>{labels[invoice.status] || invoice.status}</td>
                    <td>
                      {invoice.factus_response?.data?.totals?.total || '—'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => onSelect(invoice)}
                      >
                        Ver detalle
                      </button>
                      <InvoiceDownloads invoice={invoice} session={session} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!rows.length && !error && <p>No hay facturas en esta página.</p>}
        </>
      )}
      <div className="actions">
        <button
          className="secondary"
          disabled={loading || offset === 0}
          onClick={() => {
            setLoading(true)
            setOffset(offset - 20)
          }}
        >
          Anterior
        </button>
        <span>Página {offset / 20 + 1}</span>
        <button
          className="secondary"
          disabled={loading || rows.length < 20}
          onClick={() => {
            setLoading(true)
            setOffset(offset + 20)
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  )
}
