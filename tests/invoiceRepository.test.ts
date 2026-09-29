import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { invoiceRepository } from '../src/features/invoices/data/invoiceRepository.ts'
import { blank } from '../src/features/invoices/domain/createInvoiceDraft.ts'
import { api } from '../src/core/data/api.ts'
import { ApiError } from '../src/core/errors/ApiError.ts'
import { storedRequest } from '../src/features/invoices/data/storage/storedRequest.ts'
import { saveRequest } from '../src/features/invoices/data/storage/saveRequest.ts'
import { removeRequest } from '../src/features/invoices/data/storage/removeRequest.ts'

const session = {
  token: 'test-token',
  expiresAt: 9999999999999,
  user: {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
  },
}

test('un rechazo fiscal 422 sigue siendo consultable y conserva el envío', async (t) => {
  const input = blank()
  const rejected = { id: 7, status: 'rejected' }
  const fetchMock = t.mock.method(
    globalThis,
    'fetch',
    async () => new Response(JSON.stringify(rejected), { status: 422 }),
  )
  assert.deepEqual(await invoiceRepository.save(session, input), rejected)
  const [url, options] = fetchMock.mock.calls[0].arguments
  assert.equal(url, '/api/invoices')
  assert.equal(options.method, 'POST')
  assert.equal(options.headers.Authorization, 'Bearer test-token')
  assert.deepEqual(JSON.parse(options.body), input)
})

test('un 422 sin factura y los errores ajenos a facturas siguen fallando', async (t) => {
  t.mock.method(
    globalThis,
    'fetch',
    async () =>
      new Response(JSON.stringify({ error: 'Datos inválidos' }), {
        status: 422,
      }),
  )
  await assert.rejects(
    invoiceRepository.save(session, blank()),
    (error: unknown) => error instanceof ApiError && error.status === 422,
  )
  t.mock.method(
    globalThis,
    'fetch',
    async () =>
      new Response(JSON.stringify({ id: 7, status: 'rejected' }), {
        status: 422,
      }),
  )
  await assert.rejects(api('/customers', session), ApiError)
})

test('un 401 borra la sesión y notifica su vencimiento', async (t) => {
  const removed: string[] = []
  const events = new EventTarget()
  let expired = false
  events.addEventListener('session-expired', () => {
    expired = true
  })
  const previousStorage = Object.getOwnPropertyDescriptor(
    globalThis,
    'sessionStorage',
  )
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  t.after(() => {
    if (previousStorage)
      Object.defineProperty(globalThis, 'sessionStorage', previousStorage)
    else Reflect.deleteProperty(globalThis, 'sessionStorage')
    if (previousWindow)
      Object.defineProperty(globalThis, 'window', previousWindow)
    else Reflect.deleteProperty(globalThis, 'window')
  })
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: { removeItem: (key: string) => removed.push(key) },
  })
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: events,
  })
  t.mock.method(
    globalThis,
    'fetch',
    async () =>
      new Response(JSON.stringify({ error: 'Sesión vencida' }), {
        status: 401,
      }),
  )
  await assert.rejects(invoiceRepository.save(session, blank()), ApiError)
  assert.deepEqual(removed, ['factus.session'])
  assert.equal(expired, true)
})

test('el envío guardado conserva todos sus datos y tolera almacenamiento inválido', (t) => {
  const values = new Map<string, string>()
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'sessionStorage', previous)
    else Reflect.deleteProperty(globalThis, 'sessionStorage')
  })
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  })
  const input = blank()
  saveRequest('request', input)
  assert.deepEqual(storedRequest('request'), input)
  removeRequest('request')
  assert.equal(storedRequest('request'), null)
  values.set('request', '{')
  assert.equal(storedRequest('request'), null)
})
