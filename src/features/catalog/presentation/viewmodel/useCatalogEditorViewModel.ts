import type { CatalogRepository } from '../../domain/interfaces/CatalogRepository'
import { catalogRepository } from '../../di/catalogRepository'
import { useState } from 'react'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Customer } from '../../domain/models/Customer'
import type { Product } from '../../domain/models/Product'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import type { Tax } from '../../domain/models/Tax'
import { customerFields } from '../config/customerFields'
import { productFields } from '../config/productFields'
import { catalogPayload } from '../mappers/catalogPayload'
import type { useCatalogListViewModel } from './useCatalogListViewModel'

export function useCatalogEditorViewModel(
  kind: 'customers' | 'products',
  session: Session,
  list: ReturnType<typeof useCatalogListViewModel>,
  setError: Dispatch<SetStateAction<string>>,
  repository: CatalogRepository = catalogRepository,
) {
  const { rows, offset, setOffset, setLoading, setRevision } = list
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [editing, setEditing] = useState<Customer | Product | null>(null)
  const [formVersion, setFormVersion] = useState(0)
  const [taxes, setTaxes] = useState<Tax[]>([
    { code: '01', rate: '19.00', is_excluded: false },
  ])
  const fields = kind === 'customers' ? customerFields : productFields
  function reset() {
    setEditing(null)
    setFormVersion((v) => v + 1)
    setTaxes([{ code: '01', rate: '19.00', is_excluded: false }])
  }
  function clearFeedback() {
    setError('')
    setNotice('')
  }

  function edit(row: Customer | Product) {
    setEditing(row)
    setFormVersion((value) => value + 1)
    if ('taxes' in row) setTaxes(row.taxes.map((tax) => ({ ...tax })))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    const form = new FormData(event.currentTarget)
    const payload = catalogPayload(form, fields, kind, taxes)
    try {
      if (editing) {
        await repository.update(kind, session, editing.id, payload)
      } else {
        await repository.save(kind, session, payload)
      }
      reset()
      setLoading(true)
      setRevision((v) => v + 1)
      setNotice('Guardado correctamente.')
      return true
    } catch (e) {
      setError(errorMessage(e))
      return false
    } finally {
      setBusy(false)
    }
  }
  async function remove(row: Customer | Product) {
    if (!window.confirm('¿Eliminar este registro del catálogo?')) return
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await repository.remove(kind, session, row.id)
      if (editing?.id === row.id) reset()
      setLoading(true)
      if (rows.length === 1 && offset > 0) setOffset(offset - 20)
      else setRevision((v) => v + 1)
      setNotice('Registro eliminado.')
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }
  return {
    busy,
    notice,
    editing,
    setEditing,
    formVersion,
    setFormVersion,
    taxes,
    setTaxes,
    fields,
    reset,
    clearFeedback,
    edit,
    submit,
    remove,
  }
}
