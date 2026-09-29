import { useEffect, useRef } from 'react'

export function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    dialog.querySelector<HTMLInputElement>('input:not([disabled])')?.focus()

    function keepFocusInside(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !dialog) return

      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 && element.getClientRects().length > 0,
      )
      const first = controls[0]
      const last = controls.at(-1)

      if (!first || !last) {
        event.preventDefault()
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    dialog.addEventListener('keydown', keepFocusInside)

    return () => {
      dialog.removeEventListener('keydown', keepFocusInside)
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus()
      }
    }
  }, [])

  return dialogRef
}
