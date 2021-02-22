import { Plugin } from 'vite'

export const splitChunks = (): Plugin => {
  return {
    name: 'vite-plugin-split-chunks',
    config: () => ({
      build: {
        rollupOptions: {
          output: {
            manualChunks (id) {
              if (false
                || id.includes('vite/dynamic-import-polyfill')
                || id.includes('commonjsHelpers.js')
                || id.includes('/node_modules/@babel/runtime/')

                || id.includes('/node_modules/react/')
                || id.includes('/node_modules/react-dom/')
                || id.includes('/node_modules/react-router/')
                || id.includes('/node_modules/react-router-dom/')

                || id.includes('/node_modules/@emotion/')
                || id.includes('/node_modules/stylis/')

                || id.includes('/node_modules/object-assign/')
                || id.includes('/node_modules/tiny-warning/')
                || id.includes('/node_modules/tiny-invariant/')
                || id.includes('/node_modules/react-is/')
                || id.includes('/node_modules/hoist-non-react-statics/')
                || id.includes('/node_modules/prop-types/')

                || id.includes('/node_modules/scheduler/')
                || id.includes('/node_modules/history/')
                || id.includes('/node_modules/value-equal/')
                || id.includes('/node_modules/resolve-pathname/')
                || id.includes('/node_modules/mini-create-react-context/')
                || id.includes('/node_modules/path-to-regexp/')
                || id.includes('/node_modules/isarray/')

                || id.includes('/node_modules/popper.js/')
                || id.includes('/node_modules/clsx/')
                || id.includes('/node_modules/css-vendor/')
                || id.includes('/node_modules/is-in-browser/')
                || id.includes('/node_modules/jss')
                || id.includes('/node_modules/hyphenate-style-name/')
                || id.includes('/node_modules/react-transition-group/')

                || id.includes('/node_modules/socket.io')
                || id.includes('/node_modules/debug')
                || id.includes('/node_modules/base64-arraybuffer')
                || id.includes('/node_modules/component-emitter')
                || id.includes('/node_modules/parseuri')
                || id.includes('/node_modules/engine.io')
                || id.includes('/node_modules/backo2/')
                || id.includes('/node_modules/has-cors/')
                || id.includes('/node_modules/ms/')
                || id.includes('/node_modules/parseqs/')
                || id.includes('/node_modules/ws/')
                || id.includes('/node_modules/xmlhttprequest-ssl/')
                || id.includes('/node_modules/yeast/')
              ) {
                return 'stable'
              }

              if (
                false
                || id.includes('/node_modules/@material-ui/')
                || id.includes('/node_modules/mdi-material-ui/')
                || id.includes('/node_modules/notistack/')
              ) {
                return 'ui'
              }

              if (id.includes('/node_modules/')) {
                return 'vender'
              }
            }
          }
        }
      }
    })
  }
}
