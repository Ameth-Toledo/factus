import { useEffect, useState } from 'react'
import { loadSession } from '../../data/session/loadSession.ts'
import { saveSession } from '../../data/session/saveSession.ts'

export function useSessionViewModel() {
  const [session, setSession] = useState(loadSession)
  useEffect(() => {
    const logout = () => setSession(null)
    window.addEventListener('session-expired', logout)
    const timer = session
      ? setTimeout(
          () => {
            saveSession(null)
            setSession(null)
          },
          Math.max(0, session.expiresAt - Date.now()),
        )
      : undefined
    return () => {
      window.removeEventListener('session-expired', logout)
      clearTimeout(timer)
    }
  }, [session])
  function logout() {
    saveSession(null)
    setSession(null)
  }
  return { session, setSession, logout }
}
