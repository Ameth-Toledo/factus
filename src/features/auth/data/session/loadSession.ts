import type { Session } from '../../domain/models/Session'

import { sessionKey } from './sessionKey.ts'

export function loadSession(): Session | null {
  try {
    const value = JSON.parse(
      sessionStorage.getItem(sessionKey) || 'null',
    ) as Session | null
    return value &&
      typeof value.token === 'string' &&
      typeof value.user?.id === 'number' &&
      value.expiresAt > Date.now()
      ? value
      : null
  } catch {
    return null
  }
}
