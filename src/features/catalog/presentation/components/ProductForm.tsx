import type { useProductsViewModel } from '../viewmodel/useProductsViewModel'
import CatalogFields from './CatalogFields'
import CatalogTaxes from './CatalogTaxes'

export default function ProductForm({
  editing,
  busy,
  formVersion,
  fields,
  taxes,
  setTaxes,
  submit,
  onCancel,
}: Pick<
  ReturnType<typeof useProductsViewModel>,
  'editing' | 'busy' | 'formVersion' | 'fields' | 'taxes' | 'setTaxes'
> & {
  submit: ReturnType<typeof useProductsViewModel>['submitProduct']
  onCancel: () => void
}) {
  const basicFields = fields.filter((field) =>
    ['code_reference', 'name', 'price'].includes(field.key),
  )
  const extraFields = fields.filter(
    (field) => !['code_reference', 'name', 'price'].includes(field.key),
  )

  return (
    <form
      key={formVersion}
      onSubmit={submit}
      className="[&_.grid]:grid-cols-1 [&_.grid]:gap-4 sm:[&_.grid]:grid-cols-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-neutral-400 [&_label:not(.tax-excluded)]:flex [&_label:not(.tax-excluded)]:min-w-0 [&_label:not(.tax-excluded)]:flex-col [&_label:not(.tax-excluded)]:gap-2 [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:min-w-0 [&_input:not([type=checkbox])]:rounded-lg [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-neutral-800 [&_input:not([type=checkbox])]:bg-black [&_input:not([type=checkbox])]:px-3 [&_input:not([type=checkbox])]:py-3 [&_input:not([type=checkbox])]:text-sm [&_input:not([type=checkbox])]:text-neutral-100 [&_input]:outline-none [&_input:focus]:border-neutral-500 [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40"
    >
      <p className="mb-6 text-sm text-neutral-400">
        Completa los datos de tu producto. Los campos con * son obligatorios.
      </p>
      <fieldset disabled={busy} className="min-w-0 space-y-6">
        <section>
          <h3 className="mb-4 text-sm font-semibold text-neutral-100">
            Información principal
          </h3>
          <CatalogFields fields={basicFields} editing={editing} />
        </section>
        <section className="border-t border-neutral-800 pt-5">
          <h3 className="mb-4 text-sm font-semibold text-neutral-100">
            Clasificación y notas
          </h3>
          <CatalogFields fields={extraFields} editing={editing} />
        </section>
        <section className="border-t border-neutral-800 pt-5">
          <CatalogTaxes taxes={taxes} setTaxes={setTaxes} kind="products" />
        </section>
        <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-800 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200"
          >
            {busy ? 'Guardando…' : 'Guardar producto'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
