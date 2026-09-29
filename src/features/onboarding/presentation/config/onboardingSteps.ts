export const onboardingSteps = [
  {
    path: '/products',
    element: '[data-tour="create-product"]',
    title: '1. Registra tu primer producto',
    description:
      'Empieza por Agregar producto. Escribe su nombre, código, precio sin impuestos y los impuestos que correspondan. Guarda el producto para poder seleccionarlo en una venta.',
    next: 'Después, el cliente',
  },
  {
    path: '/customers',
    element: '[data-tour="create-customer"]',
    title: '2. Registra a tu cliente',
    description:
      'En Agregar cliente completa su identificación, nombre y datos fiscales. Revisa la información y guarda. Necesitas un producto y un cliente registrados antes de realizar la venta.',
    next: 'Preparar la venta',
  },
  {
    path: '/sales/new',
    element: '[data-tour="sale-customer"]',
    title: '3. Prepara la venta',
    description:
      'Selecciona al cliente y la numeración disponible para tu factura. Puedes agregar una observación. La referencia de la venta se genera automáticamente.',
    next: 'Agregar productos',
  },
  {
    path: '/sales/new',
    element: '[data-tour="sale-products"]',
    title: '4. Agrega los productos',
    description:
      'Elige los productos que registraste e indica la cantidad y, si corresponde, el descuento. Usa Agregar producto para incluir más artículos.',
    next: 'Configurar el pago',
  },
  {
    path: '/sales/new',
    element: '[data-tour="sale-payments"]',
    title: '5. Indica cómo te pagan',
    description:
      'Selecciona contado o crédito, el medio de pago y el monto. Si es a crédito, indica el vencimiento. Puedes agregar varios pagos; su suma debe coincidir con el total de la venta.',
    next: 'Revisar el total',
  },
  {
    path: '/sales/new',
    element: '[data-tour="sale-summary"]',
    title: '6. Revisa y genera la factura',
    description:
      'Comprueba el total y los datos antes de usar Crear y validar factura. Si el resultado queda pendiente, revisa esa misma venta antes de iniciar otra. Este recorrido solo explica los pasos; no registra ventas.',
    next: 'Ver las facturas',
  },
  {
    path: '/invoices',
    element: '[data-tour="invoice-history"]',
    title: '7. Consulta tus facturas',
    description:
      'Aquí encontrarás tus facturas y su estado. Abre el detalle para consultar los datos y descargar los documentos cuando estén disponibles. ¡Ahora comienza registrando tu primer producto!',
    next: 'Ir a crear mi producto',
  },
]
