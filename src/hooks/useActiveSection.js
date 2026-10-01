import { useEffect, useState } from 'react'

// Menandai bagian yang sedang dibaca, dipakai navbar dan sidebar Explorer.
// Id diurutkan ulang mengikuti posisi dokumen, jadi urutan menu di config
// tidak harus sama dengan urutan section di halaman.
export function useActiveSection(ids, offset = 140) {
  const key = ids.join('|')
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const probe = window.scrollY + offset
      const list = key
        .split('|')
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item) => item.el)
        .sort((a, b) => a.el.offsetTop - b.el.offsetTop)

      if (!list.length) return

      let current = list[0].id
      for (const item of list) {
        if (item.el.offsetTop <= probe) current = item.id
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = list[list.length - 1].id
      setActive((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [key, offset])

  return active
}
