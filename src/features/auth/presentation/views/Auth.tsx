import { AlertCircle, CircleCheck } from 'lucide-react'
import type { Session } from '../../domain/models/Session'
import { useAuthViewModel } from '../viewmodel/useAuthViewModel'
import AuthBrandPanel from '../components/AuthBrandPanel'
import AuthForm from '../components/AuthForm'

export default function Auth({
  onLogin,
}: {
  onLogin: (session: Session) => void
}) {
  const { register, busy, error, notice, submit, toggleMode } =
    useAuthViewModel({ onLogin })

  return (
    <main className="grid min-h-screen bg-black font-sans text-neutral-100 selection:bg-neutral-500/30 lg:grid-cols-2">
      <AuthBrandPanel />
      <section className="flex flex-col px-6 py-8 sm:px-12 lg:min-h-screen lg:px-16">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-6 lg:py-12">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400">
            BIENVENIDO A FACTUS
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-50">
            {register ? 'Crear cuenta' : 'Iniciar sesión'}
          </h1>
          <p className="mt-3 mb-8 text-sm leading-6 text-neutral-400">
            {register
              ? 'Crea tu cuenta y organiza tu negocio desde un solo lugar.'
              : 'Inicia sesión para continuar con tu negocio.'}
          </p>
          {notice && (
            <p
              role="status"
              className="mb-5 flex items-start gap-2 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-300"
            >
              <CircleCheck
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              {notice}
            </p>
          )}
          {error && (
            <p
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl bg-rose-500/10 p-4 text-sm text-rose-300"
            >
              <AlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              {error}
            </p>
          )}
          <AuthForm
            register={register}
            busy={busy}
            submit={submit}
            toggleMode={toggleMode}
          />
        </div>
        <p className="text-center text-[11px] text-neutral-400">
          Factus · Facturación electrónica
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <a
            href="https://www.amethdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 transition hover:text-white"
          >
            Dev Ameth Toledo
          </a>
        </p>
      </section>
    </main>
  )
}
