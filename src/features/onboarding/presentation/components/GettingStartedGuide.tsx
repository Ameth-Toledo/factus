import { CircleHelp } from 'lucide-react'
import { useOnboardingViewModel } from '../viewmodel/useOnboardingViewModel'

export default function GettingStartedGuide({ userId }: { userId: number }) {
  const { start, active } = useOnboardingViewModel(userId)

  return (
    <button
      type="button"
      onClick={start}
      disabled={active}
      className="fixed right-5 bottom-20 z-30 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-3 text-xs font-medium text-neutral-200 shadow-lg hover:bg-neutral-800 disabled:hidden lg:bottom-5"
    >
      <CircleHelp className="size-4" aria-hidden="true" />
      Guía de inicio
    </button>
  )
}
