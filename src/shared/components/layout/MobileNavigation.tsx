import { LogOut, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import SidebarNavigation from './SidebarNavigation'

export default function MobileNavigation({
  onLogout,
}: {
  onLogout: () => void
}) {
  const { pathname } = useLocation()

  return (
    <details key={pathname} className="fixed right-5 bottom-5 z-40 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm font-medium text-neutral-100 shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400">
        <Menu className="size-5" aria-hidden="true" />
        Menú
      </summary>
      <div className="absolute right-0 bottom-full mb-3 w-64 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-neutral-800 bg-neutral-950 p-3 shadow-2xl">
        <SidebarNavigation />
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm text-rose-300 hover:bg-neutral-900"
        >
          <LogOut className="size-5" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </details>
  )
}
