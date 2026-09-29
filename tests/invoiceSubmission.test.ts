import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { blank } from '../src/features/invoices/domain/createInvoiceDraft.ts'
import { prepareInvoiceSubmission } from '../src/features/invoices/domain/prepareInvoiceSubmission.ts'

function draft() {
  return { ...blank(), customer_id: 1, numbering_range_id: 2 }
}

test('el pago único toma el total sin modificar el borrador ni su referencia', () => {
  const input = draft()
  const snapshot = structuredClone(input)
  const payload = prepareInvoiceSubmission(input, '119.00', '')
  assert.equal(payload.payment_details[0].amount, '119.00')
  assert.equal(payload.reference_code, input.reference_code)
  assert.deepEqual(input, snapshot)
})

test('varios pagos conservan sus importes y deben cubrir exactamente el total', () => {
  const input = draft()
  input.payment_details = ['19.00', '100.00'].map((amount) => ({
    ...input.payment_details[0],
    amount,
  }))
  assert.deepEqual(
    prepareInvoiceSubmission(input, '119.00', '').payment_details,
    input.payment_details,
  )
  assert.throws(
    () => prepareInvoiceSubmission(input, '120.00', ''),
    /no coincide/,
  )
  input.payment_details[0].amount = '0.00'
  assert.throws(
    () => prepareInvoiceSubmission(input, '100.00', ''),
    /mayor que cero/,
  )
})

test('se conservan los errores de cliente, rango y cálculo', () => {
  const input = draft()
  assert.throws(
    () => prepareInvoiceSubmission({ ...input, customer_id: 0 }, '119.00', ''),
    /Selecciona cliente y rango/,
  )
  assert.throws(
    () =>
      prepareInvoiceSubmission(
        { ...input, numbering_range_id: 0 },
        '119.00',
        '',
      ),
    /Selecciona cliente y rango/,
  )
  assert.throws(
    () => prepareInvoiceSubmission(input, '', 'Impuesto inválido'),
    /Impuesto inválido/,
  )
})
