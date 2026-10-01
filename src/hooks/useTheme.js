import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'studio-theme'
// Dark adalah identitas visual NAMA STUDIO, jadi itu tema awal (bukan "sistem").
const ORDER = ['dark', 'light', 'system']

function readPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return ORDER.includes(saved) ? saved : 'dark'
  } catch {
    return 'dark'
  }
}

function readSystem() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [preference, setPreferenceState] = useState(readPreference)
  const [system, setSystem] = useState(readSystem)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystem(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const resolved = preference === 'system' ? system : preference

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', resolved)
    try {
      if (preference === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      // Penyimpanan browser penuh atau dinonaktifkan: tema tetap berlaku di sesi ini.
    }
  }, [preference, resolved])

  const setPreference = useCallback((value) => setPreferenceState(value), [])

  const cycle = useCallback(() => {
    setPreferenceState((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length])
  }, [])

  return { preference, resolved, setPreference, cycle }
}
