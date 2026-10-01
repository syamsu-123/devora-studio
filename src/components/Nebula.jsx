import { cn } from '../lib/cn'

/*
 * PROGRAMMING NEBULA
 * Galaksi digital yang dibangun dari transform 3D CSS (tanpa Three.js):
 * setiap orbit adalah bidang datar yang dimiringkan dengan rotateX lalu
 * diputar. Elips yang terbentuk + perspective itulah yang memberi efek 3D,
 * depth, dan parallax pada token kodenya.
 *
 * Semua animasi hanya mengubah transform, jadi tetap jalan di compositor.
 * Arah putar tiap orbit berbeda (normal / reverse) supaya geraknya berlawanan.
 */

const RINGS = [
  {
    id: 'orbit-1',
    // Miring hampir mendatar → token terbaca seperti huruf di permukaan cakram.
    tilt: 'rotateX(76deg)',
    count: 14,
    radius: 0.5,
    duration: 54,
    direction: 'normal',
    trail: { dash: '26 268', tone: 'rgb(120 190 255 / 0.5)', width: 0.5 },
    glyphs: [
      'const',
      'async',
      'await',
      '{}',
      'function',
      'React',
      '=>',
      '1010',
      'export',
      '{ }',
      '0x1F',
      '$',
      '/*',
      ';',
    ],
  },
  {
    id: 'orbit-2',
    tilt: 'rotateX(63deg) rotateZ(34deg)',
    count: 11,
    radius: 0.375,
    duration: 38,
    direction: 'reverse',
    trail: { dash: '18 218', tone: 'rgb(157 92 255 / 0.45)', width: 0.6 },
    glyphs: ['<>', 'JS', 'TS', 'CSS', 'HTML', '/', '#', 'async', 'React', 'API', '01'],
  },
  {
    id: 'orbit-3',
    tilt: 'rotateX(50deg) rotateZ(-26deg)',
    count: 8,
    radius: 0.255,
    duration: 25,
    direction: 'normal',
    trail: { dash: '12 148', tone: 'rgb(46 230 255 / 0.5)', width: 0.7 },
    glyphs: ['Firebase', '</>', '{}', '=', 'TS', '0', '1', ':'],
  },
]

const TONES = ['cyan', 'blue', 'violet', 'text', 'dim']

// Lencana teknologi: glass cube melayang di sekeliling inti.
// Posisi dalam persen dan tanpa nilai negatif supaya tidak terpotong tepi hero.
const CHIPS = [
  { label: 'React', dot: 'var(--color-cyan)', pos: { left: '1%', top: '13%' }, r: 'rotate(-7deg) rotateY(22deg)', dur: '7.5s', delay: '0s' },
  { label: 'JavaScript', dot: 'var(--color-signal)', pos: { right: '0%', top: '2%' }, r: 'rotate(6deg) rotateY(-20deg)', dur: '8.5s', delay: '-2s' },
  { label: 'TypeScript', dot: 'var(--color-primary)', pos: { left: '0%', top: '45%' }, r: 'rotate(5deg) rotateY(26deg)', dur: '9.5s', delay: '-4s' },
  { label: 'Firebase', dot: 'var(--color-violet)', pos: { right: '0%', top: '41%' }, r: 'rotate(-6deg) rotateY(-24deg)', dur: '8s', delay: '-1s' },
  { label: 'Tailwind', dot: 'var(--color-cyan)', pos: { left: '3%', top: '84%' }, r: 'rotate(-4deg) rotateY(18deg)', dur: '9s', delay: '-3s' },
  { label: 'Node.js', dot: 'var(--color-positive)', pos: { right: '1%', top: '88%' }, r: 'rotate(7deg) rotateY(-16deg)', dur: '10s', delay: '-5s' },
  { label: 'API', dot: 'var(--color-signal)', pos: { left: '38%', top: '93%' }, r: 'rotate(-2deg) rotateY(12deg)', dur: '7s', delay: '-6s' },
]

