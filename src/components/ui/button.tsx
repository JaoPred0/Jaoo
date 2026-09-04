import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
const variants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-bright',
        secondary:
          'border border-line bg-white/[.04] text-white hover:bg-white/[.08]',
        ghost: 'text-slate-300 hover:bg-white/[.06] hover:text-white',
        danger: 'bg-red-500/15 text-red-300 hover:bg-red-500/25',
      },
      size: { default: 'h-11', sm: 'h-9 min-h-9 px-3', icon: 'size-11 p-0' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & { asChild?: boolean }
export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Component = asChild ? Slot : 'button'
  return (
    <Component
      className={cn(variants({ variant, size }), className)}
      {...props}
    />
  )
}
