import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel deployment: app is served from the root, so base should be '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
