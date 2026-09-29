import type { DashboardSummary } from '../../domain/models/DashboardSummary'

export default function DashboardStats({
  summary,
  pendingCount,
}: {
  summary: DashboardSummary | null
  pendingCount: number
}) {
  const metrics = [
    {
      label: 'Clientes',
      value: summary?.customerCount,
      detail: 'En tu directorio',
    },
    {
      label: 'Productos',
      value: summary?.productCount,
      detail: 'En tu catálogo',
    },
    {
      label: 'Facturas consultadas',
      value: summary?.invoices.length,
      detail: 'Primera página · hasta 20',
    },
    {
      label: 'Por revisar',
      value: summary ? pendingCount : undefined,
      detail: 'De las facturas consultadas',
    },
  ]

  return (
    <section
      aria-label="Resumen del negocio"
      className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0A]"
    >
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, detail }, index) => (
          <div
            key={label}
            className={`min-w-0 px-5 py-6 sm:px-6 ${index % 2 ? 'border-l border-neutral-800' : ''} ${index > 1 ? 'border-t border-neutral-800 lg:border-t-0 lg:border-l' : ''}`}
          >
            <dt className="text-xs font-medium text-neutral-400">{label}</dt>
            <dd
              className={`mt-3 text-3xl font-semibold tracking-tight tabular-nums ${index === 3 && pendingCount > 0 ? 'text-amber-200' : 'text-neutral-100'}`}
            >
              {value == null ? '—' : value.toLocaleString('es')}
            </dd>
            <dd className="mt-3 text-[11px] leading-5 text-neutral-500">
              {detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
