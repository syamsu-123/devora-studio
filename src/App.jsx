import { lazy, Suspense, useCallback, useState } from 'react'
import { config } from './data/config'
import { AuthProvider } from './hooks/useAuth'
import { useActiveSection } from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'
import { usePathname } from './lib/router'
import { About } from './components/About'
import { Backdrop } from './components/Backdrop'
import { Contact } from './components/Contact'
import { Explorer } from './components/Explorer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Quote } from './components/Quote'
import { Services } from './components/Services'
import { StatusBar } from './components/StatusBar'
import { Works } from './components/Works'

// Halaman login dan admin dipecah jadi chunk sendiri: pengunjung biasa tidak
// perlu mengunduh panel admin dan Firestore hanya saat dibutuhkan.
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })))

const SECTION_IDS = config.nav.map((item) => item.id)

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

function RouteFallback() {
  return (
    <div className="relative grid min-h-dvh place-items-center bg-bg font-mono text-[12px] text-muted">
      memuat halaman…
    </div>
  )
}

function Routes() {
  const theme = useTheme()
  const activeId = useActiveSection(SECTION_IDS)
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = useCallback(() => setNavOpen(false), [])
  const openNav = useCallback(() => setNavOpen(true), [])

  // Halaman ini punya tata letak sendiri, jadi dikembalikan sebelum section
  // portofolio dirender.
  if (pathname === '/login' || pathname === '/admin') {
    return (
      <Suspense fallback={<RouteFallback />}>
        {pathname === '/login' ? <Login /> : <Admin />}
      </Suspense>
    )
  }

  return (
    <div className="relative min-h-dvh bg-bg font-sans text-text">
      <Backdrop />

      <a
        href="#kontak"
        className="sr-only rounded-chip bg-primary px-3 py-2 font-mono text-[12px] text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60"
      >
        Lompat ke formulir kontak
      </a>

      <Explorer activeId={activeId} open={navOpen} onClose={closeNav} />

      <div className="relative z-10 lg:pl-60 xl:pl-64">
        <Header activeId={activeId} theme={theme} onOpenNav={openNav} />
        <main>
          <Hero />
          <Services />
          <Works />
          <Process />
          <Quote />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>

      <StatusBar theme={theme} />
    </div>
  )
}
