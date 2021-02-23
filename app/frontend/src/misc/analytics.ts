import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { Voice } from '../data'
import { useDatabase } from '../hooks'
import { useEmit } from '../hooks/use-remote-event-emitter'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const gtag = (...args: any[]): void => {
  if ('gtag' in window) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (window as any).gtag(...args)
  }
}

export const getClientID = async () : Promise<string> => {
  const key = '@komori-chiyu-button/client-id'

  if ('localStorage' in window) {
    const id = localStorage.getItem(key)

    if (id) {
      return id
    }
  }

  const id = await Promise.race<string>([
    new Promise<string>(resolve => {
      gtag('get', 'G-VLGY6V94TB', 'client_id', (id: string | undefined) => {
        if (id) {
          resolve(id)
        }
      })
    }),

    new Promise<string>(resolve => {
      setTimeout(() => resolve(uuid()), 2000)
    })
  ])

  if ('localStorage' in window) {
    localStorage.setItem(key, id)
  }

  return id
}

export const useReportVoicePlayback = (): { report: (voice: Voice) => void } => {
  const { emit } = useEmit()

  const { databaseSnapshot, updateDatabase } = useDatabase()

  const report = useCallback(async (voice: Voice) => {
    updateDatabase(({ '@voice-playback-statistics': statistics }) => {
      const prevCount = databaseSnapshot['@voice-playback-statistics'][voice.path] ?? 0
      statistics[voice.path] = Math.max(statistics[voice.path] ?? 0, prevCount + 1)
    })

    emit('@voice-playback-statistics/report-playback', {
      path: voice.path,
      clientID: await getClientID(),
      timestampInMilliseconds: Date.now()
    })

    if (import.meta.env.MODE === 'production') {
      gtag('event', 'voice_playback', {
        path: voice.path
      })
    }
  }, [databaseSnapshot, updateDatabase, emit])

  return {
    report
  }
}
