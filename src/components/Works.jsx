import { useMemo, useRef, useState } from 'react'
import { FILTERS, PROJECTS } from '../data/projects'
import { cn } from '../lib/cn'
import { Button } from './ui/Button'
import { Chip } from './ui/Chip'
import { CaseDialog } from './CaseDialog'
import { SiteMock, mockUrl } from './SiteMock'
import { IconArrowRight, IconExternal } from './icons'

const DOT_COLOR = {
  profile: 'bg-cyan',
  shop: 'bg-positive',
  system: 'bg-violet',
}

const PREVIEW_HEIGHT = ['h-40', 'h-36', 'h-44', 'h-40']

/* Jendela browser: tiga titik + address bar, dipakai untuk tiap karya. */
function BrowserFrame({ url, children, className }) {
  return (
    <div className={cn('overflow-hidden bg-surface', className)}>
      <div className="flex items-center gap-2 border-b border-glass-line bg-glass px-2.5 py-1.5">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1 truncate rounded-xs bg-bg-deep/70 px-2 py-0.5 font-mono text-[9px] text-muted">
          <span aria-hidden="true" className="text-positive/80">
            🔒
          </span>
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

export function Works() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const triggerRef = useRef(null)

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((item) => [
          item.id,
          item.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.type === item.id).length,
        ]),
      ),
    [],
  )

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((item) => item.type === filter)),
    [filter],
  )
  const openProject = PROJECTS.find((item) => item.id === openId) ?? null

  const closeDialog = () => {
    setOpenId(null)
    triggerRef.current?.focus()
  }

  return (
    <section id="karya" aria-labelledby="karya-judul" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
              <span className="text-violet">//</span> karya.tsx — portfolio
            </p>
            <h2
              id="karya-judul"
              className="mt-4 font-heading text-[1.75rem] leading-[1.12] font-bold tracking-tight text-balance text-text sm:text-[2.25rem]"
            >
              Selected <span className="text-gradient">Works</span>
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              Tiap proyek dibuka seperti jendela browser: alamat, isi halaman, dan tumpukan
              teknologinya. Masih data contoh — ganti dengan proyek asli Anda di{' '}
              <code className="font-mono text-[12.5px] text-cyan">src/data/projects.js</code>.
            </p>
          </div>

          <p className="font-mono text-[11.5px] text-muted" aria-live="polite">
            {visible.length}/{PROJECTS.length} proyek
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <Chip key={item.id} active={filter === item.id} onClick={() => setFilter(item.id)}>
              {item.label}
              <span className="text-muted">{counts[item.id]}</span>
            </Chip>
          ))}
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <li key={project.id} className="group relative">
              <article className="glass relative flex h-full flex-col overflow-hidden rounded-panel transition-all duration-300 group-hover:-translate-y-1 group-hover:glow-ring">
                <BrowserFrame url={mockUrl(project.preview)}>
                  <SiteMock
                    variant={project.preview}
                    className={cn(
                      'transition-opacity duration-300 group-hover:opacity-95',
                      PREVIEW_HEIGHT[index % PREVIEW_HEIGHT.length],
                    )}
                  />
                </BrowserFrame>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn('h-1.5 w-1.5 rounded-full', DOT_COLOR[project.type])}
                    />
                    <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">
                      {project.typeLabel}
                    </span>
                    {project.contoh ? (
                      <span className="ml-auto rounded-xs border border-dashed border-glass-line px-1.5 py-0.5 font-mono text-[9.5px] text-muted">
                        contoh
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-heading text-[15.5px] font-semibold text-text">
                    {project.client}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-muted">{project.summary}</p>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-xs border border-glass-line bg-glass px-1.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-glass-line pt-3 font-mono text-[11px]">
                    <div>
                      <dt className="text-muted">Sektor</dt>
                      <dd className="truncate text-text">{project.sector}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Pengerjaan</dt>
                      <dd className="truncate text-text">{project.duration}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setOpenId(project.id)
                    }}
                    className="inline-flex w-fit items-center gap-1.5 font-mono text-[12px] text-cyan transition-colors hover:text-text"
                  >
                    <IconExternal className="h-3.5 w-3.5" />
                    Lihat project
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="glass mt-8 flex flex-wrap items-center gap-3 rounded-panel p-4">
          <p className="flex-1 text-[13.5px] leading-relaxed text-muted">
            Punya contoh kerja yang mirip bisnis Anda? Sebutkan saja, kami tunjukkan bagian yang
            paling mendekati.
          </p>
          <Button as="a" href="#kontak" variant="outline" size="sm">
            Kirim contoh kerja
          </Button>
        </div>
      </div>

      {openProject ? <CaseDialog project={openProject} onClose={closeDialog} /> : null}
    </section>
  )
}
