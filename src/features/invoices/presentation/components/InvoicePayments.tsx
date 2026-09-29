import type { useInvoicesViewModel } from '../viewmodel/useInvoicesViewModel'

export default function InvoicePayments({
  draft,
  patch,
  calculated,
}: Pick<
  ReturnType<typeof useInvoicesViewModel>,
  'draft' | 'patch' | 'calculated'
>) {
  return (
    <>
      <h3>Pagos</h3>
      {draft.payment_details.map((payment, index) => (
        <div className="row" key={index}>
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
            Código medio (10 efectivo, 42 consignación)
            <input
              required
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
            className="secondary"
            disabled={draft.payment_details.length === 1}
            onClick={() =>
              patch(
                'payment_details',
                draft.payment_details.filter((_, i) => i !== index),
              )
            }
          >
            Quitar pago
          </button>
        </div>
      ))}
      <button
        type="button"
        className="secondary"
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
        Agregar pago
      </button>
    </>
  )
}
