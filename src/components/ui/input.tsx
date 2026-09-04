import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'border-line focus:border-brand/60 focus:ring-brand/20 h-12 w-full rounded-xl border bg-black/20 px-3.5 text-base text-white transition placeholder:text-slate-600 focus:ring-2 focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}
