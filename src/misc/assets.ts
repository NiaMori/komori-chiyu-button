import assetsProvider from '../../assets/assets-provider.json'

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

  return path.replace(/@/, '/assets/')
}
