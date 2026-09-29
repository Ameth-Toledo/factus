import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../../../core/routes/AppRoutes'
import { useSessionViewModel } from '../../../features/auth/presentation/viewmodel/useSessionViewModel'

export default function AppView() {
  const { session, setSession, logout } = useSessionViewModel()

  return (
    <BrowserRouter>
      <AppRoutes session={session} onLogin={setSession} onLogout={logout} />
    </BrowserRouter>
  )
}
