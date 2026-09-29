const statuses: Record<string, { label: string; className: string }> = {
  validated: {
    label: 'Validada',
    className: 'bg-emerald-500/10 text-emerald-300',
  },
  not_validated: {
    label: 'Sin validar',
    className: 'bg-neutral-800 text-neutral-300',
  },
  rejected: { label: 'Rechazada', className: 'bg-rose-500/10 text-rose-300' },
  pending: { label: 'Pendiente', className: 'bg-amber-500/10 text-amber-300' },
  unknown: {
    label: 'Sin confirmar',
    className: 'bg-amber-500/10 text-amber-300',
  },
}

export default function InvoiceStatusBadge({ status }: { status: string }) {
  const presentation = statuses[status] ?? {
    label: status,
    className: 'bg-neutral-800 text-neutral-300',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${presentation.className}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {presentation.label}
    </span>
  )
}
