import type { ReactNode } from 'react'

export default function WorkspaceContent({
  contained = true,
  children,
}: {
  contained?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={`${contained ? 'rounded-2xl border border-neutral-700 bg-neutral-950 p-5 sm:p-8' : ''} [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:my-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h4]:my-4 [&_h4]:font-medium [&_p]:my-3 [&_p]:text-sm [&_label]:flex [&_label]:flex-col [&_label]:gap-2 [&_label]:text-sm [&_label]:font-medium [&_input]:min-w-0 [&_input]:bg-black [&_input]:text-neutral-100 [&_input]:accent-neutral-500 [&_input]:placeholder:text-neutral-500 [&_input]:rounded-lg [&_input]:border [&_input]:border-neutral-700 [&_input]:px-3 [&_input]:py-2 [&_input:focus]:outline-neutral-500 [&_select]:rounded-lg [&_select]:border [&_select]:border-neutral-700 [&_select]:bg-black [&_select]:text-neutral-100 [&_select]:px-3 [&_select]:py-2 [&_button]:my-2 [&_button]:mr-2 [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:bg-neutral-700 [&_button]:px-4 [&_button]:py-2 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-50 [&_.secondary]:bg-neutral-800 [&_.secondary]:text-neutral-200 [&_.danger]:bg-rose-600 [&_.error]:text-rose-300 [&_.grid]:grid [&_.grid]:gap-4 sm:[&_.grid]:grid-cols-2 [&_.row]:my-4 [&_.row]:flex [&_.row]:flex-wrap [&_.row]:items-end [&_.row]:gap-3 [&_.actions]:my-4 [&_.actions]:flex [&_.actions]:flex-wrap [&_.actions]:items-center [&_.actions]:gap-2 [&_.table-wrap]:overflow-x-auto [&_table]:w-full [&_table]:text-left [&_table]:text-sm [&_th]:border-b [&_th]:border-neutral-700 [&_th]:px-3 [&_th]:py-3 [&_th]:text-neutral-400 [&_td]:border-b [&_td]:border-neutral-800 [&_td]:px-3 [&_td]:py-3 [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:bg-neutral-800 [&_pre]:p-4 [&_a]:text-neutral-300 [&_.wrap]:break-all [&_fieldset:disabled]:opacity-60`}
    >
      {children}
    </div>
  )
}
