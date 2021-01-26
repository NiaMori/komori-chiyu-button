import { Plugin } from 'vite'

export const splitChunks = (): Plugin => {
  return {
    name: 'vite-plugin-split-chunks',
    config: () => ({
      build: {
        rollupOptions: {
          output: {
            manualChunks (id) {
              if (id.includes('node_modules')) {
                return 'vender'
              }
            }
          }
        }
      }
    })
  }
}
