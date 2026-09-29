export type InvoiceInput = {
  reference_code: string
  customer_id: number
  numbering_range_id: number
  observation: string
  items: { product_id: number; quantity: string; discount_rate: string }[]
  payment_details: {
    payment_form: string
    payment_method_code: string
    reference_code: string
    amount: string
    due_date: string
  }[]
  cash_rounding_amount: string
}
