import type { useCatalogViewModel } from '../viewmodel/useCatalogViewModel'

export default function CatalogFields({
  fields,
  editing,
}: Pick<ReturnType<typeof useCatalogViewModel>, 'fields' | 'editing'>) {
  return (
    <>
      <div className="grid">
        {fields.map((field) => {
          const values = editing as unknown as Record<string, unknown> | null
          const current = values?.[field.key]
          const initial = Array.isArray(current)
            ? current.join(', ')
            : String(current ?? field.initial ?? '')
          return (
            <label key={field.key}>
              {field.label}
              {field.required ? ' *' : ''}
              {field.options ? (
                <select name={field.key} defaultValue={initial}>
                  {field.options.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.key}
                  defaultValue={initial}
                  type={field.type || 'text'}
                  required={field.required}
                />
              )}
            </label>
          )
        })}
      </div>
    </>
  )
}
