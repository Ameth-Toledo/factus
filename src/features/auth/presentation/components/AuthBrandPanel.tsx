import { ArrowUpRight, Check, ReceiptText } from 'lucide-react'
import Brand from '../../../../shared/components/ui/Brand'

export default function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-black px-12 py-10 text-white lg:flex xl:px-16">
      <div
        className="pointer-events-none absolute -right-44 bottom-0 size-[560px] rounded-full border-[70px] border-white/[0.025]"
        aria-hidden="true"
      />
      <Brand />
      <div className="relative py-16">
        <p className="mb-6 text-[10px] font-bold tracking-[0.25em] text-neutral-300">
          MENOS TAREAS. MÁS POSIBILIDADES.
        </p>
        <h2 className="max-w-lg text-5xl leading-[1.15] font-semibold tracking-tight">
          Tu negocio,
          <br />
          en un solo
          <br />
          <span className="text-neutral-400">lugar.</span>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-400">
          De tu primer cliente a tu próxima factura. Dale a tu negocio el
          espacio que necesita para crecer.
        </p>
        <div className="mt-10 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <span className="flex size-11 items-center justify-center rounded-xl bg-neutral-500/20 text-neutral-300">
              <ReceiptText className="size-6" aria-hidden="true" />
            </span>
            <ArrowUpRight
              className="size-5 text-neutral-400"
              aria-hidden="true"
            />
          </div>
          <p className="mt-5 text-base font-medium">
            Todo conectado. Todo más simple.
          </p>
          <div className="mt-4 space-y-3">
            {[
              'Tu directorio de clientes',
              'Tu catálogo de productos',
              'Tu facturación en línea',
            ].map((label) => (
              <p
                key={label}
                className="flex items-center gap-2 text-xs text-neutral-400"
              >
                <Check
                  className="size-3.5 text-neutral-400"
                  aria-hidden="true"
                />
                {label}
              </p>
            ))}
          </div>
        </div>
      </div>
      <p className="relative text-xs text-neutral-400">
        Factus · Un espacio para seguir creciendo.
      </p>
    </aside>
  )
}
