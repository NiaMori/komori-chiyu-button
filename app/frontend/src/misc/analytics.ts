import { useCallback } from 'react'
import { Voice } from '../data'
import { useDatabase } from '../hooks'
import { useEmit } from '../hooks/use-remote-event-emitter'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const gtag = (...args: any[]): void => {
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (window as any).gtag(...args)
}

export const useReportVoicePlayback = (): { report: (voice: Voice) => void } => {
  const { emit } = useEmit()

  const { databaseSnapshot, updateDatabase } = useDatabase()

  const report = useCallback((voice: Voice) => {
    updateDatabase(({ '@voice-playback-statistics': statistics }) => {
      const prevCount = databaseSnapshot['@voice-playback-statistics'][voice.path] ?? 0
      statistics[voice.path] = Math.max(statistics[voice.path] ?? 0, prevCount + 1)
    })

    emit('@voice-playback-statistics/report-playback', {
      path: voice.path
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
