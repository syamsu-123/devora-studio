# Website portofolio studio pembuatan website

Satu halaman (landing page) untuk studio jasa pembuatan website. Kesan visualnya seperti ruang
kerja programmer sungguhan: sidebar **explorer** dengan file tree, **programming nebula** 3D
yang berputar di hero, panel kaca, grid nebula, terminal, dan bilah status ala editor. Kontennya
tetap bahasa Indonesia untuk klien non-teknis.

Stack: React 19 + Vite 8 + Tailwind CSS v4 (plugin resmi `@tailwindcss/vite`, tanpa
`postcss.config` dan tanpa `tailwind.config.js`). Tanpa library UI, tanpa Three.js, ikon berupa
SVG inline. Total bundle ±90 kB gzip.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil build ke dist/
npm run preview  # cek hasil build
```

## Setup dari nol (kalau ingin mulai dari proyek kosong)

```bash
npm create vite@latest nama-studio -- --template react
cd nama-studio
npm install
npm install tailwindcss @tailwindcss/vite
```

Lalu salin/replace isi file proyek ini: `vite.config.js`, `index.html`, `public/favicon.svg`, dan
seluruh isi `src/`.

## Struktur folder

```
nama-studio/
├─ index.html                     meta, Google Fonts, skrip tema sebelum render
├─ vite.config.js                 plugin React + Tailwind v4
├─ package.json
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.jsx                    titik masuk
   ├─ App.jsx                     susunan section + hook global
   ├─ index.css                   token desain (@theme), nebula 3D, glass, keyframes
   ├─ data/
   │  ├─ config.js                nama studio, WhatsApp, email, nav, tree, baris terminal
   │  ├─ projects.js              6 proyek + daftar filter
   │  ├─ services.js              4 layanan, estimasi, harga mulai
   │  └─ steps.js                 4 tahap sebagai riwayat commit
   ├─ hooks/
   │  ├─ useTheme.js              tema gelap/terang/sistem + localStorage (default gelap)
   │  ├─ useTypewriter.js         efek mengetik di hero (rama dengan reduced motion)
   │  └─ useActiveSection.js      tab aktif saat menggulir
   ├─ lib/
   │  ├─ cn.js                    gabungan kelas
   │  ├─ syntax.js                warna token + tokenizer JSON per baris
   │  └─ wa.js                    pembuat tautan wa.me
   └─ components/
      ├─ Backdrop.jsx             starfield, aurora, grid, scanlines, cursor glow
      ├─ Nebula.jsx               programming nebula 3D murni CSS
      ├─ Header.jsx               navbar kaca + brand + tema + tombol hubungi
      ├─ Explorer.jsx             sidebar explorer (drawer di layar kecil)
      ├─ Hero.jsx                 judul manfaat, tombol, lencana, terminal, nebula
      ├─ Terminal.jsx             jendela terminal isi kode
      ├─ SiteMock.jsx             tampilan website klien fiktif (React, bukan gambar)
      ├─ Services.jsx             empat kartu layanan
      ├─ Works.jsx                daftar karya + filter
      ├─ CaseDialog.jsx           studi kasus dalam <dialog>
      ├─ Process.jsx              git log + penjelasan tahap
      ├─ Quote.jsx                satu kutipan klien
      ├─ About.jsx                profil singkat studio ("tentang")
      ├─ Contact.jsx              form yang menyusun pesan WhatsApp
      ├─ StatusBar.jsx            bilah bawah: branch, balas, slot proyek, jam
      ├─ Footer.jsx
      ├─ icons.jsx                SVG inline
      └─ ui/
         ├─ Button.jsx
         ├─ Chip.jsx
         ├─ EditorWindow.jsx      jendela editor (judul file + titik)
         └─ CodeBlock.jsx         kode dengan nomor baris
