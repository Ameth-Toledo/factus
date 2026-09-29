import { Outlet } from 'react-router-dom'
import WorkspaceContent from './WorkspaceContent'

export default function WorkspaceLayout() {
  return (
    <WorkspaceContent>
      <Outlet />
    </WorkspaceContent>
  )
}
