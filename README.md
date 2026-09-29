# Factus Web

React + TypeScript. Interfaz funcional para la API Go de `factus_api`.

## Organización MVVM

El código se organiza por funcionalidad en `src/features`: `auth`, `catalog`
(clientes y productos), `invoices` y `dashboard`.

- `domain/models/`: un archivo por modelo de dominio.
- `domain/interfaces/`: contratos de los repositorios con sus métodos y tipos de entrada/salida.
- `domain/money.ts` en facturas: cálculos monetarios existentes.
- `domain/prepareInvoiceSubmission.ts`: validación y preparación de pagos del envío.
- `data/`: repositorios HTTP y almacenamiento, en archivos separados.
- `data/operations/`: un archivo por operación del repositorio (guardar, actualizar, listar, eliminar, etc.). Los archivos `*Repository.ts` solo componen estas operaciones según su interfaz.
- `auth/data/session/` e `invoices/data/storage/`: lectura, escritura y eliminación del almacenamiento en archivos independientes.
- `di/`: conecta cada contrato con su implementación; los ViewModels reciben la interfaz y usan esta implementación por defecto.
- `presentation/views/`: composición de las pantallas.
- `presentation/components/`: formularios, listas y secciones visuales independientes.
- `presentation/viewmodel/`: estado y acciones separados por flujo (edición, listado, creación, consulta, carga de opciones y descarga).
- `presentation/config/`: definición de campos de clientes y productos.
- `presentation/mappers/` y `formatters/`: conversión de formularios y preparación de valores para mostrar.

`src/core/data/api.ts` gestiona el transporte HTTP JSON. La excepción de facturas
rechazadas con respuesta 422 pertenece al repositorio de facturas. La autenticación,
el almacenamiento de sesión y su ciclo de vida tienen módulos propios en `auth`.
`src/shared/components/views/AppView.tsx` conecta la sesión con React Router.
`src/core/routes/AppRoutes.tsx` define las rutas públicas y protegidas.
`src/App.tsx` únicamente renderiza `AppView`.
`src/shared/` contiene las utilidades de navegador y presentación de errores.

Cada módulo agrupa una responsabilidad: un cambio en almacenamiento no requiere
editar una vista, y un cambio en los campos de clientes no requiere editar el
ViewModel del catálogo. Los ViewModels de pantalla coordinan los flujos separados.
`src/App.css` es el único archivo CSS fuente y contiene la importación de Tailwind.
Los estilos se definen mediante clases de Tailwind en los componentes.

`CatalogRepository` define `list()`, `save()`, `update()`, `remove()`,
`allCustomers()` y `allProducts()`. `save()` crea con POST y `update()` edita con
PUT. Autenticación, facturas, opciones de facturación y descargas tienen contratos
propios con las operaciones que ya soporta cada flujo.

El formato se define en `.prettierrc.json` y `.editorconfig`: indentación de dos
espacios, saltos de línea LF y líneas de hasta 80 caracteres cuando sea posible.

## Ejecutar

Tailwind CSS 4 está integrado con el plugin `@tailwindcss/vite`. Sus utilidades
se cargan desde `src/App.css`, importado en `src/main.tsx`, con Preflight incluido.
El login, el dashboard y la navegación utilizan utilidades de Tailwind e iconos
de `lucide-react`. El contenedor de los módulos existentes les da estilos mediante
utilidades de Tailwind sin cambiar sus formularios ni operaciones.
La interfaz usa negro y grises neutros por defecto, incluidos formularios, tablas, menús y
mensajes de estado. El esquema de color nativo del navegador también es oscuro.

1. En el backend: `go run .` (PostgreSQL y las migraciones deben estar preparados).
2. En esta carpeta: `npm install` si faltan dependencias; luego `npm run dev`.
3. Abre http://127.0.0.1:5173 y crea una cuenta de la aplicación.

El proxy de Vite dirige `/api` a `http://127.0.0.1:8080`, elimina el prefijo y conserva el JWT. No hace falta habilitar CORS para este flujo local. Puedes configurar `API_PROXY_TARGET` copiando `.env.example` a `.env.local`. Nunca pongas contraseñas de PostgreSQL, tokens o credenciales de Factus en variables del frontend.

## Flujo

- Registro y login con correo/contraseña de tu aplicación (no la cuenta sandbox de Factus).
- `/` dirige a `/login` sin sesión y a `/dashboard` con sesión. Al iniciar sesión se abre el dashboard.
- `/dashboard`, `/customers`, `/products` y `/invoices` requieren sesión. Al cerrar sesión o expirar el token, se regresa al login.
- El dashboard consulta los clientes y productos del catálogo y la primera página de facturas (hasta 20). Los indicadores de facturas y pendientes corresponden únicamente a esa página, no al total histórico. La actividad muestra los cinco registros más recientes dentro de esa consulta. Si falla la carga se muestra un error con opción de actualizar.
- Clientes: crear, editar, listar por páginas y eliminar. Los códigos fiscales deben corresponder al cliente real.
- Productos: la página muestra la tabla y un botón «Agregar producto». Crear y editar abren una modal con precio sin impuestos y uno o varios impuestos. Al guardar se cierra y actualiza la lista; si falla, conserva el formulario y muestra el error. La modal permite cancelar o cerrar con Escape, mantiene el foco dentro y bloquea el cierre durante el guardado.
- Facturas: seleccionar cliente, productos, cantidades, descuento, rango y pagos; crear y validar. Muestra número, CUFE, totales, enlace público y notificaciones devueltas por Factus.
- Historial paginado y consulta por ID de factura local mediante los endpoints existentes de facturas.

La sesión vive en `sessionStorage` de la pestaña, vence según el JWT y se elimina al cerrar sesión o recibir 401. Para las facturas se conserva el body enviado por usuario antes del POST; un error de red no descarta la referencia. “Consultar mismo envío” repite exactamente ese body, aprovechando la protección de duplicados del backend. Los estados `pending` y `unknown` no son éxito y requieren revisión en Factus; consultar el registro local no concilia automáticamente con Factus.

Los errores locales 400/404/415 permiten corregir el formulario. Un registro rechazado conserva los detalles y permite iniciar una nueva factura. No se reinicia automáticamente un envío incierto. No borres manualmente el almacenamiento de la pestaña mientras estés revisando un envío sin confirmar.

Los cálculos usan enteros `BigInt` en centavos y las mismas reglas de redondeo por línea del backend. El total final es el devuelto por Factus. La configuración actual de Go usa sandbox y no envía correos; la web muestra los datos del ambiente configurado en el backend.

## Verificación

```sh
npm run build
npm run lint
node --experimental-strip-types --test tests/*.test.ts
```

## Publicación

`npm run build` genera `dist`. El proxy de Vite solo funciona en desarrollo/preview; para publicar configura un proxy inverso HTTPS para que `/api/*` llegue al backend Go eliminando `/api`. Las páginas y API deben usar el mismo origen. No publiques el backend ni las credenciales mediante archivos estáticos.

React Router usa URLs reales. El servidor debe devolver `index.html` para las rutas
del frontend (por ejemplo, `/dashboard`) al abrirlas o recargarlas directamente,
sin aplicar ese fallback a `/api/*` ni a los archivos estáticos.
