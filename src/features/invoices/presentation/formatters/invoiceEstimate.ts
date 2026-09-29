import type { InvoiceInput } from '../../domain/models/InvoiceInput'
import type { Product } from '../../../catalog/domain/models/Product'
import { money, rounding, total } from '../../domain/money'
import { errorMessage } from '../../../../shared/errors/errorMessage'

export function invoiceEstimate(draft: InvoiceInput, products: Product[]) {
  let calculated = ''
  let calculationError = ''
  try {
    calculated = money(
      total(draft.items, products) +
        rounding(draft.cash_rounding_amount || '0.00'),
    )
  } catch (e) {
    calculationError = errorMessage(e)
  }
  return { calculated, calculationError }
}
