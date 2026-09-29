import { LayoutDashboard, UsersRound, Package, ReceiptText } from 'lucide-react'

export const navigation = [
  {
    path: '/dashboard',
    label: 'Inicio',
    title: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/customers',
    label: 'Clientes',
    title: 'Clientes',
    icon: UsersRound,
  },
  {
    path: '/products',
    label: 'Productos',
    title: 'Productos y servicios',
    icon: Package,
  },
  {
    path: '/invoices',
    label: 'Facturas',
    title: 'Facturas',
    icon: ReceiptText,
  },
]
