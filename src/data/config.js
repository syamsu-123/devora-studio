// Ganti semua isi file ini dengan data studio Anda.
// PENTING: nama, nomor WhatsApp, email, dan domain di bawah masih contoh.

export const config = {
  name: 'NAMA STUDIO',
  slug: 'nama-studio',
  domain: 'namastudio.example',
  city: 'Bandung',
  timezone: 'Asia/Jakarta',

  waBase: 'https://wa.me/6281234567890',
  waNumber: '6281234567890',
  email: 'halo@namastudio.example',

  intro:
    'Kami membangun website modern, cepat, dan berkualitas untuk UMKM, klinik, ' +
    'kontraktor, sekolah, dan distributor. Dari konsep hingga deployment, semua kami urus.',

  // Dipakai Hero dan tombol utama di beberapa section.
  waIntro:
    'Halo, saya lihat website NAMA STUDIO. Saya butuh website untuk bisnis saya. ' +
    'Boleh minta info paket dan estimasi harga?',

  // Badge teknologi di bawah hero.
  badges: [
    { label: 'Desain Modern', glyph: '< />' },
    { label: 'Responsive', glyph: '▤' },
    { label: 'SEO Friendly', glyph: '⌕' },
    { label: 'Firebase', glyph: '▲' },
    { label: 'React', glyph: '⚛' },
    { label: 'Maintenance', glyph: '⟳' },
  ],

  // Baris yang diketik di terminal hero.
  terminal: [
    { kind: 'cmd', prompt: true, text: 'npm run dev' },
    { kind: 'ok', text: '  server running   · localhost:5173' },
    { kind: 'ok', text: '  build successful · vite 8 · 128 modules' },
    { kind: 'ok', text: '  database connected · firebase' },
    { kind: 'cmd', prompt: true, text: 'npx nama-studio deploy --prod' },
    { kind: 'acc', text: '  ssl aktif · lighthouse 94/100 ↓' },
  ],

  facts: [
    'Harga dikunci sebelum mulai',
    'Bisa diedit sendiri setelah serah terima',
    'Batas revisi 2× per tahap',
  ],

  stack: [
    { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
    { group: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST API'] },
    { group: 'Platform', items: ['Firebase', 'Cloudflare Pages', 'Vercel'] },
    { group: 'Kualitas', items: ['Lighthouse 90+', 'Core Web Vitals', 'SEO dasar'] },
  ],

  // Dipakai Header (menu) dan sidebar Explorer.
  nav: [
    { id: 'beranda', file: 'index.jsx', label: 'Beranda', icon: 'react' },
    { id: 'karya', file: 'karya.tsx', label: 'Karya', icon: 'component' },
    { id: 'layanan', file: 'layanan.tsx', label: 'Layanan', icon: 'package' },
    { id: 'proses', file: 'proses.log', label: 'Proses', icon: 'terminal' },
    { id: 'testimoni', file: 'testimoni.json', label: 'Testimoni', icon: 'json' },
    { id: 'tentang', file: 'tentang.md', label: 'Tentang', icon: 'doc' },
    { id: 'kontak', file: 'kontak.sh', label: 'Kontak', icon: 'terminal' },
  ],

  // Pohon folder untuk sidebar Explorer.
  tree: [
    {
      name: 'src',
      type: 'folder',
      open: true,
      children: [
        {
          name: 'components',
          type: 'folder',
          open: true,
          children: [
            { name: 'Nebula.tsx', type: 'component' },
            { name: 'Hero.tsx', type: 'component' },
            { name: 'Works.tsx', type: 'component' },
            { name: 'Contact.tsx', type: 'component' },
          ],
        },
        { name: 'pages', type: 'folder', children: [] },
        { name: 'services', type: 'folder', children: [] },
        { name: 'styles', type: 'folder', children: [] },
      ],
    },
    { name: 'public', type: 'folder', children: [] },
    { name: 'package.json', type: 'json' },
    { name: 'vite.config.js', type: 'config' },
    { name: 'README.md', type: 'doc' },
  ],

  tips: [
    'Klik file di sidebar untuk pindah bagian.',
    'Tekan Esc untuk menutup studi kasus.',
    'Tema gelap adalah default; ☼ / ☾ hanya opsional.',
  ],

  // Nilai untuk bilah status ala editor.
  status: {
    branch: 'main',
    responseTime: 'balas ≤ 1×24 jam',
    slotsUsed: 2,
    slotsTotal: 4,
    locale: 'id-ID',
  },
}
