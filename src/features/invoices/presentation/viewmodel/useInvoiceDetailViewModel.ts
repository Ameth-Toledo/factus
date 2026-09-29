import { useEffect, useState } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import type { InvoiceRepository } from '../../domain/interfaces/InvoiceRepository'
import { invoiceRepository } from '../../di/invoiceRepository'
import { errorMessage } from '../../../../shared/errors/errorMessage'

export function useInvoiceDetailViewModel(
  session: Session,
  id: string,
  repository: InvoiceRepository = invoiceRepository,
) {
  const [result, setResult] = useState<{
    id: string
    invoice: Invoice | null
    error: string
  } | null>(null)

  useEffect(() => {
    let active = true

    repository.find(session, id).then(
      (invoice) => {
        if (active) setResult({ id, invoice, error: '' })
      },
      (error: unknown) => {
        if (active) setResult({ id, invoice: null, error: errorMessage(error) })
      },
    )

    return () => {
      active = false
    }
  }, [session, id, repository])

  const current = result?.id === id ? result : null

  return {
    loading: !current,
    invoice: current?.invoice ?? null,
    error: current?.error ?? '',
  }
}
