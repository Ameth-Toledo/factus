import { api } from '../../../../core/data/api'
import { saveSession } from '../session/saveSession.ts'
import type { User } from '../../domain/models/User'

export async function login(email: string, password: string) {
  const data = await api<{
    access_token: string
    expires_in: number
    user: User
  }>('/auth/login', null, 'POST', { email, password })
  const session = {
    token: data.access_token,
    user: data.user,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  saveSession(session)
  return session
}
