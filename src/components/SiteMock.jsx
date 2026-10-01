// Pratinjau website klien dibuat dari komponen React + Tailwind (bukan gambar),
// jadi ringan dan tetap tajam di layar apa pun. Konten di sini fiktif.
import { cn } from '../lib/cn'
import { IconCheck, IconClock } from './icons'

function BrowserBar({ url }) {
  return (
    <div className="flex items-center gap-2 border-b border-glass-line bg-glass/70 px-2.5 py-1.5">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-line" />
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-line" />
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-line" />
      <span className="truncate font-mono text-[9px] text-muted">{url}</span>
    </div>
  )
}

const MOCK = {
  klinik: {
    url: 'klinik-sehat-ibu.example',
    body: (
      <>
        <div className="flex items-center gap-1.5 border-b border-glass-line px-2.5 py-2">
          <span aria-hidden="true" className="h-3.5 w-3.5 rounded-xs bg-brand" />
          <span className="font-mono text-[10px] font-medium text-text">Klinik Sehat Ibu</span>
          <span className="ml-auto hidden font-mono text-[9px] text-muted @[22rem]:inline">
            Layanan · Dokter · Lokasi
          </span>
        </div>
        <div className="space-y-2 p-2.5">
          <p className="font-mono text-[11px] font-semibold leading-tight text-text">
            Booking tanpa telepon
          </p>
          <p className="text-[9px] leading-relaxed text-muted">
            Pilih hari, pilih jam, konfirmasi via WhatsApp. Tiga langkah.
          </p>
          <div className="flex gap-1.5">
            <span className="rounded-chip bg-brand px-2 py-1 font-mono text-[9px] text-white">
              Booking
            </span>
            <span className="rounded-chip border border-glass-line px-2 py-1 font-mono text-[9px] text-muted">
              Lokasi
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {['Senin-Sabtu 08.00-14.00', 'BPKA + BPJS', 'Jalan Melati 12, Bandung'].map((item) => (
              <span key={item} className="rounded-xs border border-glass-line px-1.5 py-1.5 text-[8px] leading-tight text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
      </>
    ),
  },
  profil: {
    url: 'kontraktor-mandiri.example',
    body: (
      <>
        <BrowserBar url="kontraktor-mandiri.example" />
        <div className="space-y-2 p-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-mono text-[11px] font-semibold leading-tight text-text">
              CV Kontraktor Mandiri
            </p>
            <span className="rounded-chip bg-primary/15 px-1.5 py-0.5 font-mono text-[8px] text-cyan">
              12 tahun
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['48 proyek', '2 th garansi', '4 kota'].map((item) => (
              <span key={item} className="rounded-xs bg-glass px-1.5 py-1.5 text-center font-mono text-[8px] text-text">
                {item}
              </span>
            ))}
          </div>
          <ul className="space-y-1">
            {['Renovasi dapur dan kamar mandi', 'Perbaikan atap dan cat', 'Pengecatan rumah'].map((item) => (
              <li key={item} className="flex items-center gap-1 text-[8px] text-muted">
                <IconCheck className="h-2.5 w-2.5 shrink-0 text-cyan" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  toko: {
    url: 'tokoberkahjaya.example',
    body: (
      <>
        <BrowserBar url="tokoberkahjaya.example/catalog" />
        <div className="space-y-2 p-2.5">
          <div className="flex items-center gap-1.5 rounded-xs border border-glass-line px-2 py-1">
            <span className="font-mono text-[9px] text-muted">Cari 1.200 produk</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Minyak goreng 1L', 'Beras 5kg', 'Gula 1kg'].map((item, index) => (
              <div key={item} className="space-y-1 rounded-xs border border-glass-line p-1.5">
                <span
                  aria-hidden="true"
                  className={cn('block h-6 w-full rounded-xs', index % 2 ? 'bg-glass' : 'bg-line')}
                />
                <p className="truncate text-[8px] text-muted">{item}</p>
                <p className="font-mono text-[9px] text-text">Rp {['16.500', '68.000', '15.000'][index]}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xs bg-glass px-2 py-1.5">
            <span className="font-mono text-[9px] text-text">Total Rp 99.500</span>
            <span className="rounded-chip bg-brand px-2 py-0.5 font-mono text-[8px] text-white">
              Bayar
            </span>
          </div>
        </div>
      </>
    ),
  },
  distributor: {
    url: 'distributorsinarjaya.example',
    body: (
      <>
        <BrowserBar url="distributorsinarjaya.example/harga" />
        <div className="space-y-2 p-2.5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-medium text-text">Harga grosir</p>
            <span className="font-mono text-[8px] text-muted">per kategori</span>
          </div>
          <table className="w-full border-collapse text-[8px]">
            <thead>
              <tr className="text-left text-muted">
                <th className="font-normal">Item</th>
                <th className="font-normal">1-9</th>
                <th className="font-normal">10+</th>
              </tr>
            </thead>
            <tbody className="font-mono text-text">
              {[
                ['Kertas A4 80gr', '52.000', '49.000'],
                ['Toner HP 26A', '780.000', '742.000'],
                ['Staples isi 3', '24.000', '22.500'],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-glass-line">
                  <td className="truncate py-1 pr-2 font-sans text-muted">{row[0]}</td>
                  <td className="py-1 pr-2">{row[1]}</td>
                  <td className="py-1 text-cyan">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-mono text-[8px] text-muted">Minimum order 1 karton per item.</p>
        </div>
      </>
    ),
  },
  sistem: {
    url: 'app.contoh-bangsa.example',
    body: (
      <>
        <div className="flex items-center gap-1.5 border-b border-glass-line bg-glass px-2.5 py-1.5">
          <span className="font-mono text-[9px] text-text">Dashboard</span>
          <span className="ml-auto font-mono text-[8px] text-muted">wali kelas</span>
        </div>
        <div className="space-y-2 p-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {['Siswa 214', 'Hadir 92%', 'Kelas 6B'].map((item) => (
              <span key={item} className="rounded-xs border border-glass-line px-1.5 py-1.5 text-[8px] text-muted">
                {item}
              </span>
            ))}
          </div>
          <ul className="space-y-1">
            {['Senin 07.00 Matematika', 'Senin 08.30 Bahasa Indonesia', 'Selasa 07.00 Fisika'].map((row, index) => (
              <li
                key={row}
                className="flex items-center gap-1.5 rounded-xs bg-glass px-1.5 py-1 text-[8px] text-muted"
              >
                <IconClock className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{row}</span>
                <span className="ml-auto font-mono text-cyan">{['4A', '6B', '4A'][index]}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-1 rounded-xs border border-glass-line p-1.5">
            {[6, 10, 8, 14, 11, 16].map((height, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="flex-1 rounded-xs bg-brand"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>
      </>
    ),
  },
}

export function SiteMock({ variant = 'profil', url, className }) {
  const mock = MOCK[variant] ?? MOCK.profil

  return (
    <div className={cn('@container overflow-hidden bg-surface', className)}>
      {mock.body}
      <span className="sr-only">Contoh tampilan website klien: {mock.url}</span>
    </div>
  )
}

export function mockUrl(variant) {
  return MOCK[variant]?.url ?? MOCK.profil.url
}
