import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, authConfigured } from '../lib/firebase'
import { authErrorMessage } from '../lib/auth-errors'

const AuthContext = createContext(null)

// Dokumen profil ditulis sekali saat login pertama. Impor dinamis supaya SDK
// Firestore tidak ikut terunduh oleh pengunjung yang tidak pernah masuk.
async function writeProfile(authUser) {
  const { ensureUserProfile } = await import('../lib/firestore')
  await ensureUserProfile(authUser)
}

export function AuthProvider({ children }) {
  // `ready` membedakan "belum tahu" dari "tidak masuk": tanpa ini form akan
  // sempat menampilkan sesi kosong sebelum onAuthStateChanged selesai.
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(!authConfigured)

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, async (next) => {
      setUser(next)
      setReady(true)
      if (!next) return
      // Rules menolak (mis. belum di-deploy) tidak boleh menggagalkan login:
      // dokumen profil bukan syarat memakai situs, hanya penentu role.
      try {
        await writeProfile(next)
      } catch {
        // Diabaikan dengan sengaja.
      }
    })
  }, [])

  const signIn = useCallback(
    async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    [],
  )

  const signUp = useCallback(async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    try {
      await writeProfile(credential.user)
    } catch {
      // Diabaikan dengan sengaja: akun tetap ada, role menyusul saat rules aktif.
    }
  }, [])

  const signOutAccount = useCallback(async () => {
    await signOut(auth)
  }, [])

  const resetPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email)
  }, [])

  const value = useMemo(
    () => ({
      user,
      ready,
      configured: authConfigured,
      signIn,
      signUp,
      signOut: signOutAccount,
      resetPassword,
      authErrorMessage,
    }),
    [user, ready, signIn, signUp, signOutAccount, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return context
}
