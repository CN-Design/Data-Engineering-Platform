import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('@monaco-editor')) return 'monaco-vendor';
            if (id.includes('react-markdown') || id.includes('remark-gfm')) return 'markdown-vendor';
            if (id.includes('sql.js')) return 'sql-vendor';
            if (id.includes('lucide-react')) return 'ui-vendor';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000,
  }
})
