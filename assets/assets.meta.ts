import assetsProvider from './assets-provider.json'

import KomoriHat from './images/komori-hat.svg'

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

  if (path === '@images/komori-hat.svg') {
    return KomoriHat
  }

  return path.replace(/@/, '/assets/')
}
