import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { analytics } from './build/vite-plugin-analytics'
import { splitChunks } from './build/vite-plugin-split-chunks'

import { pwa } from './build/vite-plugin-pwa'

export default defineConfig({
  plugins: [
    reactRefresh(),
    analytics(),
    splitChunks(),
    pwa()
  ],

  alias: {
    '@frontend': 'frontend'
  },

  build: {
    manifest: true,
    rollupOptions: {
      plugins: [{
        name: 'rollup-plugin-remove-react-table-development',
        load: (id: string) => {
          if (id.includes('/node_modules/react-table/dist/react-table.development.js')) {
            return {
              code: ''
            }
          }

          return null
        }
      }]
    }
  }
})
