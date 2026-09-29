import type { InvoiceInput } from './models/InvoiceInput'
import { cents } from './money.ts'

export function prepareInvoiceSubmission(
  draft: InvoiceInput,
  calculated: string,
  calculationError: string,
): InvoiceInput {
  if (!draft.customer_id || !draft.numbering_range_id)
    throw new Error('Selecciona cliente y rango.')
  if (calculationError) throw new Error(calculationError)
  const payments = draft.payment_details.map((p) => ({
    ...p,
    amount: p.amount || (draft.payment_details.length === 1 ? calculated : ''),
  }))
  const paid = payments.reduce((sum, p) => sum + cents(p.amount), 0n)
  if (payments.some((p) => cents(p.amount) <= 0n))
    throw new Error('Cada pago debe ser mayor que cero.')
  if (paid !== cents(calculated))
    throw new Error('La suma de pagos no coincide con el total más el ajuste.')
  return { ...draft, payment_details: payments }
}
