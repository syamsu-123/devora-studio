import { useId, useMemo, useState } from 'react'
import { config } from '../data/config'
import { SERVICES } from '../data/services'
import { useAuth } from '../hooks/useAuth'
import { waLink } from '../lib/wa'
import { codeLine, seg } from '../lib/syntax'
import { Button } from './ui/Button'
import { Terminal } from './Terminal'
import { IconCheck, IconCopy, IconMail, IconSend, IconWhatsApp } from './icons'

const EMPTY_FORM = { name: '', email: '', serviceId: SERVICES[0].id, note: '' }

const FIELD_CLASS =
  'w-full rounded-chip border border-glass-line bg-bg/60 px-3 py-2.5 font-mono text-[13.5px] text-text placeholder:text-syn-dim focus:border-cyan/50'

export function Contact() {
  const { user } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [problem, setProblem] = useState(null)
  const nameId = useId()
  const emailId = useId()
  const serviceId = useId()
  const noteId = useId()

  const service = SERVICES.find((item) => item.id === form.serviceId) ?? SERVICES[0]

  const message = useMemo(
    () =>
      [
        `Halo ${config.name}, saya ${form.name.trim() || '[nama Anda]'} dan butuh: ${service.name}.`,
        form.note.trim() ? `Catatan: ${form.note.trim()}` : null,
        'Boleh minta estimasi harga dan jadwal?',
      ]
        .filter(Boolean)
        .join('\n'),
    [form.name, form.note, service],
  )

  const url = waLink(message)

  // Clipboard API hanya tersedia di origin aman (https/localhost). Kalau situs
  // dibuka lewat IP LAN, jatuh ke select+execCommand supaya tombol tetap berguna.
  const copyLink = async () => {
    const flash = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        flash()
        return
      }
      throw new Error('clipboard tidak tersedia')
    } catch {
      const helper = document.createElement('textarea')
      helper.value = url
      helper.setAttribute('readonly', '')
      helper.style.position = 'fixed'
      helper.style.opacity = '0'
      document.body.appendChild(helper)
      helper.select()
      const ok = document.execCommand('copy')
      helper.remove()
      if (ok) flash()
    }
  }

  // Dua jalur purposefully dipisah: simpan ke Firestore (agar tidak hilang
  // kalau WhatsApp belum dibaca) DAN buka WhatsApp (balas cepat). Keduanya
  // memakai isi form yang sama, jadi tidak ada data yang diketik dua kali.
  const store = async (event) => {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setProblem(null)
    try {
      // Impor dinamis: SDK Firestore baru diambil saat benar-benar mengirim,
      // bukan saat halaman depan dimuat.
      const { saveMessage } = await import('../lib/firestore')
      await saveMessage({
        name: form.name,
        email: form.email,
        service: service.name,
        note: form.note,
        userId: user?.uid ?? null,
      })
      setSent(true)
      setForm(EMPTY_FORM)
    } catch (error) {
      setProblem(
        error?.message === 'nama-too-short'
          ? 'Nama minimal 2 huruf.'
          : 'Pesan gagal disimpan. Rules Firestore mungkin belum di-deploy.',
      )
    } finally {
      setSending(false)
    }
  }

  const terminalLines = useMemo(() => {
    const lines = [
      codeLine([seg('cmd', './buat-pesanan.sh')], { prompt: true }),
      codeLine([seg('dim', 'nama      '), seg('str', form.name.trim() || '(belum diisi)')]),
      codeLine([seg('dim', 'layanan   '), seg('str', service.name)]),
      codeLine([seg('dim', 'catatan   '), seg('str', form.note.trim() || '(kosong)')]),
      codeLine([seg('dim', 'tujuan    '), seg('fn', config.waBase.replace('https://', ''))]),
    ]

    if (sending) {
      lines.push(codeLine([seg('cmd', 'simpan-ke-firestore.sh')], { prompt: true }))
      lines.push(codeLine([seg('out', '  menulis documents/messages …')]))
    } else if (sent) {
      lines.push(codeLine([seg('cmd', 'simpan-ke-firestore.sh')], { prompt: true }))
      lines.push(codeLine([seg('ok', '[ok] tersimpan. Muncul di /admin.')]))
    } else if (problem) {
      lines.push(codeLine([seg('cmd', 'simpan-ke-firestore.sh')], { prompt: true }))
      lines.push(codeLine([seg('pun', `[err] ${problem}`)]))
    } else {
      lines.push(codeLine([seg('cmd', 'kirim-pesan.sh')], { prompt: true }))
      lines.push(
        codeLine([seg('ok', '[ok] pesan siap. Tekan tombol hijau untuk membuka WhatsApp.')]),
      )
    }

    return lines
  }, [form.name, form.note, service, sending, sent, problem])

  return (
    <section id="kontak" aria-labelledby="kontak-judul" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
          <span className="text-violet">//</span> kontak.sh
        </p>
        <h2
          id="kontak-judul"
          className="mt-4 max-w-[24ch] font-heading text-[1.75rem] leading-[1.12] font-bold tracking-tight text-balance text-text sm:text-[2.25rem]"
        >
          Ceritakan kebutuhan Anda, saya rangkum jadi <span className="text-gradient">pesan siap kirim</span>
        </h2>
        <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-muted">
          Isi tiga baris di bawah. Pesan dirangkai otomatis dan terbuka di WhatsApp, jadi tidak ada
          yang perlu Anda tulis ulang.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <form
            className="glass space-y-4 rounded-panel p-4 sm:p-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label htmlFor={nameId} className="font-mono text-[12px] text-muted">
                nama
              </label>
              <input
                id={nameId}
                name="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Contoh: Budi Santoso"
                autoComplete="name"
                required
                className={`mt-1.5 ${FIELD_CLASS}`}
              />
            </div>

            <div>
              <label htmlFor={serviceId} className="font-mono text-[12px] text-muted">
                layanan
              </label>
              <select
                id={serviceId}
                name="service"
                value={form.serviceId}
                onChange={(event) => setForm({ ...form, serviceId: event.target.value })}
                className={`mt-1.5 cursor-pointer [&>option]:bg-bg [&>option]:text-text ${FIELD_CLASS}`}
              >
                {SERVICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {item.from}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={emailId} className="font-mono text-[12px] text-muted">
                email <span className="text-muted">(opsional)</span>
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="email@bisnis-anda.com"
                autoComplete="email"
                className={`mt-1.5 ${FIELD_CLASS}`}
              />
            </div>

            <div>
              <label htmlFor={noteId} className="font-mono text-[12px] text-muted">
                catatan <span className="text-muted">(opsional)</span>
              </label>
              <textarea
                id={noteId}
                name="note"
                rows={3}
                value={form.note}
                onChange={(event) => setForm({ ...form, note: event.target.value })}
                placeholder="Contoh: 120 produk, butuh bayar QRIS, ada domain sendiri."
                className={`mt-1.5 resize-y ${FIELD_CLASS}`}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="submit" onClick={store} disabled={sending}>
                {sent ? <IconCheck className="h-4 w-4" /> : <IconSend className="h-4 w-4" />}
                {sending ? 'Menyimpan…' : 'Simpan pesan'}
              </Button>
              <Button as="a" href={url} target="_blank" rel="noopener noreferrer" variant="outline">
                <IconWhatsApp className="h-4 w-4" />
                Kirim lewat WhatsApp
              </Button>
              <Button type="button" variant="soft" size="md" onClick={copyLink}>
                <IconCopy className="h-4 w-4" />
                {copied ? 'Tersalin' : 'Salin tautan'}
              </Button>
            </div>

            <p
              className="min-h-[1.1rem] font-mono text-[11px] leading-relaxed text-signal"
              role="status"
              aria-live="polite"
            >
              {problem ?? ' '}
            </p>

            <p className="font-mono text-[11px] leading-relaxed text-muted">
              <span className="text-violet">{'//'} </span>
              Nomor WhatsApp dan email masih contoh. Ganti di src/data/config.js
            </p>
          </form>

          <div className="space-y-4">
            <Terminal file={`~/${config.slug}/kontak.sh`} lines={terminalLines} />
            <div className="glass rounded-panel p-4">
              <h3 className="font-heading text-[14px] font-semibold text-text">
                Lebih nyaman lewat email?
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Balas {config.status.responseTime}. Sertakan contoh website yang Anda sukai, kalau ada.
              </p>
              <a
                href={`mailto:${config.email}?subject=${encodeURIComponent('Permintaan website')}`}
                className="mt-3 inline-flex items-center gap-2 font-mono text-[13px] text-cyan hover:underline"
              >
                <IconMail className="h-4 w-4" />
                {config.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
