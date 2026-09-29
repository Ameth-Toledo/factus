import type { InvoiceOptionsRepository } from '../../domain/interfaces/InvoiceOptionsRepository'
import { invoiceOptionsRepository } from '../../di/invoiceOptionsRepository'
import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { InvoiceInput } from '../../domain/models/InvoiceInput'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import type { Customer } from '../../../catalog/domain/models/Customer'
import type { Product } from '../../../catalog/domain/models/Product'
import type { Range } from '../../domain/models/Range'

export function useInvoiceOptionsViewModel(
  session: Session,
  setDraft: Dispatch<SetStateAction<InvoiceInput>>,
  repository: InvoiceOptionsRepository = invoiceOptionsRepository,
) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [ranges, setRanges] = useState<Range[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    let active = true
    async function load() {
      const { cs, ps, rs } = await repository.load(session)
      if (active) {
        setCustomers(cs)
        setProducts(ps)
        setRanges(rs)
        setLoadError('')
        if (rs.length === 1)
          setDraft((d) =>
            d.numbering_range_id ? d : { ...d, numbering_range_id: rs[0].id },
          )
      }
    }
    load()
      .catch((e) => {
        if (active) setLoadError(errorMessage(e))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [session, revision, setDraft, repository])
  return {
    customers,
    products,
    ranges,
    loading,
    setLoading,
    loadError,
    setRevision,
  }
}
