import { useEffect, useId, useRef } from 'react'
import { cn } from '../lib/cn'
import { config } from '../data/config'
import { waLink } from '../lib/wa'
import { Button } from './ui/Button'
import { SiteMock } from './SiteMock'
import { IconClose, IconWhatsApp } from './icons'

const BLOCKS = [
  { key: 'challenge', title: 'Tantangan', tone: 'text-syn-key' },
  { key: 'solution', title: 'Solusi', tone: 'text-syn-str' },
]

export function CaseDialog({ project, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className="m-auto w-[min(42rem,calc(100vw-1.5rem))] max-h-[88dvh] overflow-hidden rounded-window border border-glass-line bg-surface/95 p-0 text-text shadow-pop backdrop:bg-bg/70 backdrop:backdrop-blur-[2px] dark:backdrop:bg-bg/80"
    >
      <div className="max-h-[88dvh] overflow-y-auto">
        <header className="flex items-center gap-3 border-b border-glass-line bg-glass px-4 py-3">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan/60" />
          <span className="h-2 w-2 rounded-full bg-violet/60" />
          <span className="h-2 w-2 rounded-full bg-primary/60" />
        </span>
          <h2 id={titleId} className="min-w-0 flex-1 truncate font-mono text-[12px] text-muted">
            studi-kasus/{project.file}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-xs border border-glass-line bg-surface text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <IconClose className="h-4 w-4" />
            <span className="sr-only">Tutup studi kasus</span>
          </button>
        </header>

        <div className="space-y-6 p-4 sm:p-6">
          <div>
            <p className="font-mono text-[11px] text-muted">
              {project.typeLabel} · {project.sector} · {project.location}
            </p>
            <h3 className="mt-1 font-mono text-xl font-bold tracking-tight text-text">
              {project.client}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{project.summary}</p>
          </div>

          <SiteMock variant={project.preview} className="h-44 overflow-hidden rounded-panel border border-glass-line" />

          <dl className="grid grid-cols-2 gap-3 rounded-panel border border-glass-line bg-glass p-3 font-mono text-[12px] sm:grid-cols-4">
            {[
              ['Lama pengerjaan', project.duration],
              ['Tahun', project.year],
              ['Jenis', project.typeLabel],
              ['Lokasi', project.location],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted">{label}</dt>
                <dd className="mt-0.5 text-text">{value}</dd>
              </div>
            ))}
          </dl>

          {BLOCKS.map((block) => (
            <section key={block.key}>
              <h4 className={cn('font-mono text-[12px] tracking-[0.18em] uppercase', block.tone)}>
                {block.title}
              </h4>
              <ul className="mt-2 space-y-2">
                {project[block.key].map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h4 className="font-mono text-[12px] tracking-[0.18em] text-signal uppercase">Hasil</h4>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {project.results.map((item) => (
                <li key={item.label} className="rounded-panel border border-glass-line bg-glass p-3">
                  <p className="font-mono text-lg font-bold text-text">{item.value}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{item.label}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[11px] text-muted">
              // {project.contoh ? 'angka contoh, bukan hasil nyata. Ganti di src/data/projects.js' : 'angka dari laporan proyek klien'}
            </p>
          </section>

          <section>
            <h4 className="font-mono text-[12px] tracking-[0.18em] text-muted uppercase">
              Teknologi
            </h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-chip border border-glass-line bg-glass px-2.5 py-1 font-mono text-[12px] text-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="flex flex-wrap items-center gap-3 border-t border-glass-line bg-glass px-4 py-3">
          <p className="flex-1 text-[13px] text-muted">
            Butuh yang seperti ini? Kirim lewat WhatsApp, kami balas dengan estimasi harga.
          </p>
          <Button
            as="a"
            href={waLink(
              `Halo ${config.name}, saya lihat studi kasus ${project.client} di website Anda. ` +
                `Saya butuh website dengan kebutuhan yang mirip. Boleh dijadikan estimasi?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            <IconWhatsApp className="h-4 w-4" />
            Minta project sejenis
          </Button>
        </footer>
      </div>
    </dialog>
  )
}
