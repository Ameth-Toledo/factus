import { Plus, Trash2 } from 'lucide-react'
import type { useInvoiceCreationViewModel } from '../viewmodel/useInvoiceCreationViewModel'

export default function InvoicePayments({
  draft,
  patch,
  calculated,
}: Pick<
  ReturnType<typeof useInvoiceCreationViewModel>,
  'draft' | 'patch' | 'calculated'
>) {
  return (
    <>
      <h2 className="mb-5 text-sm font-semibold text-neutral-100">Pagos</h2>
      {draft.payment_details.map((payment, index) => (
        <div
          className="mb-4 grid items-end gap-3 rounded-xl border border-neutral-800/70 bg-black/30 p-4 sm:grid-cols-2"
          key={index}
        >
          <label>
            Forma
            <select
              value={payment.payment_form}
              onChange={(e) =>
                patch(
                  'payment_details',
                  draft.payment_details.map((x, i) =>
                    i === index ? { ...x, payment_form: e.target.value } : x,
                  ),
                )
              }
            >
              <option value="1">Contado</option>
              <option value="2">Crédito</option>
            </select>
          </label>
          <label>
            Medio de pago (código)
            <input
              required
              placeholder="10: efectivo · 42: consignación"
              value={payment.payment_method_code}
              onChange={(e) =>
                patch(
                  'payment_details',
                  draft.payment_details.map((x, i) =>
                    i === index
                      ? { ...x, payment_method_code: e.target.value }
                      : x,
                  ),
                )
              }
            />
          </label>
          <label>
            Monto
            <input
              required
              inputMode="decimal"
              value={
                payment.amount ||
                (draft.payment_details.length === 1 ? calculated : '')
              }
              onChange={(e) =>
                patch(
                  'payment_details',
                  draft.payment_details.map((x, i) =>
                    i === index ? { ...x, amount: e.target.value } : x,
                  ),
                )
              }
            />
          </label>
          {payment.payment_form === '2' && (
            <label>
              Vencimiento
              <input
                type="date"
                required
                value={payment.due_date}
                onChange={(e) =>
                  patch(
                    'payment_details',
                    draft.payment_details.map((x, i) =>
                      i === index ? { ...x, due_date: e.target.value } : x,
                    ),
                  )
                }
              />
            </label>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-3 py-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
            disabled={draft.payment_details.length === 1}
            onClick={() =>
              patch(
                'payment_details',
                draft.payment_details.filter((_, i) => i !== index),
              )
            }
          >
            <Trash2 className="size-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">Quitar pago</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-3 py-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
        disabled={draft.payment_details.length >= 20}
        onClick={() =>
          patch('payment_details', [
            ...draft.payment_details,
            {
              payment_form: '1',
              payment_method_code: '10',
              amount: '',
              reference_code: '',
              due_date: '',
            },
          ])
        }
      >
        <Plus className="size-4" aria-hidden="true" />
        Agregar pago
      </button>
    </>
  )
}
