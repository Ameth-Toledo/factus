import { ArrowUpRight, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Session } from '../../../features/auth/domain/models/Session'
import Brand from '../ui/Brand'
import SidebarNavigation from './SidebarNavigation'

export default function AppSidebar({
  session,
  onLogout,
}: {
  session: Session
  onLogout: () => void
}) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-6 lg:flex">
      <Link
        to="/dashboard"
        aria-label="Factus, ir al inicio"
        className="mb-12 w-fit text-neutral-50"
      >
        <Brand />
      </Link>
      <p className="mb-4 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400">
        ESPACIO DE TRABAJO
      </p>
      <SidebarNavigation />
      <div className="mt-auto space-y-6 pt-10">
        <div className="rounded-2xl bg-black p-5 text-white">
          <p className="text-sm font-semibold">Tu negocio, organizado.</p>
          <p className="mt-2 text-xs leading-5 text-neutral-400">
            Clientes, productos y facturas en un mismo lugar.
          </p>
          <Link
            to="/invoices"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white"
          >
            Crear una factura{' '}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="border-t border-neutral-800 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-500/15 text-sm font-bold text-neutral-300"
              aria-hidden="true"
            >
              {session.user.first_name.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-100">
                {session.user.first_name} {session.user.last_name}
              </p>
              <p className="truncate text-xs text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  )
}
