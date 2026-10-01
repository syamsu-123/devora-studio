import { cn } from '../../lib/cn'
import { TOKEN_CLASS } from '../../lib/syntax'

// Potongan kode dengan nomor baris di gutter, dipakai di seluruh halaman.
export function CodeBlock({ lines, gutter = true, startLine = 1, className }) {
  return (
    <ol className={cn('font-mono text-[12.5px] leading-[1.75] text-text', className)}>
      {lines.map((row, index) => (
        <li key={index} className="grid grid-cols-[auto_minmax(0,1fr)]">
          {gutter ? (
            <span
              aria-hidden="true"
              className="w-9 border-r border-glass-line pr-3 text-right text-[11px] leading-[1.75] text-syn-dim select-none"
            >
              {startLine + index}
            </span>
          ) : null}
          <code className="block overflow-x-auto px-3 whitespace-pre">
            {row.prompt ? <span className="text-cyan select-none">$ </span> : null}
            {row.segs.map((part, partIndex) => (
              <span
                key={partIndex}
                className={cn(TOKEN_CLASS[part.k] ?? TOKEN_CLASS.text, part.cls)}
              >
                {part.v}
              </span>
            ))}
          </code>
        </li>
      ))}
    </ol>
  )
}
