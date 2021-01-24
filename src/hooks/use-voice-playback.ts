import { url } from '../../assets/assets.meta'
import { useCallback } from 'react'

import useSound from 'use-sound'
import { useVocalist } from './use-vocalist'

import { Voice } from '../data/voices.data'

import { reportVoicePlayback } from '../analytics'

export const useVoicePlayback = ({ voice, tag }: { voice: Voice, tag: string }) : { play: () => void } => {
  const [, { switchTo, triggerOnPlay, triggerOnEnd, triggerOnLoaded }] = useVocalist()

  const [playSound, {
    stop: stopSound,
    sound
  } ] =  useSound(url(voice.path), {
    preload: false,
    onplay: () => { reportVoicePlayback(voice), triggerOnPlay() },
    onend: triggerOnEnd,
    onload: triggerOnLoaded
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  const play = useCallback(() => {
    if (sound) {
      switchTo({
        voice,
        tag,
        howl: sound,
        load: () => {
          if (sound.state() == 'unloaded') {
            sound.load()
          }
        },
        play: playSound,
        stop: stopSound
      })
    }
  }, [playSound, stopSound, sound, voice, tag, switchTo])

  return {
    play
  }
}
