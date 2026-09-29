import type { Field } from '../models/Field'

export const productFields: Field[] = [
  { key: 'code_reference', label: 'Código del producto', required: true },
  { key: 'name', label: 'Nombre', required: true },
  {
    key: 'price',
    label: 'Precio sin impuestos',
    required: true,
    initial: '0.00',
  },
  {
    key: 'unit_measure_code',
    label: 'Código de la unidad de medida',
    required: true,
    initial: '94',
  },
  {
    key: 'standard_code',
    label: 'Código de clasificación del producto',
    required: true,
    initial: '999',
  },
  { key: 'note', label: 'Nota' },
]
