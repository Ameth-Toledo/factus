import { Building2, Pencil, Trash2, UserRound } from 'lucide-react'
import type { Customer } from '../../domain/models/Customer'

export default function CustomerTableRow({
  customer,
  busy,
  onEdit,
  onRemove,
}: {
  customer: Customer
  busy: boolean
  onEdit: (customer: Customer) => void
  onRemove: (customer: Customer) => void
}) {
  const name = customer.names || customer.company
  const Icon = customer.legal_organization_code === '1' ? Building2 : UserRound

  return (
    <tr className="group border-b border-neutral-800/70 transition-colors last:border-b-0 hover:bg-white/[0.025]">
      <td className="py-5 pr-4 pl-6">
        <div className="flex items-center gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 group-hover:text-neutral-200">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span
              title={name}
              className="block max-w-64 truncate font-medium text-neutral-100"
            >
              {name || 'Sin nombre'}
            </span>
            <span className="mt-1 block text-xs text-neutral-500">
              Cliente #{customer.id}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-5">
        <span
          className="inline-block max-w-48 truncate rounded-md border border-neutral-800 bg-neutral-900/70 px-2.5 py-1 font-mono text-xs text-neutral-400"
          title={customer.identification}
        >
          {customer.identification}
          {customer.dv ? `-${customer.dv}` : ''}
        </span>
      </td>
      <td className="px-5 py-5">
        <span
          className="block max-w-60 truncate text-neutral-300"
          title={customer.email}
        >
          {customer.email || 'Sin correo'}
        </span>
        <span className="mt-1 block text-xs text-neutral-500">
          {customer.phone || 'Sin teléfono'}
        </span>
      </td>
      <td className="py-5 pr-6 pl-4">
        <div className="flex justify-end gap-1.5">
          <button
            type="button"
            disabled={busy}
            onClick={() => onEdit(customer)}
            aria-label={`Editar ${name}`}
            title="Editar cliente"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onRemove(customer)}
            aria-label={`Eliminar ${name}`}
            title="Eliminar cliente"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-neutral-500 hover:bg-rose-500/10 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  )
}
