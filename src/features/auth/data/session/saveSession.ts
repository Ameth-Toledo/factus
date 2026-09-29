import type { Session } from '../../domain/models/Session'

import { sessionKey } from './sessionKey.ts'

export function saveSession(session: Session | null) {
  if (session) sessionStorage.setItem(sessionKey, JSON.stringify(session))
  else sessionStorage.removeItem(sessionKey)
}
