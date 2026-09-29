import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from 'lucide-react'
import type { useAuthViewModel } from '../viewmodel/useAuthViewModel'
import FormField from '../../../../shared/components/ui/FormField'

export default function AuthForm({
  register,
  busy,
  submit,
  toggleMode,
}: Pick<
  ReturnType<typeof useAuthViewModel>,
  'register' | 'busy' | 'submit' | 'toggleMode'
>) {
  return (
    <form
      onSubmit={submit}
      className="w-full"
    >
      <fieldset disabled={busy} className="space-y-5">
        {register && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nombre"
                name="first_name"
                required
                autoComplete="given-name"
                placeholder="Tu nombre"
              />
              <FormField
                label="Apellido"
                name="last_name"
                required
                autoComplete="family-name"
                placeholder="Tu apellido"
              />
            </div>
            <FormField
              label="Empresa (opcional)"
              name="business_name"
              autoComplete="organization"
              placeholder="Nombre de tu negocio"
            />
          </>
        )}
        <FormField
          label="Correo electrónico"
          icon={Mail}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@empresa.com"
        />
        <FormField
          label="Contraseña"
          icon={LockKeyhole}
          name="password"
          type="password"
          required
          minLength={register ? 8 : undefined}
          autoComplete={register ? 'new-password' : 'current-password'}
          placeholder={
            register ? 'Mínimo 8 caracteres' : 'Ingresa tu contraseña'
          }
        />
        <button className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-100 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500 disabled:cursor-wait disabled:opacity-60">
          {busy ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {busy ? 'Procesando…' : register ? 'Crear cuenta' : 'Iniciar sesión'}
          {!busy && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
        <p className="pt-3 text-center text-sm text-neutral-400">
          {register ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="cursor-pointer font-semibold text-neutral-300 hover:text-neutral-200"
          >
            {register ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </fieldset>
    </form>
  )
}
