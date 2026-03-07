import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Packaged Electron loads index.html via file://, so assets must be relative.
  base: './',
  plugins: [react()],
  build: {
    outDir: 'renderer-dist'
  }
})
