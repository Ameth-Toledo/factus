import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../ui/PageHeading'

export default function NotFoundView() {
  return (
    <section>
      <PageHeading
        title="Página no encontrada"
        description="La dirección que buscas no está disponible en este espacio."
      />
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-6 py-20 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
          <FileQuestion
            className="size-7 text-neutral-500"
            aria-hidden="true"
          />
        </span>
        <h2 className="mt-5 text-lg font-semibold text-neutral-200">
          Volvamos al inicio
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Desde el dashboard puedes acceder a todas las secciones.
        </p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-black hover:bg-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al dashboard
        </Link>
      </div>
    </section>
  )
}
