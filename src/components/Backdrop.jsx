import { useEffect, useRef } from 'react'

/*
 * Lapisan latar: bintang, aura warna, grid, dan scanlines.
 * Bintang + aura digambar sebagai gradient berulang yang di-translate,
 * jadi tidak ada elemen DOM per bintang dan tidak ada repaint.
 * Grid + scanlines ikut di dalam satu wrapper agar z-index tidak menabrak konten.
 */

function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // Glow hanya di perangkat dengan pointer presisi (desktop).
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let cx = x
    let cy = y

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      node.style.opacity = '1'
    }

    const tick = () => {
      // Lerp ringan: gerakan tetap mulus tanpa menulis transform tiap event.
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      node.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export function Backdrop() {
  return (
    <>
      <div className="starfield" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none fixed inset-0 z-0 opacity-60 mask-fade-radial"
      />
      <div className="scanlines" aria-hidden="true" />
      <CursorGlow />
    </>
  )
}
