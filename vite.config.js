import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En desarrollo, /api se reenvía a la API (mismo backend que en Dokploy: osdemsventas.site)
      '/api': {
        target: 'https://osdemsventas.site',
        changeOrigin: true,
      },
    },
  },
})
