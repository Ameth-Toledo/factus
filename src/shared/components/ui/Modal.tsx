import { useId } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useModal } from '../../hooks/useModal'

export default function Modal({
  title,
  children,
  busy = false,
  onClose,
}: {
  title: string
  children: ReactNode
  busy?: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const dialogRef = useModal()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onClose()
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto [scrollbar-color:transparent_transparent] [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-track]:bg-transparent rounded-2xl border border-neutral-700 bg-neutral-950 p-5 text-neutral-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 id={titleId} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          className="secondary flex size-9 p-0! shrink-0 cursor-pointer items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Cerrar modal"
          disabled={busy}
          onClick={onClose}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  )
}
