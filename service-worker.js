importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/'
})

const { core, routing } = workbox
const { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } = strategies
const { ExpirationPlugin } = expiration

const cacheSuffixVersion = '-v0.0.1'

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (!key.includes(cacheSuffixVersion)) {
          return caches.delete(key)
        }
      }))
    })
  )
})

core.setCacheNameDetails({
  prefix: 'komori-chiyu-button',
  suffix: cacheSuffixVersion
})

core.skipWaiting()
core.clientsClaim()

routing.registerRoute(
  /.*cdn\.jsdelivr\.net/,
  new CacheFirst({
    cacheName: 'static-immutable' + cacheSuffixVersion,
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit'
    },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
      })
    ]
  })
)

routing.setDefaultHandler(
  new NetworkFirst({
    networkTimeoutSeconds: 3
  })
)
