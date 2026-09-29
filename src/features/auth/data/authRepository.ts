import type { AuthRepository } from '../domain/interfaces/AuthRepository'

import { login } from './operations/login.ts'
import { registerAccount } from './operations/registerAccount.ts'

export const authRepository: AuthRepository = {
  login,
  register: registerAccount,
}
