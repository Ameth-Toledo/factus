import type { Session } from '../../../auth/domain/models/Session'
import { useInvoiceCreationViewModel } from './useInvoiceCreationViewModel'

export function useSaleViewModel(session: Session) {
  const model = useInvoiceCreationViewModel(session)

  function refreshOptions() {
    model.setLoading(true)
    model.setRevision((value) => value + 1)
  }

  return { ...model, refreshOptions }
}
