import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSeoPlugin } from './seo/build-seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), buildSeoPlugin()],
})