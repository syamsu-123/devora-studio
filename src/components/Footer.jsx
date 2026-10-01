import { config } from '../data/config'
import { waLink } from '../lib/wa'
import { IconArrowRight, IconMail, IconWhatsApp } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-glass-line">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
              <span className="text-violet">//</span> end of file
            </p>
            <p className="mt-2 font-heading text-[15px] font-bold text-text">{config.name}</p>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
              Pembuatan website untuk UMKM, klinik, kontraktor, sekolah, dan distributor. Harga
              disampaikan di awal, dikerjakan berurutan.
            </p>
            <p className="mt-2 font-mono text-[11px] text-muted">
              {config.domain} · {config.city}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2.5">
            <a
              href={waLink(config.waIntro)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-text transition-colors hover:text-cyan"
            >
              <IconWhatsApp className="h-4 w-4 text-positive" />
              {config.waNumber}
            </a>
            <a
              href={`mailto:${config.email}`}
              className="inline-flex items-center gap-2 font-mono text-[13px] text-text transition-colors hover:text-cyan"
            >
              <IconMail className="h-4 w-4 text-cyan" />
              {config.email}
            </a>
            <a
              href="#beranda"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-cyan"
            >
              kembali ke atas
              <IconArrowRight className="h-3.5 w-3.5 -rotate-90" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-cyan"
            >
              masuk ke ruang kerja
              <IconArrowRight className="h-3.5 w-3.5 -rotate-180" />
            </a>
          </div>
        </div>

        <p className="rule mt-10" />

        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
          © {year} {config.name} · contoh konten untuk demonstrasi, bukan studi kasus nyata.
        </p>
      </div>
    </footer>
  )
}
