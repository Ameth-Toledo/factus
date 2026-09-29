import type { InvoiceRepository } from '../../domain/interfaces/InvoiceRepository'
import { invoiceRepository } from '../../di/invoiceRepository'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '../../../auth/domain/models/Session'
import type { Invoice } from '../../domain/models/Invoice'
import type { InvoiceInput } from '../../domain/models/InvoiceInput'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import { ApiError } from '../../../../core/errors/ApiError'
import { blank } from '../../domain/createInvoiceDraft'
import { prepareInvoiceSubmission } from '../../domain/prepareInvoiceSubmission'
import { storedRequest } from '../../data/storage/storedRequest.ts'
import { saveRequest } from '../../data/storage/saveRequest.ts'
import { removeRequest } from '../../data/storage/removeRequest.ts'
import { useInvoiceOptionsViewModel } from './useInvoiceOptionsViewModel'
import { invoiceEstimate } from '../formatters/invoiceEstimate'

export function useInvoiceCreationViewModel(
  session: Session,
  repository: InvoiceRepository = invoiceRepository,
) {
  const storageKey = `factus.invoice.request.${session.user.id}`
  const [submitted, setSubmitted] = useState<InvoiceInput | null>(() =>
    storedRequest(storageKey),
  )
  const [draft, setDraft] = useState<InvoiceInput>(
    () => storedRequest(storageKey) || blank(),
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Invoice | null>(null)
  const options = useInvoiceOptionsViewModel(session, setDraft)
  const { products, ranges } = options
  const { calculated, calculationError } = invoiceEstimate(draft, products)
  function patch<K extends keyof InvoiceInput>(key: K, value: InvoiceInput[K]) {
    setDraft({ ...draft, [key]: value })
  }
  async function send(event: FormEvent) {
    event.preventDefault()
    setError('')
    let payload = submitted
    if (!payload) {
      try {
        payload = prepareInvoiceSubmission(draft, calculated, calculationError)
        // Persist before sending so a lost response or reload cannot silently change the reference.
        saveRequest(storageKey, payload)
        setSubmitted(payload)
      } catch (e) {
        setError(errorMessage(e))
        return
      }
    }
    if (!payload) return
    setBusy(true)
    try {
      setResult(await repository.save(session, payload))
    } catch (e) {
      setError(errorMessage(e))
      if (e instanceof ApiError && [400, 404, 415].includes(e.status)) {
        removeRequest(storageKey)
        setSubmitted(null)
      }
    } finally {
      setBusy(false)
    }
  }
  function newInvoice() {
    removeRequest(storageKey)
    setSubmitted(null)
    setResult(null)
    setError('')
    setDraft({
      ...blank(),
      numbering_range_id: ranges.length === 1 ? ranges[0].id : 0,
    })
  }
  return {
    ...options,
    submitted,
    draft,
    busy,
    error,
    result,
    calculated,
    calculationError,
    patch,
    send,
    newInvoice,
  }
}
