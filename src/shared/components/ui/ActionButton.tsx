import type { ButtonHTMLAttributes } from 'react'

export default function ActionButton({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}) {
  const appearance =
    variant === 'primary'
      ? 'bg-neutral-100 text-black hover:bg-white'
      : 'border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'

  return (
    <button
      {...props}
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-40 ${appearance} ${className}`}
    />
  )
}
