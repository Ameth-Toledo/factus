import {
  LayoutDashboard,
  UsersRound,
  Package,
  ReceiptText,
  ShoppingCart,
} from 'lucide-react'

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
    path: '/sales/new',
    label: 'Realizar venta',
    title: 'Realizar venta',
    icon: ShoppingCart,
  },
  {
    path: '/invoices',
    label: 'Facturas',
    title: 'Facturas',
    icon: ReceiptText,
  },
]
