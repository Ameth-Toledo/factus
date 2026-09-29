import type { InvoiceOptionsRepository } from '../domain/interfaces/InvoiceOptionsRepository'
import { invoiceOptionsRepository as httpRepository } from '../data/invoiceOptionsRepository'

export const invoiceOptionsRepository: InvoiceOptionsRepository = httpRepository
