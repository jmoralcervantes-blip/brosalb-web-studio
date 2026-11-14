// Construcción estática para GitHub Pages: una SPA sin servidor que reutiliza los componentes de src/.
// Uso: bunx vite build --config vite.static.config.ts  →  genera dist-static/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('./static-site', import.meta.url)),
  base: '/',
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist-static', import.meta.url)),
    emptyOutDir: true,
  },
});
