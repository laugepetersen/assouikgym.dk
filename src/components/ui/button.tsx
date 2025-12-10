import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
      rounded: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-[48px] px-[24px]',
        icon: 'h-10 w-10',
        lg: 'h-11 px-8',
        sm: 'h-[36px] px-[16px]',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 text-[16px] tracking-[0.02em]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[16px] tracking-[0.02em]',
        ghost: 'hover:bg-card hover:text-accent-foreground text-[16px] tracking-[0.02em]',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline text-[16px] tracking-[0.02em]',
        outline: [
          'backdrop-blur-lg saturate-200 bg-[rgba(232,232,232,0.75)] rounded-xl border border-[#000000]/15 text-[16px] tracking-[0.02em]',
        ],
        brandGradient:
          'bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)] text-black hover:opacity-90 text-[16px] tracking-[0.02em]',
        blackGradient:
          'bg-gradient-to-br from-[var(--black-start)] to-[var(--black-end)] text-white text-[16px] tracking-[0.02em]',
        glassyGradient: [
          'border border-[#FFFFFF] border-opacity-30 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg text-white saturate-200 text-[16px] tracking-[0.02em]', // Add hover state for border
        ],
        transparent: 'bg-transparent text-brand text-[16px] tracking-[0.02em]',
      },
      rounded: {
        default: 'rounded-[8px]',
        full: 'rounded-full',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
