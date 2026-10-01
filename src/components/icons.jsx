// Semua ikon dibuat sebagai SVG inline, tanpa pustaka ikon.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

function Svg({ className = 'h-4 w-4', children, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} {...rest}>
      {children}
    </svg>
  )
}

export function IconSun(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </Svg>
  )
}

export function IconMoon(props) {
  return (
    <Svg {...props}>
      <path d="M20 14.2A8 8 0 1 1 9.8 4a6.5 6.5 0 0 0 10.2 10.2Z" />
    </Svg>
  )
}

export function IconMonitor(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8m-4-4v4" />
    </Svg>
  )
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </Svg>
  )
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  )
}

export function IconDesktop(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M9 21h6" />
    </Svg>
  )
}

export function IconPhone(props) {
  return (
    <Svg {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </Svg>
  )
}

export function IconWhatsApp(props) {
  return (
    <Svg {...props} strokeWidth={1.5}>
      <path d="M3.5 20.5 5 16.4A8 8 0 1 1 8 19.1Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-.9v-.8l-1.9-.6-.8.9a6 6 0 0 1-2.4-2.4l.9-.8-.6-1.9H10a1 1 0 0 0-1 1Z" />
    </Svg>
  )
}

export function IconMail(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  )
}

export function IconCopy(props) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5H6a2 2 0 0 0-2 2v9" />
    </Svg>
  )
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  )
}

export function IconFile(props) {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
    </Svg>
  )
}

export function IconBranch(props) {
  return (
    <Svg {...props}>
      <circle cx="7" cy="6" r="2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="9" r="2" />
      <path d="M7 8v8m0-1c0-3 10-1 10-5" />
    </Svg>
  )
}

export function IconClock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  )
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Svg>
  )
}

export function IconTerminal(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="m7.5 10 2.5 2-2.5 2M13 14h4" />
    </Svg>
  )
}

export function IconFolder(props) {
  return (
    <Svg {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </Svg>
  )
}

export function IconFolderOpen(props) {
  return (
    <Svg {...props}>
      <path d="M3 8V6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1" />
      <path d="M3.5 10h17l-2 9h-13Z" />
    </Svg>
  )
}

export function IconFileCode(props) {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M10 12.5 8.5 14l1.5 1.5M14 12.5 15.5 14 14 15.5" />
    </Svg>
  )
}

export function IconJson(props) {
  return (
    <Svg {...props}>
      <path d="M9 4c-2 0-2 2-2 3s-1 2-2 2c1 0 2 1 2 2s0 3 2 3M15 4c2 0 2 2 2 3s1 2 2 2c-1 0-2 1-2 2s0 3-2 3" />
    </Svg>
  )
}

export function IconMarkdown(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M6.5 15.5v-6l2.5 3 2.5-3v6M15.5 9.5v6M13.5 13.5l2 2 2-2" />
    </Svg>
  )
}

export function IconPackage(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8Z" />
      <path d="M4 8l8 4.5L20 8M12 12.5V20.5" />
    </Svg>
  )
}

export function IconReact(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </Svg>
  )
}

export function IconLayers(props) {
  return (
    <Svg {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />
      <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
    </Svg>
  )
}

export function IconCart(props) {
  return (
    <Svg {...props}>
      <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.5L20 8H6" />
      <circle cx="10" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </Svg>
  )
}

export function IconDashboard(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </Svg>
  )
}

export function IconExternal(props) {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6M20 4l-8 8" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </Svg>
  )
}

export function IconSpark(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </Svg>
  )
}

export function IconEye(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  )
}

export function IconEyeOff(props) {
  return (
    <Svg {...props}>
      <path d="M4 4l16 16" />
      <path d="M9.5 5.9A8.6 8.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.4 4.2" />
      <path d="M6.4 8A17 17 0 0 0 2.5 12S6 18.5 12 18.5a8.9 8.9 0 0 0 3.6-.8" />
      <path d="M9.9 10.2a3 3 0 0 0 4 4.1" />
    </Svg>
  )
}

export function IconSend(props) {
  return (
    <Svg {...props}>
      <path d="M20.5 3.5 10.8 13.2" />
      <path d="M20.5 3.5 14 20.5l-3.2-7.3L3.5 10Z" />
    </Svg>
  )
}

export function IconLogout(props) {
  return (
    <Svg {...props}>
      <path d="M14 5.5V4.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h6a1.5 1.5 0 0 0 1.5-1.5v-1" />
      <path d="M10 12h10m0 0-3-3m3 3-3 3" />
    </Svg>
  )
}

export function IconUser(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </Svg>
  )
}
