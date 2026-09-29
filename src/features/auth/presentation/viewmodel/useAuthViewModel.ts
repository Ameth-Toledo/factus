import type { AuthRepository } from '../../domain/interfaces/AuthRepository'
import { authRepository } from '../../di/authRepository'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { errorMessage } from '../../../../shared/errors/errorMessage'
import type { Session } from '../../domain/models/Session'

export function useAuthViewModel(
  {
    onLogin,
  }: {
    onLogin: (session: Session) => void
  },
  repository: AuthRepository = authRepository,
) {
  const [register, setRegister] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setError('')
    setNotice('')
    const email = String(form.get('email'))
    const password = String(form.get('password'))
    try {
      if (register) {
        await repository.register({
          first_name: form.get('first_name'),
          last_name: form.get('last_name'),
          business_name: form.get('business_name') || '',
          email,
          password,
        })
        setNotice('Cuenta creada. Inicia sesión con tu correo y contraseña.')
        setRegister(false)
      } else onLogin(await repository.login(email, password))
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }
  function toggleMode() {
    setRegister(!register)
    setError('')
    setNotice('')
  }

  return { register, busy, error, notice, submit, toggleMode }
}
