import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

/*
 * Satu-satunya tempat yang boleh menyebut nama collection, supaya mudah refactor
 * dan tidak ada string collection yang tercecer di komponen.
 */

export const USERS = 'users'
export const MESSAGES = 'messages'

const MESSAGE_LIMIT = 100
const SERVICE_LIMIT = 60

/**
 * Membuat dokumen profil saat pertama kali masuk.
 *
 * setDoc dengan merge: kalau dokumen sudah ada (misalnya user yang sama
 * membuka tab kedua), role yang sudah ada tidak ditimpa.
 */
export async function ensureUserProfile(authUser) {
  const profile = {
    email: authUser.email,
    displayName: authUser.displayName || authUser.email.split('@')[0],
    role: 'user',
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, USERS, authUser.uid), profile, { merge: true })
}

/**
 * Menulis pesan dari form kontak.
 *
 * createdAt memakai serverTimestamp(), dan rules membandingkannya dengan
 * request.time — jadi jam di browser tidak bisa dipalsukan.
 */
export async function saveMessage({ name, email, service, note, userId }) {
  // Field 'service' tidak boleh dipakai: `service` itu keyword tercadang di
  // bahasa Firestore rules, jadi `d.service` gagal dikompilasi.
  const trimmed = {
    name: name.trim().slice(0, 80),
    email: email.trim().slice(0, 120),
    layanan: service.slice(0, SERVICE_LIMIT),
    note: note.trim().slice(0, 1000),
  }

  if (trimmed.name.length < 2) throw new Error('nama-too-short')
  if (!trimmed.email) throw new Error('email-empty')

  return addDoc(collection(db, MESSAGES), {
    ...trimmed,
    userId: userId ?? null,
    createdAt: serverTimestamp(),
  })
}

/**
 * Mengikuti dokumen profil sendiri secara realtime, supaya mencabut role di
 * Firebase Console langsung berlaku tanpa perlu refresh halaman.
 */
export function watchProfile(uid, callback, errorCallback) {
  return onSnapshot(doc(db, USERS, uid), callback, errorCallback)
}

export function watchMessages(callback, errorCallback) {
  const q = query(
    collection(db, MESSAGES),
    orderBy('createdAt', 'desc'),
    limit(MESSAGE_LIMIT),
  )
  return onSnapshot(q, callback, errorCallback)
}

export function removeMessage(id) {
  return deleteDoc(doc(db, MESSAGES, id))
}
