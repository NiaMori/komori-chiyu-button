import { Voice } from '../data'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const gtag = (...args: any[]): void => {
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (window as any).gtag(...args)
}

export const reportVoicePlayback = (voice: Voice): void => {
  if (import.meta.env.MODE === 'production') {
    gtag('event', 'voice_playback', {
      path: voice.path,
      value: 1
    })
  }
}
