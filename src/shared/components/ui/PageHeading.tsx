import type { ReactNode } from 'react'

export default function PageHeading({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}
