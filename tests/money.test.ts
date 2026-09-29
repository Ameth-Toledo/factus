import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import {
  cents,
  money,
  total,
  rounding,
} from '../src/features/invoices/domain/money.ts'
const products = [
  {
    id: 1,
    code_reference: 'A',
    name: 'Producto A',
    price: '10000.00',
    unit_measure_code: '94',
    standard_code: '999',
    note: '',
    taxes: [{ code: '01', rate: '19.00', is_excluded: false }],
  },
  {
    id: 2,
    code_reference: 'B',
    name: 'Producto B',
    price: '20000.00',
    unit_measure_code: '94',
    standard_code: '999',
    note: '',
    taxes: [{ code: '01', rate: '19.00', is_excluded: false }],
  },
]
test('total de ejemplo y descuento coinciden con Go', () => {
  assert.equal(
    money(
      total(
        [
          { product_id: 1, quantity: '1.00', discount_rate: '0' },
          { product_id: 2, quantity: '3.00', discount_rate: '0' },
        ],
        products,
      ),
    ),
    '83300.00',
  )
  assert.equal(
    money(
      total(
        [
          { product_id: 1, quantity: '1.00', discount_rate: '10' },
          { product_id: 2, quantity: '3.00', discount_rate: '0' },
        ],
        products,
      ),
    ),
    '82110.00',
  )
})
test('decimales exactos, límites y redondeo negativo', () => {
  assert.equal(money(cents('999999999999.99')), '999999999999.99')
  assert.equal(money(rounding('-0.01')), '-0.01')
  for (const value of ['1.001', '1e3', '-1', 'NaN', '1,2'])
    assert.throws(() => cents(value))
  assert.throws(() => rounding('500.01'))
  assert.throws(() =>
    total([{ product_id: 99, quantity: '1', discount_rate: '0' }], products),
  )
})
