import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    css: {
        devSourcemap: true
    },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'sass.html'),
        animation: resolve(__dirname, 'animering.html'),
        diagram: resolve(__dirname, 'Diagram.html'),
        karta: resolve(__dirname, 'Karta.html')
      }
    }
  }
})