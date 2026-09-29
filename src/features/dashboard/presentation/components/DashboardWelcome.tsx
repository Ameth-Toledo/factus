import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardWelcome({ name }: { name: string }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-500/20 bg-neutral-950 px-6 py-8 text-white sm:px-9 sm:py-9">
      <div
        className="pointer-events-none absolute -top-24 -right-12 size-80 rounded-full border-[45px] border-white/5"
        aria-hidden="true"
      />
      <div className="relative max-w-xl">
        <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-300">
          TU NEGOCIO, EN UN VISTAZO
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Hola, {name}
          <span className="text-neutral-400">.</span>
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-300">
          Un nuevo día para seguir creciendo. Organiza tu catálogo y lleva tu
          facturación al día.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/invoices"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Plus className="size-4" aria-hidden="true" />
            Crear factura
          </Link>
          <Link
            to="/customers"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-neutral-300 hover:text-white"
          >
            Ver mis clientes
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
