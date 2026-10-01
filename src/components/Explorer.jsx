import { useEffect } from 'react'
import { config } from '../data/config'
import { cn } from '../lib/cn'
import { waLink } from '../lib/wa'
import { Brand } from './Header'
import {
  IconClose,
  IconFileCode,
  IconFolder,
  IconFolderOpen,
  IconJson,
  IconMarkdown,
  IconPackage,
  IconReact,
  IconTerminal,
} from './icons'

const TYPE_ICON = {
  folder: IconFolder,
  folderOpen: IconFolderOpen,
  component: IconFileCode,
  json: IconJson,
  config: IconTerminal,
  doc: IconMarkdown,
  package: IconPackage,
  react: IconReact,
  terminal: IconTerminal,
}

const TYPE_TONE = {
  folder: 'text-violet/80',
  folderOpen: 'text-violet',
  component: 'text-primary',
  json: 'text-signal',
  config: 'text-cyan',
  doc: 'text-text',
  package: 'text-signal',
  react: 'text-cyan',
  terminal: 'text-positive',
}

function TreeNode({ node, depth = 0 }) {
  const isFolder = node.type === 'folder'
  const children = node.children ?? []
  const open = isFolder && node.open && children.length > 0
  const Icon = TYPE_ICON[open ? 'folderOpen' : node.type] ?? IconFileCode

  return (
    <li>
      <span
        className={cn(
          'flex items-center gap-1.5 py-[3px] pr-2 font-mono text-[11.5px] text-muted',
          isFolder && 'text-text/90',
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <Icon className={cn('h-3.5 w-3.5 shrink-0', TYPE_TONE[open ? 'folderOpen' : node.type])} />
        <span className="truncate">{node.name}</span>
      </span>
      {open ? (
        <ul>
          {children.map((child) => (
            <TreeNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function Explorer({ activeId, open = false, onClose }) {
  // Esc menutup drawer + kunci scroll body selagi drawer terbuka di mobile.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <>
      {/* Latar drawer, hanya di layar kecil */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[45] bg-bg-deep/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        aria-label="Explorer proyek"
        className={cn(
        // Di desktop sidebar berhenti tepat di atas bilah status (h-8); kalau tidak,
    // link "tersedia 2 slot" di bawah akan tertutup bilah status.
      'fixed top-0 bottom-0 left-0 z-50 flex w-[16.5rem] flex-col border-r border-glass-line bg-surface/95 backdrop-blur-md transition-transform duration-300 ease-out lg:z-30 lg:bottom-8 lg:w-60 lg:translate-x-0 lg:transition-none xl:w-64',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-2 border-b border-glass-line px-4 py-3.5">
          <Brand className="min-w-0 flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-xs border border-glass-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan lg:hidden"
          >
            <IconClose className="h-3.5 w-3.5" />
            <span className="sr-only">Tutup sidebar</span>
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-3 py-4 pb-8">
          <p className="flex items-center gap-1.5 px-2 pb-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            <IconFolderOpen className="h-3 w-3 text-violet" />
            Explorer
          </p>

          <ul className="space-y-0.5">
            {config.nav.map((item) => {
              const active = activeId === item.id
              const Icon = TYPE_ICON[item.icon] ?? IconFileCode
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative flex items-center gap-2 rounded-xs px-2 py-1.5 font-mono text-[11.5px] transition-colors',
                      active
                        ? 'bg-primary/12 text-text'
                        : 'text-muted hover:bg-glass hover:text-text',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute top-1/2 left-0 h-4 w-[2px] -translate-y-1/2 bg-cyan transition-opacity',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <Icon className={cn('h-3.5 w-3.5 shrink-0', active ? 'text-cyan' : 'text-syn-dim')} />
                    <span className="truncate">{item.file}</span>
                    <span className="ml-auto shrink-0 text-[10px] text-muted">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="rule my-4" />

          <p className="flex items-center gap-1.5 px-2 pb-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            <IconPackage className="h-3 w-3 text-signal" />
            NAMA-STUDIO/
          </p>

          <ul>
            {config.tree.map((node) => (
              <TreeNode key={node.name} node={node} />
            ))}
          </ul>

          <div className="rule my-4" />

          <p className="px-2 pb-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            Catatan
          </p>
          <ul className="space-y-1.5 px-2">
            {config.tips.map((tip) => (
              <li key={tip} className="flex gap-2 text-[11px] leading-relaxed text-muted">
                <span aria-hidden="true" className="text-cyan/70">
                  //
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={waLink(config.waIntro)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-2 border-t border-glass-line px-4 py-3 font-mono text-[11.5px] text-muted transition-colors hover:text-cyan"
        >
          <span className="motion-safe:animate-pulse-dot h-1.5 w-1.5 rounded-full bg-positive" />
          {config.status.branch} · tersedia 2 slot
        </a>
      </aside>
    </>
  )
}
