import type { InvoiceRepository } from '../../domain/interfaces/InvoiceRepository'
import { invoiceRepository } from '../../di/invoiceRepository'
import { useEffect, useState } from 'react'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'

export function useInvoiceHistoryViewModel(
  {
    session,
    refreshKey,
  }: {
    session: Session
    refreshKey: number
  },
  repository: InvoiceRepository = invoiceRepository,
) {
  const [rows, setRows] = useState<Invoice[]>([])
  const [offset, setOffset] = useState(0)
  const [revision, setRevision] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    repository
      .list(session, offset)
      .then((data) => {
        if (active) {
          setRows(data)
          setError('')
        }
      })
      .catch((e) => {
        if (active) {
          setError(errorMessage(e))
          setRows([])
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [session, offset, revision, refreshKey, repository])
  const labels: Record<string, string> = {
    validated: 'Validada',
    not_validated: 'Sin validar',
    rejected: 'Rechazada',
    pending: 'Pendiente',
    unknown: 'Sin confirmar',
  }
  return {
    rows,
    offset,
    setOffset,
    setRevision,
    loading,
    setLoading,
    error,
    labels,
  }
}
