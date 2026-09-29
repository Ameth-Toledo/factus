import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'
import type { Product } from '../../domain/models/Product'
import { useCatalogViewModel } from './useCatalogViewModel'

export function useCatalogPageViewModel(
  kind: 'customers' | 'products',
  session: Session,
) {
  const catalog = useCatalogViewModel({ kind, session })
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openCreate() {
    catalog.reset()
    catalog.clearFeedback()
    setIsModalOpen(true)
  }

  function openEdit(row: Customer | Product) {
    catalog.edit(row)
    catalog.clearFeedback()
    setIsModalOpen(true)
  }

  function closeModal() {
    if (catalog.busy) return
    setIsModalOpen(false)
    catalog.reset()
    catalog.clearFeedback()
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    const saved = await catalog.submit(event)
    if (saved) setIsModalOpen(false)
    return saved
  }

  function refresh() {
    catalog.setLoading(true)
    catalog.setRevision((value) => value + 1)
  }

  function previousPage() {
    catalog.setLoading(true)
    catalog.setOffset(catalog.offset - 20)
  }

  function nextPage() {
    catalog.setLoading(true)
    catalog.setOffset(catalog.offset + 20)
  }

  return {
    refresh,
    previousPage,
    nextPage,
    ...catalog,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
    submitForm,
  }
}
