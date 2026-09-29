import { UsersRound, Plus } from 'lucide-react'
import type { useCustomersViewModel } from '../viewmodel/useCustomersViewModel'
import TableToolbar from '../../../../shared/components/ui/TableToolbar'
import TablePagination from '../../../../shared/components/ui/TablePagination'
import TableState from '../../../../shared/components/ui/TableState'
import ActionButton from '../../../../shared/components/ui/ActionButton'
import CustomerTableRow from './CustomerTableRow'

export default function CustomersTable({
  customers,
  busy,
  loading,
  offset,
  error,
  refresh,
  previousPage,
  nextPage,
  openCreate,
  openEdit,
  remove,
}: Pick<
  ReturnType<typeof useCustomersViewModel>,
  | 'customers'
  | 'busy'
  | 'loading'
  | 'offset'
  | 'error'
  | 'refresh'
  | 'previousPage'
  | 'nextPage'
  | 'openCreate'
  | 'openEdit'
  | 'remove'
>) {
  return (
    <section
      aria-label="Directorio de clientes"
      className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
    >
      <TableToolbar
        title="Directorio de clientes"
        icon={UsersRound}
        count={customers.length}
        loading={loading}
        busy={busy}
        onRefresh={refresh}
      />
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Tabla de clientes desplazable"
      >
        <table className="w-full min-w-[680px] text-left text-sm">
          <caption className="sr-only">
            Clientes, identificación, contacto y acciones.
          </caption>
          <thead className="border-y border-neutral-800 bg-white/[0.015] text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
            <tr>
              <th scope="col" className="py-3 pr-4 pl-6">
                Cliente
              </th>
              <th scope="col" className="px-4 py-3">
                Identificación
              </th>
              <th scope="col" className="px-5 py-3">
                Contacto
              </th>
              <th scope="col" className="py-3 pr-6 pl-4 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading || !customers.length ? (
              <TableState
                columns={4}
                loading={loading}
                error={error}
                title="No hay clientes en esta página"
                description="Agrega tus clientes para tener sus datos siempre a la mano."
                icon={UsersRound}
                action={
                  <ActionButton
                    variant="secondary"
                    onClick={openCreate}
                    disabled={busy}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Agregar cliente
                  </ActionButton>
                }
              />
            ) : (
              customers.map((customer) => (
                <CustomerTableRow
                  key={customer.id}
                  customer={customer}
                  busy={busy}
                  onEdit={openEdit}
                  onRemove={(row) => void remove(row)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        offset={offset}
        count={customers.length}
        loading={loading}
        busy={busy}
        onPrevious={previousPage}
        onNext={nextPage}
      />
    </section>
  )
}
