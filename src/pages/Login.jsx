import { useEffect, useId, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { cn } from '../lib/cn'
import { missingAuthEnv } from '../lib/firebase'
import { navigate } from '../lib/router'
import { codeLine, seg } from '../lib/syntax'
import { Backdrop } from '../components/Backdrop'
import { Brand } from '../components/Header'
import { Terminal } from '../components/Terminal'
import { Button } from '../components/ui/Button'
import { IconArrowRight, IconCheck, IconEye, IconEyeOff } from '../components/icons'

const MODES = {
  masuk: { label: 'Masuk', cta: 'Masuk sekarang', file: '~/auth/login.sh' },
  daftar: { label: 'Daftar', cta: 'Buat akun', file: '~/auth/signup.sh' },
}

const HIGHLIGHTS = [
  'Token sesi dikelola Firebase, tidak disimpan manual di situs.',
  'Kata sandi tidak pernah menyentuh kode halaman ini.',
  'Aktifkan Email/Password di Firebase Console sebelum dipakai.',
]

const FIELD_CLASS =
  'w-full rounded-chip border border-glass-line bg-bg/60 px-3 py-2.5 font-mono text-[13.5px] text-text placeholder:text-syn-dim focus:border-cyan/50'

function PasswordField({ id, label, value, onChange, autoComplete, hint }) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? IconEyeOff : IconEye

  return (
    <div>
      <label htmlFor={id} className="font-mono text-[12px] text-muted">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          minLength={6}
          className={cn(FIELD_CLASS, 'pr-11')}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Sembunyikan password' : 'Tampilkan password'}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center text-syn-dim transition-colors hover:text-cyan"
        >
          <Icon className="h-4 w-4" />
        </button>
      </div>
      {hint ? <p className="mt-1.5 font-mono text-[11px] text-muted">{hint}</p> : null}
    </div>
  )
}

function AuthTerminal({ mode, email, status }) {
  const lines = [
    codeLine([seg('cmd', `./${mode}.sh`), seg('dim', ` --email ${email || '<'} '>'`)], {
      prompt: true,
    }),
    codeLine([seg('dim', 'provider '), seg('str', 'firebase/auth · email+password')]),
    codeLine([seg('dim', 'mode     '), seg('fn', mode)]),
    codeLine([seg('dim', 'status   '), seg('out', status.text)]),
  ]
  if (status.ok) lines.push(codeLine([seg('ok', `[ok] ${status.detail}`)]))

  return <Terminal file={MODES[mode].file} lines={lines} className="w-full" />
}

