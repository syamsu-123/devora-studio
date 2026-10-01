import { STEPS } from '../data/steps'
import { EditorWindow } from './ui/EditorWindow'

const REF_COLOR = {
  main: 'text-syn-str',
  staging: 'text-syn-num',
}

function CommitRow({ step, n }) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] border-b border-line last:border-b-0">
      <span
        aria-hidden="true"
        className="w-9 border-r border-line pr-3 text-right text-[11px] leading-8 text-syn-dim select-none"
      >
        {n}
      </span>
      <p className="flex min-w-0 items-center gap-2 overflow-x-auto px-3 py-1.5 font-mono text-[12.5px] whitespace-nowrap">
        <span aria-hidden="true" className="text-accent">
          *
        </span>
        <span className="text-syn-num">{step.hash}</span>
        <span className={REF_COLOR[step.ref] ?? 'text-syn-str'}>({step.ref})</span>
        <span className="truncate text-text">{step.commit}</span>
        <span className="ml-auto pl-4 text-muted">{step.date}</span>
      </p>
    </li>
  )
}

export function Process() {
  return (
    <section id="proses" aria-labelledby="proses-judul" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
          <span className="text-violet">//</span> proses.log — 4 commit
        </p>
        <h2
          id="proses-judul"
          className="mt-4 font-heading text-[1.75rem] leading-[1.12] font-bold tracking-tight text-balance text-text sm:text-[2.25rem]"
        >
          Empat tahap, dikerjakan <span className="text-gradient">berurutan</span>
        </h2>
        <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-muted">
          Tidak ada tahap yang disembunyikan. Anda tahu apa yang sedang dikerjakan dan kapan Anda
          perlu menjawab sesuatu.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
          <EditorWindow file="git log --oneline --decorate -4">
            <ul>
              {STEPS.map((step, index) => (
                <CommitRow key={step.id} step={step} n={index + 1} />
              ))}
            </ul>
            <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
              4 commit, 1 untuk setiap tahap. Tidak ada commit yang disembunyikan.
            </p>
          </EditorWindow>

          <ol className="space-y-3">
            {STEPS.map((step) => (
              <li key={step.id} className="glass rounded-panel p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-xs bg-brand font-mono text-[12px] font-bold text-white">
                    {step.n}
                  </span>
                  <h3 className="font-heading text-[15px] font-semibold text-text">{step.title}</h3>
                  <span className="ml-auto font-mono text-[11px] text-muted">{step.duration}</span>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.desc}</p>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
                  <span className="text-cyan">output:</span> {step.output}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