// Partikel holografis yang melayang bebas di luar orbit.
const MOTES = [
  { left: '8%', top: '22%', color: 'var(--color-cyan)', dur: '6.5s', delay: '-0.4s' },
  { left: '18%', top: '72%', color: 'var(--color-primary)', dur: '8s', delay: '-1.6s' },
  { left: '29%', top: '9%', color: 'var(--color-violet)', dur: '7.2s', delay: '-3.1s' },
  { left: '41%', top: '84%', color: 'var(--color-cyan)', dur: '9.4s', delay: '-2.2s' },
  { left: '56%', top: '16%', color: 'var(--color-signal)', dur: '6.8s', delay: '-4.7s' },
  { left: '67%', top: '68%', color: 'var(--color-violet)', dur: '8.6s', delay: '-1.1s' },
  { left: '79%', top: '27%', color: 'var(--color-cyan)', dur: '7.6s', delay: '-5.3s' },
  { left: '88%', top: '78%', color: 'var(--color-primary)', dur: '9s', delay: '-3.8s' },
  { left: '93%', top: '12%', color: 'var(--color-signal)', dur: '6.2s', delay: '-2.6s' },
  { left: '33%', top: '48%', color: 'var(--color-violet)', dur: '10s', delay: '-0.9s' },
]

function Orb({ angle, radius, tone, children }) {
  return (
    <span
      className="neb-orb"
      style={{ '--a': `${angle}deg`, '--r': radius, '--back': `${-angle}deg` }}
    >
      <span className="neb-glyph" data-tone={tone}>
        {children}
      </span>
    </span>
  )
}

function Trail({ radius, dash, tone, width }) {
  return (
    <svg className="neb-trail" viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r={50 * radius}
        fill="none"
        stroke={tone}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dash}
      />
    </svg>
  )
}

function Ring({ ring, ringIndex }) {
  const step = 360 / ring.count

  return (
    <div
      className="neb-ring"
      style={{ '--dur': `${ring.duration}s`, '--dir': ring.direction }}
      aria-hidden="true"
    >
      <div className="neb-plane" style={{ transform: ring.tilt }}>
        <Trail radius={ring.radius} {...ring.trail} />
        {Array.from({ length: ring.count }, (_, index) => (
          <Orb
            key={index}
            angle={index * step}
            radius={ring.radius}
            tone={TONES[(index + ringIndex) % TONES.length]}
          >
            {ring.glyphs[index % ring.glyphs.length]}
          </Orb>
        ))}
      </div>
    </div>
  )
}

function Core() {
  return (
    <div className="neb-core" aria-hidden="true">
      <div className="neb-core-halo" />
      <div className="neb-core-shell" />
      <div className="neb-core-ring" data-variant="b" style={{ '--dur': '16s' }} />
      <div
        className="neb-core-ring"
        data-variant="a"
        data-dir="reverse"
        style={{ '--dur': '23s' }}
      />
      <div className="neb-core-ring" data-variant="b" style={{ '--dur': '31s' }} />
      <span className="neb-holo" data-glyph={'< />'}>
        <span aria-hidden="true">&lt; /&gt;</span>
      </span>
    </div>
  )
}

function FloatingChips() {
  return (
    <>
      {CHIPS.map((chip) => (
        <span
          key={chip.label}
          className="neb-chip"
          style={{
            ...chip.pos,
            '--dot': chip.dot,
            '--dur': chip.dur,
            '--delay': chip.delay,
            '--drift-a': chip.r,
            '--drift-b': `${chip.r} translateY(-7px)`,
          }}
        >
          {chip.label}
        </span>
      ))}
    </>
  )
}

export function Nebula({ className }) {
  return (
    <div className={cn('relative', className)}>
      {/* Lencana teknologi melayang di luar scene 3D, dengan perspective sendiri
          supaya rotateY-nya benar-benar terlihat. */}
      <div aria-hidden="true" className="neb-chip-field pointer-events-none absolute inset-0">
        <FloatingChips />
      </div>

      <div className="nebula">
        <div className="neb-aura" aria-hidden="true" />
        <div className="neb-scene">
          {RINGS.map((ring, ringIndex) => (
            <Ring key={ring.id} ring={ring} ringIndex={ringIndex} />
          ))}
          <Core />
        </div>
        <div className="neb-sweep" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0">
          {MOTES.map((mote) => (
            <span
              key={`${mote.left}-${mote.top}`}
              className="neb-mote"
              style={{
                left: mote.left,
                top: mote.top,
                '--mote': mote.color,
                '--dur': mote.dur,
                '--delay': mote.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
