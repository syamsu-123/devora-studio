import { useId } from 'react'
import { cn } from '../../lib/cn'

// Jendela bergaya editor: baris judul berisi nama file + titik jendela,
// dipakai untuk terminal, git log, dan pratinjau.
export function EditorWindow({ file, actions, children, bodyClassName, className }) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'glass overflow-hidden rounded-window shadow-raised',
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-glass-line px-3 py-2">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan/60" />
          <span className="h-2 w-2 rounded-full bg-violet/60" />
          <span className="h-2 w-2 rounded-full bg-primary/60" />
        </span>
        <h3 id={headingId} className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">
          {file}
        </h3>
        {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
      </header>
      <div className={cn('bg-surface/60', bodyClassName)}>{children}</div>
    </section>
  )
}
