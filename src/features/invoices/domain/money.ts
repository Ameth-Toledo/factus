import type { InvoiceInput } from './models/InvoiceInput'
import type { Product } from '../../catalog/domain/models/Product'

export function cents(value: string): bigint {
  if (!/^\d{1,12}(\.\d{1,2})?$/.test(value))
    throw new Error(
      'Usa importes positivos con máximo dos decimales y punto decimal.',
    )
  const [whole, fraction = ''] = value.split('.')
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'))
}

export function money(value: bigint): string {
  const absolute = value < 0n ? -value : value
  return `${value < 0n ? '-' : ''}${absolute / 100n}.${String(absolute % 100n).padStart(2, '0')}`
}

function round(n: bigint, d: bigint) {
  return (n + d / 2n) / d
}

export function total(
  items: InvoiceInput['items'],
  products: Product[],
): bigint {
  return items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.product_id)
    if (!product) throw new Error('Selecciona un producto para cada línea.')
    const quantity = cents(item.quantity)
    const discount = cents(item.discount_rate || '0')
    if (quantity <= 0n || discount > 10000n)
      throw new Error('Cantidad mayor que cero y descuento entre 0 y 100.')
    const gross = round(cents(product.price) * quantity, 100n)
    const base = gross - round(gross * discount, 10000n)
    return (
      sum +
      base +
      product.taxes.reduce((taxSum, tax) => {
        const rate = cents(tax.rate)
        if (rate > 10000n || (tax.is_excluded && rate !== 0n))
          throw new Error('Configuración de impuestos inválida.')
        if (tax.is_excluded) return taxSum
        if (!['01', '04'].includes(tax.code))
          throw new Error('Esta versión admite IVA e INC porcentuales.')
        return taxSum + round(base * rate, 10000n)
      }, 0n)
    )
  }, 0n)
}

export function rounding(value: string) {
  const negative = value.startsWith('-')
  const result = cents(negative ? value.slice(1) : value)
  if (result > 50000n)
    throw new Error('El ajuste de redondeo máximo es ±500.00.')
  return negative ? -result : result
}
