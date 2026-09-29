export default function DashboardWelcome() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <h1 className="sr-only">Inicio</h1>
      <img
        src="/assets/banner.png"
        alt="Factus — Facturación Electrónica"
        width={1201}
        height={376}
        className="block h-auto w-full max-w-md rounded-2xl"
      />
      <img
        src="/assets/mascotas.png"
        alt="Mascotas de Factus"
        width={500}
        height={377}
        className="ml-auto block h-auto w-60 max-w-full"
      />
    </div>
  )
}
