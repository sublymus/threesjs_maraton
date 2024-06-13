import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'../sublymus_server/public',
    emptyOutDir:false,

  }
})
