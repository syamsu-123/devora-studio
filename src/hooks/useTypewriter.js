import { useEffect, useMemo, useState } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Satu-satunya momen animasi panjang di halaman: terminal hero mengetik baris demi baris.
// Kalau pengguna meminta reduced motion, semua baris langsung tampil utuh.
export function useTypewriter(texts, { startDelay = 300, charDelay = 20, linePause = 190 } = {}) {
  // Kunci string supaya array baru dari render lain tidak mengulang efek.
  const key = texts.join('\n')

  const { total, ends } = useMemo(() => {
    let sum = 0
    const lineEnds = []
    for (const text of texts) {
      sum += text.length
      lineEnds.push(sum)
    }
    return { total: sum, ends: lineEnds }
  }, [key])

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(total)
      return
    }
    let timer = 0
    let typed = 0
    const step = () => {
      typed += 1
      setCount(typed)
      if (typed >= total) return
      timer = window.setTimeout(step, ends.includes(typed) ? linePause : charDelay)
    }
    timer = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(timer)
  }, [total, ends, charDelay, linePause, startDelay])

  const lines = useMemo(() => {
    let consumed = 0
    return texts.map((text) => {
      const start = consumed
      const end = start + text.length
      consumed = end
      const visible = Math.max(0, Math.min(count - start, text.length))
      return { text, visible: text.slice(0, visible), complete: count >= end }
    })
  }, [texts, count])

  return { lines, done: count >= total }
}
