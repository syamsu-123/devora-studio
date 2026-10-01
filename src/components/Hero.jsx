import { config } from '../data/config'
import { waLink } from '../lib/wa'
import { codeLine, seg } from '../lib/syntax'
import { useTypewriter } from '../hooks/useTypewriter'
import { Button } from './ui/Button'
import { Nebula } from './Nebula'
import { Terminal } from './Terminal'
import { CodeBlock } from './ui/CodeBlock'
import { IconArrowRight, IconCheck, IconWhatsApp } from './icons'

const BADGE_GLYPH_CLASS =
  'grid h-5 w-5 shrink-0 place-items-center rounded-xs border border-glass-line bg-glass text-[9px] font-bold text-cyan'

const SNIPPET_LINES = [
  codeLine([seg('key', 'const'), seg('text', ' studio = '), seg('str', '"NAMA STUDIO"'), seg('pun', ';')]),
  codeLine([seg('key', 'if'), seg('pun', ' ('), seg('text', 'project'), seg('pun', '.'), seg('fn', 'ready'), seg('pun', ') {')]),
  codeLine([seg('pun', '  '), seg('fn', 'deploy'), seg('pun', '();')]),
  codeLine([seg('pun', '}')]),
]

function CodeSnippet() {
  return (
    <div className="glass-flat overflow-hidden">
      <div className="flex items-center gap-2 border-b border-glass-line px-3 py-1.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan/60" />
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet/60" />
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="ml-1 font-mono text-[10px] text-muted">studio.js</span>
      </div>
      <CodeBlock lines={SNIPPET_LINES} gutter={false} startLine={0} className="px-3 py-2.5 text-[11.5px] leading-[1.7]" />
    </div>
  )
}

export function Hero() {
  const { lines, done } = useTypewriter(config.terminal.map((row) => row.text))

  const terminalLines = lines.map((row, index) => {
    const meta = config.terminal[index]
    const segs = [seg(meta.kind, row.visible)]
    if (!row.complete) {
      segs.push(seg('acc', '▊', 'motion-safe:animate-caret'))
    }
    return codeLine(segs, { prompt: meta.prompt })
  })

  return (
    <section
      id="beranda"
      aria-labelledby="beranda-judul"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-24"
    >
      {/* Grid halus + cahaya biru/purple di belakang seluruh hero. */}
      <div
        aria-hidden="true"
        className="bg-grid-fine pointer-events-none absolute inset-0 opacity-30 mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] right-[-10%] h-[70vh] w-[70vh] rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgb(77 124 255 / 0.20) 0%, rgb(157 92 255 / 0.10) 40%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-8 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        {/* ---------------- KIRI: copy + CTA ---------------- */}
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase sm:text-[12px]">
            <span className="text-violet">//</span> NAMA STUDIO — WEB DEVELOPMENT STUDIO
          </p>

          <h1
            id="beranda-judul"
            className="mt-5 max-w-[19ch] font-heading text-[2rem] leading-[1.1] font-bold tracking-tight text-balance text-text sm:text-[2.5rem] lg:text-[2.35rem] xl:text-[3.15rem]"
          >
            Website yang bikin pelanggan Anda yakin, lalu{' '}
            <span className="text-gradient">menghubungi sendiri.</span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[14.5px] leading-relaxed text-muted sm:text-[15.5px]">
            {config.intro}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <Button as="a" href="#karya" variant="outline" size="lg">
              Lihat Karya
              <IconArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={waLink(config.waIntro)} target="_blank" rel="noopener noreferrer" size="lg">
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp / Minta Penawaran
            </Button>
          </div>

          {/* Badge teknologi */}
          <ul className="mt-7 flex flex-wrap gap-2">
            {config.badges.map((badge) => (
              <li
                key={badge.label}
                className="glass-flat inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1 font-mono text-[11px] text-text transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                <span aria-hidden="true" className={BADGE_GLYPH_CLASS}>
                  {badge.glyph}
                </span>
                {badge.label}
              </li>
            ))}
          </ul>

          {/* Terminal sebagai panel kaca melayang */}
          <div className="mt-8 max-w-lg space-y-3">
            <Terminal
              file="~/nama-studio — zsh"
              lines={terminalLines}
              footer={
                done
                  ? 'Siap. Andalan kami: halaman yang bisa dibuka cepat di ponsel.'
                  : 'Menjalankan…'
              }
            />
            <CodeSnippet />
          </div>

          <ul className="mt-8 grid gap-2 font-mono text-[11.5px] text-muted sm:grid-cols-3">
            {config.facts.map((fact) => (
              <li key={fact} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-positive" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- KANAN: programming nebula 3D ---------------- */}
        <div className="relative min-w-0">
          <Nebula />
          {/* Watermark kecil di bawah nebula */}
          <p className="mt-2 text-center font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
            3D Programming Nebula
          </p>
        </div>
      </div>
    </section>
  )
}
