import assetsMeta from '../../assets/assets.meta.json'

export const url = (path: string) : string => {
  if (import.meta.env.MODE === 'production') {
    const index = path as keyof typeof assetsMeta
    if (assetsMeta[index]) {
      const { provider } = assetsMeta[index]

      if (provider.length) {
        return provider[0]
      }
    }
  }

  return path.replace(/@/, '/assets/')
}
