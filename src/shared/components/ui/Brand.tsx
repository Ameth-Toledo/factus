import { Layers2 } from 'lucide-react'

export default function Brand() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-xl bg-neutral-700 text-white">
        <Layers2 className="size-6" aria-hidden="true" />
      </span>
      <span className="text-2xl font-bold tracking-tight">
        factus<span className="text-neutral-400">.</span>
      </span>
    </span>
  )
}
