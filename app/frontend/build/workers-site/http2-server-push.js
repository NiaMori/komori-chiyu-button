import manifest from '../../dist/manifest.json'

const getType = (ext) => {
  if (ext === 'js') {
    return 'script'
  } else if (['svg', 'jpg', 'png'].includes(ext)) {
    return 'image'
  }

  throw new Error(`Unkown Extension \`${ext}\``)
}

const assets = Object.values(manifest).map(({ file }) => {
  const [name, hash, ext] = file.split(/\./)

  const type = getType(ext)
  const crossorigin = type === 'script' ? ' crossorigin=anonymous;' : ''

  return {
    key: `${name}.${ext}`,
    hash,
    push: `</${file}>; rel=preload; as=${type};` + crossorigin
  }
})

const getCookie = (request, name) => {
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

const setCookie = (response, name, value) => {
  response.headers.set('Set-Cookie', `${name}=${value}`)
}

export const setUpHttp2ServerPush = (request, response) => {
  if (response.headers.get('Content-Type').includes('text/html')) {
    const cookie = getCookie(request, '__http2_server_push')

    const pushed = cookie === '' ? {} : JSON.parse(cookie)
    const pushing = {}

    for (const { key, hash, push } of assets) {
      pushing[key] = hash

      if (pushed[key] !== pushing[key]) {
        response.headers.append('Link', push)
      }
    }

    setCookie(response, '__http2_server_push', JSON.stringify(pushing))
  }
}
