import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  // this is the proxy configuration that allows the client to make requests to the server
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/concerts': {
        target: 'http://localhost:3000'
      }
    }
  }
})