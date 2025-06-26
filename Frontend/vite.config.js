import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/insert': 'http://localhost:5000',
      '/delete': 'http://localhost:5000',
      '/fetch': 'http://localhost:5000',
      '/commit': 'http://localhost:5000',
      '/rollback': 'http://localhost:5000',
    }
  }
})
