import type { Tax } from './Tax'

export type Product = {
  id: number
  code_reference: string
  name: string
  price: string
  unit_measure_code: string
  standard_code: string
  note: string
  taxes: Tax[]
}
