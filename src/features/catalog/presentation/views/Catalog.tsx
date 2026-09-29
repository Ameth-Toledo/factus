import CatalogForm from '../components/CatalogForm'
import CatalogList from '../components/CatalogList'
import type { Session } from '../../../auth/domain/models/Session'
import { useCatalogViewModel } from '../viewmodel/useCatalogViewModel'

export default function Catalog({
  kind,
  session,
}: {
  kind: 'customers' | 'products'
  session: Session
}) {
  const {
    rows,
    offset,
    setOffset,
    setRevision,
    loading,
    setLoading,
    busy,
    error,
    notice,
    editing,
    edit,
    formVersion,
    taxes,
    setTaxes,
    fields,
    reset,
    submit,
    remove,
  } = useCatalogViewModel({ kind, session })
  return (
    <section>
      <h2>{kind === 'customers' ? 'Clientes' : 'Productos y servicios'}</h2>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      <CatalogForm
        submit={submit}
        formVersion={formVersion}
        editing={editing}
        busy={busy}
        fields={fields}
        taxes={taxes}
        setTaxes={setTaxes}
        reset={reset}
        kind={kind}
      />
      <CatalogList
        busy={busy}
        loading={loading}
        setLoading={setLoading}
        setRevision={setRevision}
        rows={rows}
        onEdit={edit}
        remove={remove}
        offset={offset}
        setOffset={setOffset}
        kind={kind}
      />
    </section>
  )
}
