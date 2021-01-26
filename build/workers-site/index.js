import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

import manifest from '../../dist/manifest.json'

const getType = (ext) => {
  if (ext === 'js') {
    return 'script'
  } else if (['svg', 'jpg', 'png'].includes(ext)) {
    return 'image'
  }

  throw new Error(`Unkown Extension \`${ext}\``)
}

const unique = (arr) => {
  return [...new Set(arr)]
}

const assets = unique(Object.keys(manifest).map((key) => {
  const {
    file,
    imports = []
  } = manifest[key]

  return [file, ...imports]
}).flat()).map((path) => {
  const [name, hash, ext] = path.split(/\./)

  const type = getType(ext)
  const crossorigin = type === 'script' ? ' crossorigin=anonymous;' : ''

  return {
    key: `${name}.${ext}`,
    hash,
    push: `</${path}>; rel=preload; as=${type};` + crossorigin
  }
})

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

function getCookie (request, name) {
  let result = ''
  const cookieString = request.headers.get('Cookie')
  if (cookieString) {
    const cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      const cookiePair = cookie.split('=', 2)
      const cookieName = cookiePair[0].trim()
      if (cookieName === name) {
        const cookieVal = cookiePair[1]
        result = cookieVal
      }
    })
  }
  return result
}

async function handleEvent(event) {
  try {
    const options = {}

    if (/\.(js)|(css)|(jpg)|(png)|(svg)|(mp3)|(wav)$/.test(event.request.url)) {
      options.cacheControl = {
        browserTTL: 31536000
      }
    }

    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }

    const response = await getAssetFromKV(event, options)

    if (response.headers.get('Content-Type').includes('text/html')) {
      const cookie = getCookie(event.request, '__http2_server_push')
      const pushed = cookie === '' ? {} : JSON.parse(cookie)
      const pushing = {}

      for (const { key, hash, push } of assets) {
        pushing[key] = hash

        if (pushed[key] !== pushing[key]) {
          response.headers.append('Link', push)
        }
      }

      response.headers.set('Set-Cookie', `__http2_server_push=${JSON.stringify(pushing)}`)
    }

    return response
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {
        //
      }
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix (prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}