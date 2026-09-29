import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import { useInvoiceLookupViewModel } from './useInvoiceLookupViewModel'

export function useInvoiceWorkspaceViewModel(session: Session) {
  const model = useInvoiceLookupViewModel(session)
  const navigate = useNavigate()

  function showDetail(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}`)
  }

  async function consult(event: FormEvent) {
    const invoice = await model.consult(event)
    if (invoice) showDetail(invoice)
    return invoice
  }

  return {
    ...model,
    showDetail,
    consult,
  }
}
