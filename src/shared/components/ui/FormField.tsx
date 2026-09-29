import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

export default function FormField({
  label,
  icon: Icon,
  ...input
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: LucideIcon
}) {
  return (
    <label className="block text-sm font-medium text-neutral-200">
      {label}
      <span className="relative mt-2 block">
        {Icon && (
          <Icon
            className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-neutral-400"
            aria-hidden="true"
          />
        )}
        <input
          {...input}
          className={`w-full rounded-xl border border-neutral-700 bg-neutral-950 py-3 pr-4 text-sm text-neutral-50 transition outline-none placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-500/20 disabled:opacity-60 ${Icon ? 'pl-10' : 'pl-4'}`}
        />
      </span>
    </label>
  )
}
