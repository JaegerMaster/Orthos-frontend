import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',  // This makes the server listen on all network interfaces
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