```

## Programming nebula

Efek 3D dibuat tanpa Three.js, hanya dengan CSS, supaya tetap ringan:

- `.nebula` memberi `perspective` + `container-type: inline-size`.
- Setiap orbit = satu bidang datar (`.neb-plane`) yang dimiringkan dengan `rotateX(...)`, lalu
  diputar (`neb-spin`). Elips yang terbentuk + `perspective` itulah yang menghasilkan depth dan
  parallax pada token kodenya.
- Token kodenya adalah elemen biasa di dalam `.neb-orb`; posisi, warna, dan countersink-nya
  diatur lewat custom property (`--a`, `--r`, `--back`) dari `Nebula.jsx`.
- `.neb-core` adalah inti hologram (`< />`) dengan wireframe berputar, diberi
  `transform: translate(-50%, -50%) translateZ(-56px)` supaya benar-benar berada di belakang
  orbit. **Pakai `transform`, bukan properti `translate`:** minifier CSS membuang `translate`
  pada elemen `preserve-3d`, dan intinya akan bergeser keluar posisi.
- `--ns` (diameter orbit) memakai `cqw`, jadi nebula ikut mengikuti lebar kontainer dan aman
  di sidebar sempit maupun di layar lebar.

## File yang perlu diganti dengan data asli

1. `src/data/config.js` — nama studio, `slug`, domain, `waBase`/`waNumber`, `email`, intro, baris
   terminal, lencana, dan slot proyek. Ini file paling penting.
2. `src/data/projects.js` — ganti 6 proyek. Hapus `contoh: true` kalau proyeknya asli; badge
   "contoh" ikut hilang. Field penting: `id`, `type` (`profile` | `shop` | `system`), `preview`
   (`klinik` | `profil` | `toko` | `distributor` | `sistem`), `challenge`, `solution`, `results`.
3. `src/data/services.js` — nama, `estimate`, `from`, `includes`, dan catatan tiap layanan.
4. `src/data/steps.js` — judul, deskripsi, dan output tiap tahap.
5. `index.html` — `<title>` dan `<meta name="description">`.
6. `src/components/Quote.jsx` — kutipan masih contoh di dalam file komponen ini.
7. `src/components/Nebula.jsx` — daftar `RINGS` (token per orbit), `MOTES`, dan `CHIPS`
   (lencana teknologi).

Teks marketing yang sengaja tidak dipakai: tidak ada klaim seperti "solusi terbaik" atau
"inovatif". Semua angka contoh ditandai jelas (badge "contoh", catatan di bawah blok, dan
disclaimer pada footer).

## Catatan teknis

- **Tema gelap adalah default.** `useTheme` memakai urutan `dark → light → system`, dan
  `index.html` memasang `data-theme="dark"` sebelum React hydrate supaya tidak ada kilat putih.
- Dark mode memakai atribut `data-theme` pada `<html>`. Nilai token untuk terang/gelap ditulis
  sekali di `src/index.css`, jadi `bg-surface`, `text-muted`, `border-line` berubah sendiri tanpa
  menulis `dark:` di tiap elemen.
- `body` memakai `overflow-x: clip` supaya tidak ada gulir horizontal, dan semua orbit dibuat dari
  nilai persen sehingga tidak keluar dari kotaknya.
- Animasi hanya mengubah `transform`/`opacity`, jadi tetap jalan di compositor: makro CSS
  `will-change` dipakai seperlunya, bukan di semua elemen. Kalau perangkat meminta
  `prefers-reduced-motion`, seluruh animasi tak terbatas dimatikan tapi nebula tetap tampil utuh.
- `.glass` sengaja **tanpa** `backdrop-filter`: ada puluhan kartu di halaman dan tiap
  `backdrop-filter` memaksa browser membaca ulang latar tiap frame. Efek kaca datang dari gradien
  semi transparan + garis rambut. Blur hanya dipakai di navbar, drawer, dialog, dan lencana
  nebula.
- Studi kasus memakai `<dialog>` dengan `showModal()`: tutup lewat Escape, klik latar, atau tombol
  Tutup, dan fokus kembali ke tombol pemicu.
- Drawer di layar kecil juga memakai `body.style.overflow` dan listener Escape, dan tetap
  bisa difokus lewat keyboard.
