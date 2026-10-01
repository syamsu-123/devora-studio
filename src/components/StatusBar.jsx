import { useEffect, useState } from 'react'
import { config } from '../data/config'
import { cn } from '../lib/cn'
import { IconBranch, IconClock } from './icons'

function useJakartaClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 20000)
    return () => window.clearInterval(timer)
  }, [])

  return new Intl.DateTimeFormat(config.status.locale, {
    timeZone: config.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(time)
}

const ITEM_CLASS = 'flex items-center gap-1.5 px-2 py-1 font-mono text-[11px] text-muted'

export function StatusBar({ theme }) {
  const clock = useJakartaClock()
  const { slotsUsed, slotsTotal } = config.status

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-8 border-t border-glass-line bg-bg/85 text-muted backdrop-blur-xl">
      <div className="no-scrollbar flex h-full items-center gap-1 overflow-x-auto px-2 sm:px-3">
        <span className={ITEM_CLASS}>
          <IconBranch className="h-3.5 w-3.5 text-positive" />
          {config.status.branch}
        </span>
        <span className={cn(ITEM_CLASS, 'hidden md:inline-flex')}>~/{config.slug}</span>
        <span className={cn(ITEM_CLASS, 'hidden lg:inline-flex')}>
          semua isi halaman ini contoh
        </span>

        <span className="ml-auto flex items-center gap-1">
          <span className={cn(ITEM_CLASS, 'hidden sm:inline-flex')}>
            <IconClock className="h-3.5 w-3.5" />
            {config.status.responseTime}
          </span>
          <span className={ITEM_CLASS}>
            <span
              aria-hidden="true"
              className="motion-safe:animate-pulse-dot h-1.5 w-1.5 rounded-full bg-positive"
            />
            slot {slotsUsed}/{slotsTotal} bulan ini
          </span>
          <span className={cn(ITEM_CLASS, 'hidden md:inline-flex')}>tema {theme.resolved}</span>
          <span className={ITEM_CLASS}>
            {config.timezone} {clock}
          </span>
        </span>
      </div>
    </div>
  )
}
