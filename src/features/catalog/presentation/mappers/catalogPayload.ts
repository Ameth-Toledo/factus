import type { Field } from '../models/Field'
import type { Tax } from '../../domain/models/Tax'

export function catalogPayload(
  form: FormData,
  fields: Field[],
  kind: 'customers' | 'products',
  taxes: Tax[],
) {
  const payload: Record<string, unknown> = {}
  for (const field of fields)
    payload[field.key] = String(form.get(field.key) || '')
  if (kind === 'customers')
    payload.responsibilities = String(payload.responsibilities)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  else payload.taxes = taxes
  return payload
}
