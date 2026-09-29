import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { loadDashboard } from '../src/features/dashboard/data/operations/loadDashboard.ts'
import type { Session } from '../src/features/auth/domain/models/Session.ts'
import type { Customer } from '../src/features/catalog/domain/models/Customer.ts'
import type { Product } from '../src/features/catalog/domain/models/Product.ts'
import type { Invoice } from '../src/features/invoices/domain/models/Invoice.ts'

const session: Session = {
  token: 'dashboard-test',
  expiresAt: 9999999999999,
  user: {
    id: 1,
    first_name: 'Ana',
    last_name: 'Test',
    email: 'test@example.com',
  },
}

test('el resumen usa el catálogo completo y la primera página de facturas de la sesión', async () => {
  const invoice = { id: 7, status: 'pending' } as Invoice
  const summary = await loadDashboard(
    session,
    {
      allCustomers: async (current) => {
        assert.equal(current, session)
        return [{ id: 1 }, { id: 2 }] as Customer[]
      },
      allProducts: async (current) => {
        assert.equal(current, session)
        return [{ id: 3 }] as Product[]
      },
    },
    {
      list: async (current, offset) => {
        assert.equal(current, session)
        assert.equal(offset, 0)
        return [invoice]
      },
    },
  )
  assert.deepEqual(summary, {
    customerCount: 2,
    productCount: 1,
    invoices: [invoice],
  })
})

test('una cuenta vacía devuelve ceros reales', async () => {
  assert.deepEqual(
    await loadDashboard(
      session,
      { allCustomers: async () => [], allProducts: async () => [] },
      { list: async () => [] },
    ),
    { customerCount: 0, productCount: 0, invoices: [] },
  )
})

test('una carga fallida no se presenta como una cuenta sin actividad', async () => {
  await assert.rejects(
    loadDashboard(
      session,
      {
        allCustomers: async () => {
          throw new Error('Sin conexión')
        },
        allProducts: async () => [],
      },
      { list: async () => [] },
    ),
    /Sin conexión/,
  )
})
