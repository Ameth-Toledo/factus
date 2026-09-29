import type { useCatalogViewModel } from '../viewmodel/useCatalogViewModel'
import CatalogFields from './CatalogFields'
import CatalogTaxes from './CatalogTaxes'

export default function CatalogForm({
  submit,
  formVersion,
  editing,
  busy,
  fields,
  taxes,
  setTaxes,
  reset,
  kind,
  hideTitle = false,
  onCancel,
}: Pick<
  ReturnType<typeof useCatalogViewModel>,
  | 'submit'
  | 'formVersion'
  | 'editing'
  | 'busy'
  | 'fields'
  | 'taxes'
  | 'setTaxes'
  | 'reset'
> & {
  kind: 'customers' | 'products'
  hideTitle?: boolean
  onCancel?: () => void
}) {
  return (
    <>
      <form onSubmit={submit} key={formVersion}>
        {!hideTitle && (
          <h3>{editing ? `Editar #${editing.id}` : 'Nuevo registro'}</h3>
        )}
        <fieldset disabled={busy}>
          <CatalogFields fields={fields} editing={editing} />
          <CatalogTaxes taxes={taxes} setTaxes={setTaxes} kind={kind} />
          <div className="actions">
            <button>{busy ? 'Guardando…' : 'Guardar'}</button>
            {(editing || onCancel) && (
              <button
                type="button"
                className="secondary"
                onClick={onCancel ?? reset}
              >
                {onCancel ? 'Cancelar' : 'Cancelar edición'}
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  )
}
