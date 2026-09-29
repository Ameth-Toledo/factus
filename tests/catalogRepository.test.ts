import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { catalogRepository } from '../src/features/catalog/data/catalogRepository.ts'
import type { CatalogRepository } from '../src/features/catalog/domain/interfaces/CatalogRepository.ts'

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

test('save, update y remove mantienen sus rutas, verbos y datos', async (t) => {
  const requests: { url: string; options: RequestInit }[] = []
  t.mock.method(
    globalThis,
    'fetch',
    async (url: string, options: RequestInit) => {
      requests.push({ url, options })
      return new Response(null, { status: 204 })
    },
  )
  const repository: CatalogRepository = catalogRepository
  const payload = { names: 'Cliente', responsibilities: ['R-99-PN'] }
  await repository.save('customers', session, payload)
  await repository.update('customers', session, 7, payload)
  await repository.remove('customers', session, 7)
  assert.deepEqual(
    requests.map(({ url, options }) => [url, options.method]),
    [
      ['/api/customers', 'POST'],
      ['/api/customers/7', 'PUT'],
      ['/api/customers/7', 'DELETE'],
    ],
  )
  assert.equal(requests[0].options.body, JSON.stringify(payload))
  assert.equal(requests[1].options.body, JSON.stringify(payload))
  assert.equal(requests[2].options.body, undefined)
})
