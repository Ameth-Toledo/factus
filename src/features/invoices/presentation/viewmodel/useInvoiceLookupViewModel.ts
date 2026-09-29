import type { InvoiceRepository } from '../../domain/interfaces/InvoiceRepository'
import { invoiceRepository } from '../../di/invoiceRepository'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import { errorMessage } from '../../../../shared/errors/errorMessage'

export function useInvoiceLookupViewModel(
  session: Session,
  repository: InvoiceRepository = invoiceRepository,
) {
  const [found, setFound] = useState<Invoice | null>(null)
  const [lookup, setLookup] = useState('')
  const [lookupBusy, setLookupBusy] = useState(false)
  const [lookupError, setLookupError] = useState('')
  async function consult(event: FormEvent) {
    event.preventDefault()
    setLookupBusy(true)
    setLookupError('')
    setFound(null)
    try {
      const invoice = await repository.find(session, lookup)
      setFound(invoice)
      return invoice
    } catch (e) {
      setLookupError(errorMessage(e))
      return null
    } finally {
      setLookupBusy(false)
    }
  }
  return {
    found,
    setFound,
    lookup,
    setLookup,
    lookupBusy,
    lookupError,
    setLookupError,
    consult,
  }
}
