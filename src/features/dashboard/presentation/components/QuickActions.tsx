import { ArrowUpRight, UserPlus, PackagePlus, FilePlus2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const actions = [
  {
    to: '/customers',
    label: 'Gestionar clientes',
    detail: 'Conecta con quienes confían en ti',
    icon: UserPlus,
  },
  {
    to: '/products',
    label: 'Administrar productos',
    detail: 'Prepara tu próxima venta',
    icon: PackagePlus,
  },
  {
    to: '/sales/new',
    label: 'Realizar venta',
    detail: 'De la venta a la validación',
    icon: FilePlus2,
  },
]

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
      <h2 className="font-semibold text-neutral-50">Accesos rápidos</h2>
      <p className="mt-1 text-xs text-neutral-400">
        Menos pasos, más tiempo para tu negocio.
      </p>
      <div className="mt-5 space-y-3">
        {actions.map(({ to, label, detail, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-3 rounded-xl border border-neutral-800 p-4 transition hover:border-neutral-500/40 hover:bg-neutral-500/10"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 group-hover:bg-neutral-950 group-hover:text-neutral-300">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-100">{label}</p>
              <p className="mt-1 text-[11px] leading-4 text-neutral-400">
                {detail}
              </p>
            </div>
            <ArrowUpRight
              className="ml-auto size-4 shrink-0 text-neutral-300 group-hover:text-neutral-400"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
