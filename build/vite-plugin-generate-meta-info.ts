import { Plugin } from 'vite'

import fs from 'fs'
import path from 'path'

export const generateMetaInfo = (): Plugin => {
  return {
    name: 'vite-plugin-generate-meta-info',
    writeBundle (this, options, bundle) {
      const pushing = []

      for (const fileName of Object.keys(bundle)) {
        if (/\.js$/.test(fileName)) {
          pushing.push(`</${fileName}>; rel=preload; as=script; crossorigin=anonymous`)
        }

        if (/komori-hat\.\S+\.svg$/.test(fileName)) {
          pushing.push(`</${fileName}>; rel=preload; as=image;`)
        }
      }

      fs.writeFileSync(path.join(options.dir, 'meta.json'), JSON.stringify({
        pushing
      }, null, 2))
    }
  }
}
