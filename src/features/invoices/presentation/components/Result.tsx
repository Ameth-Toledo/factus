import { safeLink } from '../../../../shared/browser/safeLink'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import InvoiceDownloads from './InvoiceDownloads'

export default function Result({
  invoice,
  session,
}: {
  invoice: Invoice
  session: Session
}) {
  const url = safeLink(invoice.factus_response?.data?.links?.public_url)
  const labels: Record<string, string> = {
    validated: 'Validada',
    not_validated: 'Sin validar',
    rejected: 'Rechazada',
    pending: 'En proceso o pendiente de revisión',
    unknown: 'Resultado sin confirmar',
  }
  return (
    <article className="result">
      <h3>
        Factura #{invoice.id}: {labels[invoice.status] || invoice.status}
      </h3>
      {invoice.status !== 'validated' && (
        <p className="error">
          {invoice.failure ||
            'No se ha confirmado la validación. Revisa el resultado antes de emitir otra factura.'}
        </p>
      )}
      <dl>
        <dt>Referencia local</dt>
        <dd>{invoice.reference_code}</dd>
        <dt>Referencia en Factus</dt>
        <dd>{invoice.factus_reference}</dd>
        <dt>Número</dt>
        <dd>{invoice.number || 'Pendiente'}</dd>
        <dt>CUFE</dt>
        <dd className="wrap">{invoice.cufe || 'Pendiente'}</dd>
      </dl>
      {url && (
        <p>
          <a href={url} target="_blank" rel="noreferrer">
            Abrir factura en Factus
          </a>
        </p>
      )}
      {invoice.factus_response?.data?.totals && (
        <dl>
          {Object.entries(invoice.factus_response.data.totals).map(
            ([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ),
          )}
        </dl>
      )}
      <InvoiceDownloads invoice={invoice} session={session} />
      <details>
        <summary>Respuesta y notificaciones de Factus</summary>
        <pre>{JSON.stringify(invoice.factus_response, null, 2)}</pre>
      </details>
    </article>
  )
}
