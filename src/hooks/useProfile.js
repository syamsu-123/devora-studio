import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { db } from '../lib/firebase'

/*
 * Role diambil dari dokumen users/{uid} yang di-watch realtime, bukan dari klaim
 * token. Alasannya sederhana: mencabut akses cukup dengan mengubah satu dokumen
 * di Firestore, tanpa menunggu token kedaluwarsa.
 *
 * Modul Firestore diimpor dinamis supaya pengunjung yang tidak masuk tidak ikut
 * mengunduh SDK Firestore hanya untuk hal ini.
 */

export function useProfile() {
  const { user, ready } = useAuth()
  const [profile, setProfile] = useState(null)
  const [profileReady, setProfileReady] = useState(false)

  useEffect(() => {
    if (!ready) return
    if (!user || !db) {
      setProfile(null)
      setProfileReady(true)
      return
    }

    let unsubscribe = null
    let cancelled = false

    import('../lib/firestore')
      .then(({ watchProfile }) => {
        if (cancelled) return
        unsubscribe = watchProfile(
          user.uid,
          (snapshot) => {
            setProfile(snapshot.exists() ? snapshot.data() : null)
            setProfileReady(true)
          },
          () => {
            setProfile(null)
            setProfileReady(true)
          },
        )
      })
      .catch(() => {
        // Chunk gagal dimuat (offline): perlakukan sebagai tanpa role admin.
        if (!cancelled) {
          setProfile(null)
          setProfileReady(true)
        }
      })

    return () => {
      cancelled = true
      if (unsubscribe) unsubscribe()
    }
  }, [user, ready])

  const role = profile?.role === 'admin' ? 'admin' : 'user'

  return { profile, role, isAdmin: role === 'admin', profileReady }
}
