import { url } from '../../assets/assets.meta'

import { useEffectOnce } from 'react-use'
import { useSnackbar } from 'notistack'
import { useVoices } from '../hooks'

import { isNewVoice } from '../data'

export const vocieCacheName = 'voices-v0.0.1'

export const updateVoiceCache = async (voiceURLs: string[]) : Promise<boolean> => {
  if (!('caches' in window)) {
    return false
  }

  const cache = await caches.open(vocieCacheName)

  const voiceURLSet = new Set(voiceURLs)
  const cachedURLSet = new Set((await cache.keys()).map(({ url }) => url))
  const toUpdate = voiceURLs.filter(url => !cachedURLSet.has(url))

  for (const request of await cache.keys()) {
    if (!voiceURLSet.has(request.url)) {
      await cache.delete(request)
    }
  }

  for (const url of toUpdate) {
    await cache.add(url)
  }

  return toUpdate.length !== 0
}

export const useUpdateVoiceCache = (): void => {
  const { enqueueSnackbar } = useSnackbar()

  const { voices } = useVoices({
    gachiValue: 100,
    showSexyKomori: true,
    showAllVoices: true
  })

  useEffectOnce(() => {
    const urls = voices.map(([, voiceList]) => voiceList).flat()
      .map((voice, index) => ({
        isNew: isNewVoice(voice),
        index,
        url: new URL(url(voice.path)).href,
      }))
      .sort((a, b) => Number(a.isNew) - Number(b.isNew) || a.index - b.index)
      .map(({ url }) => url)

    updateVoiceCache(urls).then(updated => {
      const key = '@komori-chiyu-button/offline-support-prompt-status'
      const offlineSupportUnprompted = window.localStorage.getItem(key) !== 'prompted'

      if (updated && 'serviceWorker' in navigator && offlineSupportUnprompted) {
        window.localStorage.setItem(key, 'prompted')

        enqueueSnackbar('离线访问支持已启用 \n 现在可以随时随地补充古守能量啦 ~', {
          variant: 'success',
          style: { whiteSpace: 'pre-line' },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          }
        })
      }
    })
  })
}
