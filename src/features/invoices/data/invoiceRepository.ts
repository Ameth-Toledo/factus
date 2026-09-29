import type { InvoiceRepository } from '../domain/interfaces/InvoiceRepository'

import { createInvoice } from './operations/createInvoice.ts'
import { findInvoice } from './operations/findInvoice.ts'
import { listInvoices } from './operations/listInvoices.ts'

export const invoiceRepository: InvoiceRepository = {
  save: createInvoice,
  find: findInvoice,
  list: listInvoices,
}
