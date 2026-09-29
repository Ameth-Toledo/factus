import type { Customer } from '../../domain/models/Customer'
import type { Product } from '../../domain/models/Product'
import type { useCatalogViewModel } from '../viewmodel/useCatalogViewModel'

export default function CatalogList({
  busy,
  loading,
  setLoading,
  setRevision,
  rows,
  onEdit,
  remove,
  offset,
  setOffset,
  kind,
}: Pick<
  ReturnType<typeof useCatalogViewModel>,
  | 'busy'
  | 'loading'
  | 'setLoading'
  | 'setRevision'
  | 'rows'
  | 'remove'
  | 'offset'
  | 'setOffset'
> & {
  kind: 'customers' | 'products'
  onEdit: (row: Customer | Product) => void
}) {
  return (
    <>
      <h3>Registros</h3>
      <button
        className="secondary"
        disabled={busy || loading}
        onClick={() => {
          setLoading(true)
          setRevision((v) => v + 1)
        }}
      >
        Actualizar lista
      </button>
      {loading ? (
        <p role="status">Cargando…</p>
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{kind === 'customers' ? 'Identificación' : 'Código'}</th>
                  <th>Nombre</th>
                  <th>
                    {kind === 'customers' ? 'Correo' : 'Precio sin impuestos'}
                  </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      {'identification' in row
                        ? row.identification
                        : row.code_reference}
                    </td>
                    <td>
                      {'names' in row ? row.names || row.company : row.name}
                    </td>
                    <td>{'email' in row ? row.email : row.price}</td>
                    <td>
                      <button
                        className="secondary"
                        disabled={busy}
                        onClick={() => onEdit(row)}
                      >
                        Editar
                      </button>
                      <button
                        className="danger"
                        disabled={busy}
                        onClick={() => void remove(row)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && <p>No hay registros en esta página.</p>}
        </>
      )}
      <div className="actions">
        <button
          className="secondary"
          disabled={offset === 0 || loading || busy}
          onClick={() => {
            setLoading(true)
            setOffset(offset - 20)
          }}
        >
          Anterior
        </button>
        <span>Página {offset / 20 + 1}</span>
        <button
          className="secondary"
          disabled={rows.length < 20 || loading || busy}
          onClick={() => {
            setLoading(true)
            setOffset(offset + 20)
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
