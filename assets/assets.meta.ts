const modules = import.meta.globEager('./**/*.{wav,mp3,svg,jpg,png,webp}')

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
  return assets[path].src
}
