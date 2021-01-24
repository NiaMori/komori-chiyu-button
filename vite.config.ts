import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { generateMetaInfo } from './build/vite-plugin-generate-meta-info'
import { analytics } from './build/vite-plugin-analytics'

export default defineConfig({
  plugins: [
    reactRefresh(),
    generateMetaInfo(),
    analytics()
  ]
})
