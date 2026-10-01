import { cn } from '../../lib/cn'

export function Chip({ active = false, className, children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-chip border px-3 font-mono text-[12px] transition-colors',
        active
          ? 'border-cyan/50 bg-primary/15 text-cyan'
          : 'border-glass-line bg-glass text-muted hover:border-cyan/30 hover:text-text',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
