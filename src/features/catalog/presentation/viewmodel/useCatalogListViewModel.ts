import type { CatalogRepository } from '../../domain/interfaces/CatalogRepository'
import { catalogRepository } from '../../di/catalogRepository'
import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'
import type { Product } from '../../domain/models/Product'
import { errorMessage } from '../../../../shared/errors/errorMessage'

export function useCatalogListViewModel(
  kind: 'customers' | 'products',
  session: Session,
  setError: Dispatch<SetStateAction<string>>,
  repository: CatalogRepository = catalogRepository,
) {
  const [rows, setRows] = useState<(Customer | Product)[]>([])
  const [offset, setOffset] = useState(0)
  const [revision, setRevision] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    repository
      .list(kind, session, offset)
      .then((data) => {
        if (active) {
          setRows(data)
          setError('')
        }
      })
      .catch((e) => {
        if (active) setError(errorMessage(e))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [kind, offset, revision, session, setError, repository])
  return { rows, offset, setOffset, setRevision, loading, setLoading }
}
