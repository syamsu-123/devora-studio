import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 lewat plugin Vite: tanpa postcss.config dan tanpa tailwind.config.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
