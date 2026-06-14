import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react') || id.includes('react-router-dom')) return 'react'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@monaco-editor')) return 'editor'
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('pdfjs-dist')) return 'pdf'
          return 'vendor'
        }
      }
    }
  }
})
