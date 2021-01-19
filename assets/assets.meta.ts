const modules = import.meta.globEager('./**/*.{wav,mp3,svg,jpg,png,webp}')

import assetsProvider from './assets-provider.json'

export const assets: {
  [path: string] : {
    src: string
  }
} = Object.assign({}, ...Object.keys(modules).map((path) => {
  return {
    [path.replace(/^\.\//, '@')]: {
      src: modules[path].default as string
    }
  }
}))

export const url = (path: string) : string => {
  if (import.meta.env.MODE === 'production') {
    const index = path as keyof typeof assetsProvider
    if (assetsProvider[index]) {
      const { provider } = assetsProvider[index]

      if (provider.length) {
        return provider[0]
      }
    }
  }

  return assets[path].src
}
