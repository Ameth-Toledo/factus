import type { LucideIcon } from 'lucide-react'

export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string
  value: number | null
  detail: string
  icon: LucideIcon
  tone: string
}) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-neutral-400">{label}</p>
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-neutral-50">
        {value === null ? '—' : value.toLocaleString('es')}
      </p>
      <p className="mt-2 text-xs text-neutral-400">{detail}</p>
    </article>
  )
}
