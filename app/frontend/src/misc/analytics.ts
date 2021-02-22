import { useCallback } from 'react'
import { Voice } from '../data'
import { useEmit } from '../hooks/use-remote-event-emitter'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const gtag = (...args: any[]): void => {
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (window as any).gtag(...args)
}

export const useReportVoicePlayback = (): { report: (voice: Voice) => void } => {
  const { emit } = useEmit()

  const report = useCallback((voice: Voice) => {
    emit('@voice-playback-statistics/report-playback', {
      path: voice.path
    })

    if (import.meta.env.MODE === 'production') {
      gtag('event', 'voice_playback', {
        path: voice.path
      })
    }
  }, [emit])

  return {
    report
  }
}
