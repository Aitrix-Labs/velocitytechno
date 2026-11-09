import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/velocitytechno/',
  plugins: [react()],
  server: { port: 5180, strictPort: true },
})
