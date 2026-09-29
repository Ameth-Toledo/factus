import type { InvoiceOptionsRepository } from '../domain/interfaces/InvoiceOptionsRepository'

import { loadInvoiceOptions } from './operations/loadInvoiceOptions.ts'

export const invoiceOptionsRepository: InvoiceOptionsRepository = {
  load: loadInvoiceOptions,
}
