import type { AuthRepository } from '../domain/interfaces/AuthRepository'
import { authRepository as httpRepository } from '../data/authRepository'

export const authRepository: AuthRepository = httpRepository
