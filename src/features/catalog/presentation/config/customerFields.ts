import type { Field } from '../models/Field'

export const customerFields: Field[] = [
  {
    key: 'identification_document_code',
    label: 'Tipo de documento (13 cédula, 31 NIT)',
    required: true,
    initial: '13',
  },
  {
    key: 'identification',
    label: 'Número de identificación (sin dígito de verificación)',
    required: true,
  },
  { key: 'dv', label: 'Dígito de verificación (solo para NIT)' },
  {
    key: 'legal_organization_code',
    label: 'Tipo de persona',
    options: [
      ['2', 'Natural'],
      ['1', 'Jurídica'],
    ],
    initial: '2',
  },
  { key: 'names', label: 'Nombre completo (persona natural)' },
  { key: 'company', label: 'Razón social (persona jurídica)' },
  { key: 'trade_name', label: 'Nombre comercial' },
  { key: 'email', label: 'Correo electrónico', type: 'email' },
  { key: 'address', label: 'Dirección' },
  { key: 'phone', label: 'Teléfono' },
  {
    key: 'country_code',
    label: 'Código del país (ej. CO para Colombia)',
    initial: 'CO',
  },
  {
    key: 'municipality_code',
    label: 'Código del municipio (ej. 68679)',
  },
  {
    key: 'tribute_code',
    label: 'Código del impuesto del cliente',
    initial: 'ZZ',
  },
  {
    key: 'responsibilities',
    label: 'Responsabilidades fiscales (códigos separados por coma)',
    initial: 'R-99-PN',
  },
]
