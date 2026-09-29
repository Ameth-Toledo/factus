import { LogOut } from 'lucide-react'
import type { Session } from '../../../features/auth/domain/models/Session'
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
      <a
        href="https://www.amethdev.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar el sitio web de Ameth Toledo"
        className="mb-12 flex w-fit items-center gap-0 text-neutral-50"
      >
        <img
          src="/assets/logo.png"
          alt=""
          className="size-15 shrink-0 object-contain"
        />
        <span className="text-lg font-semibold tracking-tight">
          Ameth Toledo
        </span>
      </a>
      <p className="mb-4 px-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400">
        ESPACIO DE TRABAJO
      </p>
      <SidebarNavigation />
      <div className="mt-auto space-y-6 pt-10">
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
