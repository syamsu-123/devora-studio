import { config } from '../data/config'
import { waLink } from '../lib/wa'
import { Button } from './ui/Button'
import { CodeBlock } from './ui/CodeBlock'
import { codeLine, seg } from '../lib/syntax'
import { IconWhatsApp } from './icons'

// Tiga prinsip kerja, ditulis pendek supaya tidak jadi poster.
const PILLARS = [
  {
    n: '01',
    title: 'Cepat sejak pertama',
    desc: 'Beban halaman kecil, gambar dikompresi, satu bundling. Target 90+ Lighthouse di ponsel.',
  },
  {
    n: '02',
    title: 'Bisa diedit sendiri',
    desc: 'Konten, harga, dan jam praktik ditarik dari file atau CMS sederhana, bukan ditulis mati di dalam komponen.',
  },
  {
    n: '03',
    title: 'Semua tahap terlihat',
    desc: 'Harga dikunci sebelum mulai, revisi dibatasi dua kali, dan tidak ada biaya tersembunyi di akhir.',
  },
]

const READ_ME = [
  codeLine([seg('key', '# NAMA STUDIO')]),
  codeLine([seg('out', '')]),
  codeLine([seg('out', 'Studio pembuatan website untuk UMKM, klinik,')]),
  codeLine([seg('out', 'kontraktor, sekolah, dan distributor.')]),
  codeLine([seg('out', '')]),
  codeLine([seg('key', '## Cara kerja')]),
  codeLine([seg('out', '- Brief 30 menit, lalu rancangan + harga tetap')]),
  codeLine([seg('out', '- Pengerjaan dengan pratinjau tiap 2-3 hari')]),
  codeLine([seg('out', '- Serah terima + pelatihan pemilik, garansi 30 hari')]),
  codeLine([seg('out', '')]),
  codeLine([seg('key', '## Stack')]),
  codeLine([
    seg('str', 'React'),
    seg('out', ' · '),
    seg('str', 'Node.js'),
    seg('out', ' · '),
    seg('str', 'Firebase'),
    seg('out', ' · '),
    seg('str', 'Tailwind'),
  ]),
]

export function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-judul" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-start">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
              <span className="text-violet">//</span> tentang.md
            </p>
            <h2
              id="tentang-judul"
              className="mt-4 max-w-[22ch] font-heading text-[1.75rem] leading-[1.12] font-bold tracking-tight text-balance text-text sm:text-[2.25rem]"
            >
              Studio kecil yang <span className="text-gradient">menulis kode</span>, bukan sekadar
              merakit template.
            </h2>
            <p className="mt-4 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
              {config.name} berbasis di {config.city}. Kami mengerjakan proyek web untuk bisnis yang
              butuh penjelasan jelas, halaman yang ringan di ponsel, dan pemilik usaha yang tidak
              harus _wait_ kalau ada yang perlu diubah.
            </p>
            <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
              Hubungan kami biasanya panjang: file dan data tetap milik Anda, dan kami masih bisa
              dihubungi setelah proyek selesai.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map((pillar) => (
                <li key={pillar.n} className="glass rounded-panel p-4">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-violet">{pillar.n}</p>
                  <h3 className="mt-2 font-heading text-[14.5px] leading-tight font-semibold text-text">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{pillar.desc}</p>
                </li>
              ))}
            </ul>

            <Button
              as="a"
              href={waLink(config.waIntro)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-7"
            >
              <IconWhatsApp className="h-4 w-4" />
              Diskusikan kebutuhan Anda
            </Button>
          </div>

          <div className="space-y-4">
            <div className="glass overflow-hidden rounded-panel">
              <div className="flex items-center gap-2 border-b border-glass-line px-3 py-2">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                </span>
                <span className="font-mono text-[10.5px] text-muted">README.md</span>
              </div>
              <CodeBlock
                lines={READ_ME}
                gutter={false}
                className="py-3 text-[11.5px] leading-[1.7]"
              />
            </div>

            <div className="glass rounded-panel p-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                Stack yang dipakai
              </p>
              <dl className="mt-3 space-y-2.5">
                {config.stack.map((group) => (
                  <div key={group.group} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2">
                    <dt className="font-mono text-[11px] text-cyan">{group.group}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-xs border border-glass-line bg-glass px-1.5 py-0.5 font-mono text-[10.5px] text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass-flat rounded-panel p-4">
              <p className="font-mono text-[11px] leading-relaxed text-muted">
                <span className="text-violet">{'//'} </span>
                {config.facts.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
