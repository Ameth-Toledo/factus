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
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-neutral-700 bg-neutral-950 p-5 text-neutral-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="secondary shrink-0"
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
