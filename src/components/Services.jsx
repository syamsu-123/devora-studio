import { PRICE_NOTE, SERVICES } from '../data/services'
import { config } from '../data/config'
import { waLink } from '../lib/wa'
import { cn } from '../lib/cn'
import { Button } from './ui/Button'
import {
  IconArrowRight,
  IconCart,
  IconCheck,
  IconDashboard,
  IconLayers,
  IconTerminal,
  IconWhatsApp,
} from './icons'

const SERVICE_ICON = {
  layers: IconLayers,
  cart: IconCart,
  dashboard: IconDashboard,
  terminal: IconTerminal,
}

// Garis dekoratif motif </> di sudut kartu.
function CornerGlyph() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-2 -right-1 select-none font-mono text-[42px] leading-none text-primary/10 transition-colors duration-300 group-hover:text-cyan/15"
    >
      {'</>'}
    </span>
  )
}

function ServiceCard({ service }) {
  const Icon = SERVICE_ICON[service.icon] ?? IconTerminal

  return (
    <li className="group relative">
      <article className="glass relative flex h-full flex-col overflow-hidden rounded-panel p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:glow-ring">
        <CornerGlyph />

        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xs border border-glass-line bg-glass text-cyan transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-violet"
          >
            <Icon className="h-4 w-4" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-[0.2em] text-violet">{service.n}</p>
            <h3 className="mt-1 font-heading text-[17px] leading-tight font-semibold text-text">
              {service.name}
            </h3>
          </div>
        </div>

        <p className="mt-3 font-mono text-[11.5px] text-muted">{service.forWho}</p>

        <ul className="mt-4 space-y-1.5">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-muted">
              <IconCheck className="mt-[3px] h-3 w-3 shrink-0 text-positive/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rule my-4" />

        <dl className="mt-auto grid grid-cols-2 gap-3 font-mono text-[11.5px]">
          <div>
            <dt className="text-muted">Mulai dari</dt>
            <dd className="mt-0.5 font-semibold text-text">{service.from}</dd>
          </div>
          <div>
            <dt className="text-muted">Estimasi</dt>
            <dd className="mt-0.5 font-semibold text-text">{service.estimate}</dd>
          </div>
        </dl>

        <p className="mt-3 font-mono text-[10.5px] text-syn-dim">{'//'} {service.file}</p>
      </article>
    </li>
  )
}

export function Services() {
  return (
    <section id="layanan" aria-labelledby="layanan-judul" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand opacity-40"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
              <span className="text-violet">//</span> layanan.tsx — 4 services
            </p>
            <h2
              id="layanan-judul"
              className="mt-4 font-heading text-[1.75rem] leading-[1.12] font-bold tracking-tight text-balance text-text sm:text-[2.25rem]"
            >
              Build something that <span className="text-gradient">works.</span>
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              Empat jalur pengerjaan, harga terlihat sejak awal. Kalau kebutuhan Anda di luar daftar
              ini, tetap bisa: kami tulis dulu daftar fiturnya, baru kami tawarkan harga.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-mono text-[11px] text-muted">{'//'} {PRICE_NOTE}</p>
            <Button as="a" href={waLink(config.waIntro)} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp className="h-4 w-4" />
              Tanya harga
            </Button>
          </div>
        </div>

        <ul className={cn('mt-10 grid gap-4 sm:grid-cols-2')}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>

        <a
          href="#kontak"
          className="group mt-6 inline-flex items-center gap-2 font-mono text-[12.5px] text-muted transition-colors hover:text-cyan"
        >
          Sudah tahu paket mana? Lanjut isi kebutuhan Anda
          <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}
