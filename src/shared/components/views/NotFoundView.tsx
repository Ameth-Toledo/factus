import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundView() {
  return (
    <section className="rounded-2xl border border-neutral-700 bg-neutral-950 px-6 py-20 text-center">
      <FileQuestion
        className="mx-auto mb-5 size-12 text-neutral-400"
        aria-hidden="true"
      />
      <h1 className="text-2xl font-bold">No encontramos esta página</h1>
      <p className="mt-3 text-neutral-400">
        Puedes regresar al inicio para continuar.
      </p>
      <Link
        to="/dashboard"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-neutral-700 px-5 py-3 text-sm font-medium text-white"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al dashboard
      </Link>
    </section>
  )
}
