import type { InvoiceDownloadRepository } from '../../domain/interfaces/InvoiceDownloadRepository'
import { invoiceDownloadRepository } from '../../di/invoiceDownloadRepository'
import { saveBlob } from '../../../../shared/browser/saveBlob'
import { useState } from 'react'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'

export function useInvoiceDownloadsViewModel(
  {
    invoice,
    session,
  }: {
    invoice: Invoice
    session: Session
  },
  repository: InvoiceDownloadRepository = invoiceDownloadRepository,
) {
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  async function download(format: 'pdf' | 'xml') {
    setBusy(format)
    setError('')
    try {
      const blob = await repository.download(invoice.id, format, session)
      saveBlob(
        blob,
        `${invoice.number.replace(/[^a-zA-Z0-9_-]/g, '_') || `factura-${invoice.id}`}.${format}`,
      )
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setBusy('')
    }
  }
  return { busy, error, download }
}
