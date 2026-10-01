// Kode error dari Firebase Auth ditulis dalam bahasa Inggris; di sini diterjemahkan
// ke bahasa situs supaya pesan di form tidak terlihat seperti log mentah.
const MESSAGES = {
  'auth/invalid-email': 'Format email tidak valid.',
  'auth/missing-email': 'Email belum diisi.',
  'auth/missing-password': 'Password belum diisi.',
  'auth/weak-password': 'Password minimal 6 karakter.',
  'auth/email-already-in-use': 'Email ini sudah terdaftar. Silakan masuk.',
  'auth/user-not-found': 'Akun dengan email ini tidak ditemukan.',
  'auth/wrong-password': 'Password salah. Coba lagi atau atur ulang.',
  'auth/invalid-credential': 'Email atau password salah.',
  'auth/invalid-login-credentials': 'Email atau password salah.',
  'auth/too-many-requests': 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.',
  'auth/network-request-failed': 'Koneksi bermasalah. Periksa jaringan Anda.',
  'auth/operation-not-allowed': 'Metode ini belum diaktifkan di Firebase Console.',
  'auth/requires-recent-login': 'Sesi sudah terlalu lama. Masuk ulang terlebih dahulu.',
}

export function authErrorMessage(error) {
  if (!error) return null
  if (MESSAGES[error.code]) return MESSAGES[error.code]
  return 'Terjadi masalah saat memproses. Coba lagi sebentar.'
}
