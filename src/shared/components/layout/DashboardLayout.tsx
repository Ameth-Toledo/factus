import { Outlet } from 'react-router-dom'
import type { Session } from '../../../features/auth/domain/models/Session'
import AppSidebar from './AppSidebar'
import MobileNavigation from './MobileNavigation'

export default function DashboardLayout({
  session,
  onLogout,
}: {
  session: Session
  onLogout: () => void
}) {
  return (
    <div className="min-h-screen bg-black font-sans text-neutral-100 selection:bg-neutral-500/30">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-neutral-950 focus:p-3"
      >
        Saltar al contenido
      </a>
      <AppSidebar session={session} onLogout={onLogout} />
      <div className="lg:pl-64">
        <main
          id="main-content"
          className="mx-auto max-w-7xl px-5 pt-8 pb-24 sm:px-8 lg:px-10 lg:py-10"
        >
          <Outlet />
        </main>
      </div>
      <MobileNavigation onLogout={onLogout} />
    </div>
  )
}
