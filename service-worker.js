importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/'
})

const { core, routing, strategies, expiration, precaching, backgroundSync } = workbox
const { NavigationRoute } = routing
const { CacheFirst, NetworkFirst, NetworkOnly } = strategies
const { ExpirationPlugin } = expiration

const manifest = [{"revision":null,"url":"https://cdn.jsdelivr.net/gh/NiaMori/komori-chiyu-button@gh-pages/assets/index.186cffb3.js"},{"revision":null,"url":"https://cdn.jsdelivr.net/gh/NiaMori/komori-chiyu-button@gh-pages/assets/stable.0309f9e6.js"},{"revision":null,"url":"https://cdn.jsdelivr.net/gh/NiaMori/komori-chiyu-button@gh-pages/assets/ui.3a8b9d6c.js"},{"revision":null,"url":"https://cdn.jsdelivr.net/gh/NiaMori/komori-chiyu-button@gh-pages/assets/vender.29f5c42f.js"},{"revision":"dbdeb26615e8e308400f6f12f03051db","url":"index.html"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.11/dist/komori-avatar.webp"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.1/dist/komori-hat.webp"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.17/dist/komori-bilibili.webp"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.17/dist/komori-fan-club.webp"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.17/dist/komori-hat.svg"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.22/dist/中.svg"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.22/dist/日.svg"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.24/dist/NGA.svg"},{"revision":null,"url":"https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.26/dist/hisekierio.webp"}]

const cacheSuffixVersion = '-v0.0.1'

core.setCacheNameDetails({
  prefix: 'komori-chiyu-button',
  suffix: cacheSuffixVersion
})

self.addEventListener('activate', (event) => {
  const cleanUpCache = async () => {
    const cacheNames = await caches.keys()

    await Promise.all(cacheNames.map(name => {
      if (!name.includes(cacheSuffixVersion)) {
        return caches.delete(name)
      }
    }))
  }

  event.waitUntil(cleanUpCache())
})

precaching.precacheAndRoute(manifest, {
  directoryIndex: null
})

routing.registerRoute(new NavigationRoute(async ({ url }) => {
  const preCache = await caches.open(core.cacheNames.precache)
  const cacheKey = precaching.getCacheKeyForURL('/index.html')

  let networkResponse = null
  let networkError = null

  try {
    networkResponse = await fetch(url)
    if (networkResponse.ok) {
      return networkResponse
    }
  } catch (error) {
    networkError = error
  }

  const cacheMatch = await preCache.match(cacheKey)

  if (cacheMatch) {
    return cacheMatch
  } else if (networkResponse) {
    return networkResponse
  } else {
    throw networkError
  }
}))

routing.registerRoute(
  /.*cdn[.]jsdelivr[.]net\/npm\/komori-chiyu-button-assets.*[.]mp3/,

  new CacheFirst({
    cacheName: 'voices' + cacheSuffixVersion,

    fetchOptions: {
      mode: 'cors',
      credentials: 'omit'
    },

    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 356 * 24 * 60 * 60,
        purgeOnQuotaError: true
      })
    ]
  })
)

routing.registerRoute(
  /.*cdn[.]jsdelivr[.]net/,

  new CacheFirst({
    cacheName: 'cdn-jsdelivr' + cacheSuffixVersion,

    fetchOptions: {
      mode: 'cors',
      credentials: 'omit'
    }
  })
)

routing.registerRoute(
  /.*www[.]googletagmanager[.]com/,

  new NetworkOnly()
)

routing.registerRoute(
  /.*www[.]google-analytics[.]com/,

  new NetworkOnly({
    plugins: [
      new backgroundSync.BackgroundSyncPlugin('google-analytics', {
        maxRetentionTime: 24 * 60
      })
    ]
  }),

  'POST'
)

routing.registerRoute(
  /\/service-worker[.]js/,

  new NetworkOnly()
)

routing.setDefaultHandler(
  new NetworkFirst({
    networkTimeoutSeconds: 5
  })
)

core.skipWaiting()
core.clientsClaim()
precaching.cleanupOutdatedCaches()
