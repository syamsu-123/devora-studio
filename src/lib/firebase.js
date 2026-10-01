import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/*
 * Inisialisasi Firebase client.
 *
 * Semua nilai diambil dari import.meta.env (lihat .env.example) supaya tidak ada
 * apiKey yang ikut ter-commit ke repo. Kredensial Firebase Web memang aman
 * dipublikasikan (rules/projek yang melindungi data), tapi tetap lebih rapi
 * disimpan di luar source.
 *
 * auth sengaja boleh null: kalau env belum diisi, halaman /login menampilkan
 * panel setup, bukan melempar error yang sulit dibaca pengguna.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const authConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

const app = authConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

export const missingAuthEnv = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
].filter((key) => !firebaseConfig[key])
