import { NavLink } from 'react-router-dom'
import { navigation } from '../../../core/routes/navigation'

export default function SidebarNavigation() {
  return (
    <nav aria-label="Navegación principal" className="space-y-1.5">
      {navigation.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path !== '/invoices'}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 ${isActive ? 'bg-neutral-500/15 text-neutral-300' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50'}`
          }
        >
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
