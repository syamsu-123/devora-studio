// Kutipan masih contoh. Ganti dengan testimoni asli beserta nama dan usaha klien.
const QUOTE = {
  file: 'testimoni.md',
  text: [
    'Dulu saya pikir bikin website itu mahal dan lama. Ternyata dokumen masuk hari kedua,',
    'dan saya sudah bisa lihat perkiraannya. Yang paling membantu: satu halaman untuk',
    'cara booking, jadi telepon yang masuk jauh berkurang.',
  ],
  author: 'Ibu Rina Kartika',
  role: 'Pemilik Klinik Sehat Ibu (contoh)',
  contoh: true,
}

export function Quote() {
  return (
    <section id="testimoni" aria-labelledby="testimoni-judul" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
          <span className="text-violet">//</span> {QUOTE.file}
        </p>
        <h2 id="testimoni-judul" className="sr-only">
          Testimoni klien
        </h2>

        <figure className="glass mt-4 overflow-hidden rounded-window">
          <blockquote className="grid gap-1 p-5 sm:p-8">
            {QUOTE.text.map((row) => (
              <p key={row} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <span aria-hidden="true" className="font-mono text-[15px] text-violet">
                  &gt;
                </span>
                <span className="font-heading text-[16px] leading-relaxed text-balance text-text sm:text-[18px]">
                  {row}
                </span>
              </p>
            ))}
          </blockquote>
          <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-glass-line bg-glass px-5 py-3 sm:px-8">
            <span className="font-mono text-[13px] text-text">{QUOTE.author}</span>
            <span className="text-[13px] text-muted">{QUOTE.role}</span>
            <span className="ml-auto rounded-xs border border-dashed border-glass-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {QUOTE.contoh ? 'kutipan contoh' : 'kutipan asli'}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
