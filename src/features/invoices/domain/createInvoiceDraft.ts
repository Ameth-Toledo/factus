import type { InvoiceInput } from './models/InvoiceInput'

export const blank = (): InvoiceInput => ({
  reference_code: `VENTA-${crypto.randomUUID()}`,
  customer_id: 0,
  numbering_range_id: 0,
  observation: '',
  items: [{ product_id: 0, quantity: '1.00', discount_rate: '0.00' }],
  payment_details: [
    {
      payment_form: '1',
      payment_method_code: '10',
      reference_code: '',
      amount: '',
      due_date: '',
    },
  ],
  cash_rounding_amount: '0.00',
})
