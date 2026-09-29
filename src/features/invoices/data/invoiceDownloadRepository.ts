import type { InvoiceDownloadRepository } from '../domain/interfaces/InvoiceDownloadRepository'

import { downloadInvoice } from './operations/downloadInvoice.ts'

export const invoiceDownloadRepository: InvoiceDownloadRepository = {
  download: downloadInvoice,
}
