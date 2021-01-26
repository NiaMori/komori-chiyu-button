import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { analytics } from './build/vite-plugin-analytics'
import { splitChunks } from './build/vite-plugin-split-chunks'

export default defineConfig({
  plugins: [
    reactRefresh(),
    analytics(),
    splitChunks()
  ],

  build: {
    manifest: true
  }
})