function MissingEnv() {
  return (
    <div className="glass space-y-3 rounded-panel p-4 sm:p-5">
      <h2 className="font-heading text-[15px] font-semibold text-text">
        Firebase belum dikonfigurasi
      </h2>
      <p className="text-[13px] leading-relaxed text-muted">
        Buat file <code className="font-mono text-cyan">.env.local</code> di root proyek, lalu
        salin nilainya dari Firebase Console → Project settings → Your apps.
      </p>
      <ul className="space-y-1 font-mono text-[11.5px] text-muted">
        {missingAuthEnv.map((key) => (
          <li key={key}>
            <span className="text-violet">{'//'} </span>
            {key}=…
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Login() {
  const { user, ready, configured, signIn, signUp, resetPassword, authErrorMessage } = useAuth()
  const { isAdmin } = useProfile()
  const [mode, setMode] = useState('masuk')
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)
  const emailId = useId()
  const passwordId = useId()
  const confirmId = useId()

  const meta = MODES[mode]

  // Sudah punya sesi? Langsung ke panel admin bila memang admin, selain itu
  // balik ke beranda. Jangan biarkan form menggantung.
  useEffect(() => {
    if (ready && user) navigate(isAdmin ? '/admin' : '/')
  }, [ready, user, isAdmin])

  const status = useMemo(() => {
    if (busy) return { ok: false, text: 'memverifikasi kredensial…', detail: '' }
    if (error) return { ok: false, text: 'gagal', detail: '' }
    if (notice) return { ok: true, text: 'selesai', detail: notice }
    return { ok: false, text: 'menunggu input…', detail: '' }
  }, [busy, error, notice])

  const switchMode = (next) => {
    setMode(next)
    setError(null)
    setNotice(null)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (busy) return
    setError(null)
    setNotice(null)

    if (mode === 'daftar' && form.password !== form.confirm) {
      setError('Konfirmasi password belum sama.')
      return
    }

    setBusy(true)
    try {
      if (mode === 'masuk') {
        await signIn(form.email.trim(), form.password)
        // Pengarahannya ditangani useEffect di atas: admin ke /admin, selain
        // itu ke beranda. Jadi di sini tidak perlu navigate manual.
      } else {
        await signUp(form.email.trim(), form.password)
        setNotice('Akun dibuat. Silakan masuk dengan email tersebut.')
        setForm({ email: form.email.trim(), password: '', confirm: '' })
        setMode('masuk')
      }
    } catch (cause) {
      setError(authErrorMessage(cause))
    } finally {
      setBusy(false)
    }
  }

  const sendReset = async () => {
    if (busy) return
    setError(null)
    setNotice(null)
    if (!form.email.trim()) {
      setError('Isi email dulu, lalu tekan tombol atur ulang password.')
      return
    }
    setBusy(true)
    try {
      await resetPassword(form.email.trim())
      setNotice('Email atur ulang password sudah dikirim. Cek kotak masuk Anda.')
    } catch (cause) {
      setError(authErrorMessage(cause))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative min-h-dvh bg-bg font-sans text-text">
      <Backdrop />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center gap-3">
          <Brand />
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <IconArrowRight className="h-4 w-4 -rotate-180" />
              Beranda
            </Button>
          </div>
        </header>

        <main className="flex flex-1 items-center py-12">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
                <span className="text-violet">//</span> auth.sh
              </p>
              <h1 className="mt-4 font-heading text-[1.9rem] leading-[1.1] font-bold tracking-tight text-balance text-text sm:text-[2.4rem]">
                Masuk ke <span className="text-gradient">ruang kerja</span>
              </h1>
              <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-muted">
                Autentikasi memakai Firebase Authentication dengan email dan password. Status sesi
                dibaca otomatis setiap kali halaman dimuat.
              </p>

              <ul className="mt-7 space-y-2.5 font-mono text-[12px] leading-relaxed text-muted">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-positive" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {configured ? (
                <form onSubmit={submit} className="glass space-y-4 rounded-panel p-4 sm:p-5">
                  <div
                    role="group"
                    aria-label="Pilih jenis autentikasi"
                    className="flex rounded-chip border border-glass-line bg-bg/50 p-0.5"
                  >
                    {Object.entries(MODES).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => switchMode(key)}
                        aria-pressed={mode === key}
                        className={cn(
                          'flex-1 rounded-xs px-3 py-1.5 font-mono text-[12px] transition-colors',
                          mode === key ? 'bg-brand text-white' : 'text-muted hover:text-text',
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label htmlFor={emailId} className="font-mono text-[12px] text-muted">
                      email
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      placeholder="nama@studio.com"
                      autoComplete="email"
                      required
                      className={`mt-1.5 ${FIELD_CLASS}`}
                    />
                  </div>

                  <PasswordField
                    id={passwordId}
                    label="password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    autoComplete={mode === 'masuk' ? 'current-password' : 'new-password'}
                    hint={mode === 'daftar' ? 'Minimal 6 karakter.' : null}
                  />

                  {mode === 'daftar' ? (
                    <PasswordField
                      id={confirmId}
                      label="ulang password"
                      value={form.confirm}
                      onChange={(event) => setForm({ ...form, confirm: event.target.value })}
                      autoComplete="new-password"
                    />
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button type="submit" disabled={busy}>
                      {busy ? 'Memproses…' : meta.cta}
                      <IconArrowRight className="h-4 w-4" />
                    </Button>
                    {mode === 'masuk' ? (
                      <Button type="button" variant="outline" size="md" onClick={sendReset}>
                        Atur ulang password
                      </Button>
                    ) : null}
                  </div>

                  <p
                    className="min-h-[1.1rem] font-mono text-[11px] leading-relaxed text-signal"
                    role="status"
                    aria-live="polite"
                  >
                    {error ?? notice ?? ' '}
                  </p>
                </form>
              ) : (
                <MissingEnv />
              )}

              <AuthTerminal mode={mode} email={form.email.trim()} status={status} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
