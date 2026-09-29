import { api } from '../../../../core/data/api'

export function registerAccount(body: unknown) {
  return api('/auth/register', null, 'POST', body)
}
