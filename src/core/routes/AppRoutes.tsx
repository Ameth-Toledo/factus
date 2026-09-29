import { Navigate, Route, Routes } from 'react-router-dom'
import type { Session } from '../../features/auth/domain/models/Session'
import Auth from '../../features/auth/presentation/views/Auth'
import Catalog from '../../features/catalog/presentation/views/Catalog'
import ProductsView from '../../features/catalog/presentation/views/ProductsView'
import Invoices from '../../features/invoices/presentation/views/Invoices'
import DashboardView from '../../features/dashboard/presentation/views/DashboardView'
import DashboardLayout from '../../shared/components/layout/DashboardLayout'
import WorkspaceLayout from '../../shared/components/layout/WorkspaceLayout'
import NotFoundView from '../../shared/components/views/NotFoundView'

export default function AppRoutes({
  session,
  onLogin,
  onLogout,
}: {
  session: Session | null
  onLogin: (session: Session) => void
  onLogout: () => void
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={session ? '/dashboard' : '/login'} replace />}
      />
      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth onLogin={onLogin} />
          )
        }
      />
      <Route
        element={
          session ? (
            <DashboardLayout
              key={session.user.id}
              session={session}
              onLogout={onLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route
          path="/dashboard"
          element={session && <DashboardView session={session} />}
        />
        <Route
          path="/products"
          element={session && <ProductsView session={session} />}
        />
        <Route element={<WorkspaceLayout />}>
          <Route
            path="/customers"
            element={
              session && (
                <Catalog key="customers" kind="customers" session={session} />
              )
            }
          />
          <Route
            path="/invoices"
            element={session && <Invoices session={session} />}
          />
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  )
}
