// Empat layanan + harga.
// `estimate` dan `from` masih contoh: ganti dengan harga dan jadwal Anda sendiri.

export const SERVICES = [
  {
    id: 'company-profile',
    n: '01',
    icon: 'layers',
    file: 'company-profile/app.config.js',
    name: 'Website Company Profile',
    forWho: 'UMKM, klinik, kontraktor, sekolah',
    estimate: '7-10 hari kerja',
    from: 'Rp 3.500.000',
    includes: [
      'Satu halaman utama + 4 halaman',
      'Formulir kontak ke WhatsApp',
      'Domain dan SSL',
      'SEO dasar: judul, deskripsi, sitemap',
      'Dokumen cara mengedit isi halaman',
    ],
    note: 'Cocok kalau tujuan utama Anda adalah membuat orang menghubungi lewat WhatsApp.',
  },
  {
    id: 'store',
    n: '02',
    icon: 'cart',
    file: 'store/schema.prisma',
    name: 'Website Toko Online',
    forWho: 'Retail dan distributor',
    estimate: '3-5 minggu',
    from: 'Rp 7.500.000',
    includes: [
      'Katalog produk dengan filter kategori',
      'Keranjang dan checkout',
      'QRIS dan virtual account',
      'Perhitungan ongkir',
      'Halaman untuk kelola produk',
    ],
    note: 'Stok bisa disambung ke aplikasi kasir atau gudang yang sudah Anda pakai.',
  },
  {
    id: 'web-app',
    n: '03',
    icon: 'dashboard',
    file: 'web-app/router.ts',
    name: 'Web Application',
    forWho: 'Klinik, sekolah, apotek, pabrik',
    estimate: '6-10 minggu',
    from: 'Rp 18.000.000',
    includes: [
      'Login dengan hak akses berbeda',
      'Dashboard laporan dan ekspor data',
      'Riwayat perubahan data',
      'Integrasi API pihak ketiga',
      'Dokumentasi dan pelatihan',
    ],
    note: 'Untuk alur kerja internal yang butuh dashboard, bukan sekadar halaman statis.',
  },
  {
    id: 'custom-system',
    n: '04',
    icon: 'terminal',
    file: 'custom-system/core.service.ts',
    name: 'Custom System',
    forWho: 'Distributor, manufaktur, multi-cabang',
    estimate: '8-12 minggu',
    from: 'Rp 25.000.000',
    includes: [
      'Daftar fitur ditulis dulu, baru ditawar',
      'Integrasi dengan sistem lama Anda',
      'Migrasi data dari Excel atau SQL lama',
      'SLA dan monitoring berkala',
      'Perawatan bulanan opsional',
    ],
    note: 'Untuk sistem yang tidak bisa ditangani paket standar. Maintenance tersedia terpisah.',
  },
]

export const PRICE_NOTE = 'Harga contoh, belum termasuk biaya domain dan hosting.'
