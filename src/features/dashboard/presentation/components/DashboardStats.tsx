import { UsersRound, Package, ReceiptText, Clock3 } from 'lucide-react'
import type { DashboardSummary } from '../../domain/models/DashboardSummary'
import StatCard from './StatCard'

export default function DashboardStats({
  summary,
  pendingCount,
}: {
  summary: DashboardSummary | null
  pendingCount: number
}) {
  return (
    <section
      aria-label="Resumen del negocio"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <StatCard
        label="Clientes"
        value={summary?.customerCount ?? null}
        detail="En tu directorio"
        icon={UsersRound}
        tone="bg-neutral-500/15 text-neutral-300"
      />
      <StatCard
        label="Productos"
        value={summary?.productCount ?? null}
        detail="En tu catálogo"
        icon={Package}
        tone="bg-neutral-500/10 text-neutral-300"
      />
      <StatCard
        label="Facturas consultadas"
        value={summary?.invoices.length ?? null}
        detail="Primera página · hasta 20 registros"
        icon={ReceiptText}
        tone="bg-emerald-500/10 text-emerald-300"
      />
      <StatCard
        label="Por revisar"
        value={summary ? pendingCount : null}
        detail="Dentro de las facturas consultadas"
        icon={Clock3}
        tone="bg-amber-500/10 text-amber-300"
      />
    </section>
  )
}
