import type { User } from './User'

export type Session = {
  token: string
  user: User
  expiresAt: number
}
