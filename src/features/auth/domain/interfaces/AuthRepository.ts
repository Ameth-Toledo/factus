import type { Session } from '../models/Session'

export interface AuthRepository {
  login(email: string, password: string): Promise<Session>
  register(body: unknown): Promise<unknown>
}
