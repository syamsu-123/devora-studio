import { useEffect, useState } from 'react'
import { config } from '../data/config'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { cn } from '../lib/cn'
import { navigate } from '../lib/router'
import { waLink } from '../lib/wa'
import {
  IconArrowRight,
  IconFileCode,
  IconJson,
  IconLogout,
  IconMarkdown,
  IconMenu,
  IconMonitor,
  IconMoon,
  IconPackage,
  IconReact,
  IconSun,
  IconTerminal,
  IconUser,
  IconWhatsApp,
} from './icons'

const THEME_META = {
  system: { label: 'sys', hint: 'Ikuti pengaturan perangkat', Icon: IconMonitor },
  light: { label: 'terang', hint: 'Tema terang', Icon: IconSun },
  dark: { label: 'gelap', hint: 'Tema gelap', Icon: IconMoon },
}

const NAV_ICON = {
  react: IconReact,
  component: IconFileCode,
  package: IconPackage,
  terminal: IconTerminal,
  doc: IconMarkdown,
  json: IconJson,
}

export function Brand({ className }) {
  return (
    <a
      href="/"
      onClick={go('/')}
      className={cn('group flex min-w-0 items-center gap-2.5', className)}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-xs border border-glass-line bg-brand font-mono text-[12px] font-bold text-white glow-primary"
      >
        &gt;_
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-[13px] font-bold tracking-wide text-text">
          {config.name}
        </span>
        <span className="block truncate font-mono text-[10px] text-muted">{config.domain}</span>
      </span>
    </a>
  )
}

function ThemeToggle({ preference, onCycle }) {
  const meta = THEME_META[preference] ?? THEME_META.system
  const next = preference === 'dark' ? 'terang' : preference === 'light' ? 'sistem' : 'gelap'
  const label = `Tema ${meta.label}. Tekan untuk memakai tema ${next}.`
  const isDark = preference !== 'light'

  return (
    <button
      type="button"
      onClick={onCycle}
      title={`${meta.hint} (${meta.label})`}
      aria-label={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-chip border border-glass-line bg-glass font-mono text-[13px] text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
    >
      {isDark ? '☾' : '☼'}
      <span className="sr-only">{meta.hint}</span>
    </button>
  )
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

function go(to) {
  return (event) => {
    // Cmd/Ctrl+klik membuka tab baru seperti tautan biasa.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    navigate(to)
  }
}

function AccountAction() {
  const { user, ready, configured, signOut } = useAuth()
  const { isAdmin } = useProfile()

  if (!ready || !configured) return null

  if (!user) {
    return (
      <a
        href="/login"
        onClick={go('/login')}
        className="hidden h-9 items-center gap-2 rounded-chip border border-glass-line bg-glass px-3 font-mono text-[12px] text-muted transition-colors hover:border-cyan/50 hover:text-cyan sm:inline-flex"
      >
        <IconUser className="h-4 w-4" />
        Masuk
      </a>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {isAdmin ? (
        <a
          href="/admin"
          onClick={go('/admin')}
          title="Kotak masuk admin"
          className="hidden h-9 items-center gap-2 rounded-chip border border-transparent bg-brand px-3 font-mono text-[12px] text-white glow-primary transition-all hover:brightness-115 hover:glow-primary-lg md:inline-flex"
        >
          <IconTerminal className="h-4 w-4" />
          Panel
        </a>
      ) : null}
      <span
        title={user.email}
        className="hidden max-w-[16ch] truncate rounded-chip border border-glass-line bg-glass px-2.5 py-1.5 font-mono text-[11.5px] text-muted sm:block"
      >
        {user.email}
      </span>
      <button
        type="button"
        onClick={() => signOut()}
        title="Keluar dari sesi"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-chip border border-glass-line bg-glass text-muted transition-colors hover:border-signal/50 hover:text-signal"
      >
        <IconLogout className="h-4 w-4" />
        <span className="sr-only">Keluar dari sesi</span>
      </button>
    </div>
  )
}

export function Header({ activeId, theme, onOpenNav }) {
  const scrolled = useScrolled()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300',
        scrolled
          ? 'border-glass-line bg-bg/85 shadow-[0_18px_40px_-34px_rgb(0_0_0/0.9)] backdrop-blur-xl'
          : 'border-transparent bg-bg/35 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenNav}
          aria-label="Buka sidebar explorer"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-chip border border-glass-line bg-glass text-muted transition-colors hover:border-cyan/50 hover:text-cyan lg:hidden"
        >
          <IconMenu className="h-4 w-4" />
        </button>

        <Brand className="min-w-0 lg:hidden" />

        <nav
          aria-label="Bagian halaman"
          className="no-scrollbar hidden min-w-0 flex-1 overflow-x-auto lg:block"
        >
          <ul className="flex items-center gap-0.5">
            {config.nav.map((item) => {
              const active = activeId === item.id
              const Icon = NAV_ICON[item.icon] ?? IconFileCode
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1.5 font-mono text-[12px] transition-colors',
                      active ? 'text-text' : 'text-muted hover:text-text',
                    )}
                  >
                    <Icon className={cn('h-3.5 w-3.5', active ? 'text-cyan' : 'text-syn-dim')} />
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-2 -bottom-[9px] h-[2px] rounded-full bg-brand transition-opacity',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle preference={theme.preference} onCycle={theme.cycle} />
          <AccountAction />
          {/* Di 1024–1279px navbar sudah penuh oleh 7 item, jadi tombol ini
              disembunyikan di rentang itu dan muncul lagi mulai 1280px. */}
          <a
            href={waLink(config.waIntro)}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden h-9 items-center gap-2 rounded-chip border border-transparent bg-brand px-3.5 font-mono text-[12px] text-white glow-primary transition-all hover:brightness-115 hover:glow-primary-lg sm:inline-flex lg:hidden xl:inline-flex"
          >
            <IconWhatsApp className="h-4 w-4" />
            Hubungi Kami
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
