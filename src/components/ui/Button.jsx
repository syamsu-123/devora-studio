import { cn } from '../../lib/cn'

const VARIANTS = {
  // CTA utama: gradient biru → violet, glow halus, teks putih.
  primary:
    'border-transparent bg-brand text-white glow-primary hover:brightness-115 hover:glow-primary-lg',
  outline: 'border-glass-line bg-glass text-text hover:border-cyan/50 hover:text-cyan',
  soft: 'border-glass-line bg-raised text-muted hover:text-text',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-glass hover:text-text',
}

const SIZES = {
  sm: 'h-9 px-3 text-[11.5px]',
  md: 'h-11 px-4 text-[13px]',
  lg: 'h-12 px-5 text-[13px] sm:h-[3.25rem] sm:px-6 sm:text-[14px]',
}

export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'group/btn relative inline-flex items-center justify-center gap-2 rounded-chip border font-mono font-medium whitespace-nowrap transition-all duration-200 active:translate-y-px',
    SIZES[size] ?? SIZES.md,
    VARIANTS[variant] ?? VARIANTS.primary,
    className,
  )
  const Tag = as

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
