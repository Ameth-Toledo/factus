import type { InvoiceDownloadRepository } from '../domain/interfaces/InvoiceDownloadRepository'
import { invoiceDownloadRepository as httpRepository } from '../data/invoiceDownloadRepository'

export const invoiceDownloadRepository: InvoiceDownloadRepository =
  httpRepository
