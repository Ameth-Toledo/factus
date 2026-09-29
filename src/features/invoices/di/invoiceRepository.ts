import type { InvoiceRepository } from '../domain/interfaces/InvoiceRepository'
import { invoiceRepository as httpRepository } from '../data/invoiceRepository'

export const invoiceRepository: InvoiceRepository = httpRepository
