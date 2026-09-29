import type { Session } from '../../../auth/domain/models/Session'
import { useInvoiceCreationViewModel } from './useInvoiceCreationViewModel'
import { useInvoiceLookupViewModel } from './useInvoiceLookupViewModel'

export function useInvoicesViewModel({ session }: { session: Session }) {
  const creation = useInvoiceCreationViewModel(session)
  const lookup = useInvoiceLookupViewModel(session)
  return { ...creation, ...lookup }
}
