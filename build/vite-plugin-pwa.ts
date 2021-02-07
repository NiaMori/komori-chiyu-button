import { Plugin, ResolvedConfig } from 'vite'
import { injectManifest, InjectManifestConfig } from 'workbox-build'

import assetsProvider from '../assets/assets-provider.json'

const manifest = {
  name: '古守按钮',
  short_name: '古守按钮',
  start_url: '/',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#FFFFFF',
  theme_color: '#444041',
  icons: [ {
    'src': '/icons/icon-72x72.png',
    'sizes': '72x72',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-96x96.png',
    'sizes': '96x96',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-128x128.png',
    'sizes': '128x128',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-144x144.png',
    'sizes': '144x144',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-152x152.png',
    'sizes': '152x152',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-192x192.png',
    'sizes': '192x192',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-384x384.png',
    'sizes': '384x384',
    'type': 'image/png'
  }, {
    'src': '/icons/icon-512x512.png',
    'sizes': '512x512',
    'type': 'image/png'
  }, {
    'src': '/icons/maskable-icon-300x300.png',
    'sizes': '300x300',
    'type': 'image/png',
    'purpose': 'maskable'
  }]
}

const generateInjectManifestOptions = (viteConfig: ResolvedConfig) : InjectManifestConfig => {
  return {
    swSrc: 'src/pwa/service-worker.js',
    swDest: 'dist/service-worker.js',
    globDirectory: 'dist',
    injectionPoint: 'self.__WB_MANIFEST',
    manifestTransforms: [async (manifestEntries) => {
      const manifest = manifestEntries.map(entry => {
        const assetsRoot = viteConfig.base

        if (entry.url.startsWith('assets/')) {
          entry.url = assetsRoot + entry.url
          entry.revision = null
        }

        return entry
      })

      return {
        manifest,
        warnings: []
      }
    }],
    additionalManifestEntries: Object.entries(assetsProvider)
      .filter(([path]) => path.includes('@images'))
      .map(([, { provider }]) => ({ url: provider[0], revision: null }))
  }
}

export const pwa = () : Plugin => {
  const config: {
    current: ResolvedConfig | null
  } = {
    current: null
  }

  return {
    name: 'vite-plugin-pwa',

    configResolved (resolvedViteConfig) {
      config.current = resolvedViteConfig
    },

    generateBundle (self, bundle) {
      bundle['manifest.webmanifest'] = {
        isAsset: true,
        type: 'asset',
        name: undefined,
        source: `${JSON.stringify(manifest, null, 2)}\n`,
        fileName: 'manifest.webmanifest',
      }
    },

    async writeBundle () {
      if (!config.current) {
        throw new Error('vite config not resolved')
      }

      await injectManifest(generateInjectManifestOptions(config.current))
    },

    transformIndexHtml: {
      enforce: 'post',
      transform (html, { server }) {
        if (server) {
          return html
        }

        return html.replace(
          '</head>',
          ' ' +
` <link rel = 'manifest' href = '/manifest.webmanifest'>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
      })
    }
  </script>
</head>`,
        )
      }
    }
  }
}
