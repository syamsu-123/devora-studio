import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { useTheme } from '../hooks/useTheme'
import { navigate } from '../lib/router'
import { config } from '../data/config'
import { Backdrop } from '../components/Backdrop'
import { Brand } from '../components/Header'
import { StatusBar } from '../components/StatusBar'
import { Nebula } from '../components/Nebula'
import { Terminal } from '../components/Terminal'
import { Button } from '../components/ui/Button'
import { IconArrowRight, IconClose, IconWhatsApp } from '../components/icons'
import { codeLine, seg } from '../lib/syntax'
import { waLink } from '../lib/wa'

const DATE_FORMAT = new Intl.DateTimeFormat(config.status.locale, {
  timeZone: config.timezone,
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDate(value) {
  if (!value) return '—'
  const date = value.toDate ? value.toDate() : value
  return Number.isNaN(date?.getTime?.()) ? 'menunggu…' : DATE_FORMAT.format(date)
}

function MessageRow({ item, onRemove }) {
  const text = `Halo ${config.name}, saya ${item.name} (${item.email}). Minat layanan ${item.layanan}.\n\n${item.note || '(tanpa catatan)'}`

  return (
    <li className="glass rounded-panel p-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[13px] font-bold text-text">{item.name}</p>
          <p className="font-mono text-[11.5px] text-muted">
            {item.email} · {item.layanan} · {formatDate(item.createdAt)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={waLink(text)}
            target="_blank"
            rel="noopener noreferrer"
            title="Balas lewat WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-chip border border-glass-line bg-glass text-muted transition-colors hover:border-positive/50 hover:text-positive"
          >
            <IconWhatsApp className="h-4 w-4" />
            <span className="sr-only">Balas {item.name} lewat WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            title="Hapus pesan"
            className="grid h-9 w-9 place-items-center rounded-chip border border-glass-line bg-glass text-muted transition-colors hover:border-signal/50 hover:text-signal"
          >
            <IconClose className="h-4 w-4" />
            <span className="sr-only">Hapus pesan dari {item.name}</span>
          </button>
        </div>
      </div>
      {item.note ? (
        <p className="mt-3 border-l-2 border-line pl-3 text-[13px] leading-relaxed whitespace-pre-line text-muted">
          {item.note}
        </p>
      ) : null}
    </li>
  )
}

function Guard({ ready, user, isAdmin, children }) {
  useEffect(() => {
    if (ready && (!user || !isAdmin)) navigate('/')
  }, [ready, user, isAdmin])

  if (!ready || !user || !isAdmin) {
    return (
      <p className="font-mono text-[12px] text-muted" role="status" aria-live="polite">
        <span className="text-violet">{'//'} </span>
        memeriksa sesi dan role…
      </p>
    )
  }

  return children
}

export function Admin() {
  const theme = useTheme()
  const { ready, user } = useAuth()
  const { profile, isAdmin } = useProfile()
  const [items, setItems] = useState([])
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready || !user || !isAdmin) return
    // Impor dinamis: hanya admin yang pernah membuka halaman ini yang butuh
    // SDK Firestore untuk membaca collection messages.
    let unsubscribe = null
    let cancelled = false

    import('../lib/firestore').then(
      ({ watchMessages }) => {
        if (cancelled) return
        unsubscribe = watchMessages(
          (snapshot) => {
            setItems(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })))
            setLoading(false)
          },
          () => {
            setProblem('Tidak bisa membaca Firestore. Rules mungkin belum di-deploy.')
            setLoading(false)
          },
        )
      },
      () => {
        setProblem('Gagal memuat Firestore. Periksa koneksi lalu muat ulang.')
        setLoading(false)
      },
    )

    return () => {
      cancelled = true
      if (unsubscribe) unsubscribe()
    }
  }, [ready, user, isAdmin])

  const handleRemove = async (id) => {
    const { removeMessage } = await import('../lib/firestore')
    setItems((current) => current.filter((item) => item.id !== id))
    try {
      await removeMessage(id)
    } catch {
      setProblem('Gagal menghapus pesan.')
    }
  }

  const terminalLines = [
    codeLine([seg('cmd', 'firebase'), seg('dim', ' firestore:list messages --limit 100')], {
      prompt: true,
    }),
    codeLine([seg('dim', 'role     '), seg('str', profile?.role ?? 'user')]),
    codeLine([seg('dim', 'messages '), seg('num', String(items.length))]),
    ...(problem ? [codeLine([seg('pun', `[err] ${problem}`)])] : []),
  ]

  return (
    <div className="relative min-h-dvh bg-bg font-sans text-text">
      <Backdrop />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center gap-3">
          <Brand />
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <IconArrowRight className="h-4 w-4 -rotate-180" />
              Beranda
            </Button>
          </div>
        </header>

        <Guard ready={ready} user={user} isAdmin={isAdmin}>
          <main className="flex-1 py-10 pb-24">
            <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
              <span className="text-violet">//</span> messages
            </p>
            <h1 className="mt-4 font-heading text-[1.9rem] leading-[1.1] font-bold tracking-tight text-balance text-text sm:text-[2.3rem]">
              Kotak masuk <span className="text-gradient">admin</span>
            </h1>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              Hanya akun dengan role <code className="font-mono text-cyan">admin</code> yang bisa
              membuka halaman ini — patokannya ada di security rules, bukan sekadar disembunyikan
              di tampilan.
            </p>

            <div className="mt-8 space-y-3">
              {loading ? (
                <p className="font-mono text-[12px] text-muted">memuat pesan…</p>
              ) : items.length ? (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <MessageRow key={item.id} item={item} onRemove={handleRemove} />
                  ))}
                </ul>
              ) : (
                <p className="glass rounded-panel p-4 font-mono text-[12px] text-muted">
                  Belum ada pesan masuk.
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-start">
              <Terminal file="~/firebase/messages.ts" lines={terminalLines} />
              <Nebula className="mx-auto" />
            </div>
          </main>
        </Guard>
      </div>

      <StatusBar theme={theme} />
    </div>
  )
}
