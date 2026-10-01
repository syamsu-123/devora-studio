import { useEffect, useState } from 'react'

/*
 * Routing pathname minimal: cukup untuk "/", "/login", dan redirect sederhana.
 * Menambah pustaka router untuk dua halaman tidak sepadan dengan bobotnya.
 * Firebase Hosting sudah me-rewrite semua path ke /index.html (lihat firebase.json).
 */

function read() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export function usePathname() {
  const [path, setPath] = useState(read)

  useEffect(() => {
    const sync = () => setPath(read())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return path
}

export function navigate(to) {
  if (read() === to) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
