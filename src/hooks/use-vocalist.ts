import { useCallback } from 'react'
import { createStateContext } from 'react-use'
import produce from 'immer'

import { Voice } from '../data/voices.data'
import { Howl } from 'howler'

export interface Sound {
  load: () => void,
  play: () => void,
  stop: () => void,
  voice: Voice,
  howl: Howl
}

export interface Vocalist {
  currentSound: Sound | null
  state: 'unloaded' | 'loading' | 'stopped' | 'playing'
}

export interface VocalistMethods {
  switchTo: (sound: Sound) => void,
  triggerOnPlay: () => void,
  triggerOnEnd: () => void,
  triggerOnLoaded: () => void
}

export type VocalistHook = [Vocalist, VocalistMethods]

export const [useVocalistState, VocalistProvider] = createStateContext<Vocalist>({
  currentSound: null,
  state: 'unloaded'
})

export const useVocalist = () : VocalistHook => {
  const [vocalist, setVocalist] = useVocalistState()

  const switchTo = useCallback<VocalistMethods['switchTo']>((sound) => {
    setVocalist(base => produce(base, (self) => {
      if (self.currentSound) {
        self.currentSound.stop()
      }

      self.currentSound = sound

      if (self.currentSound.howl.state() === 'loaded') {
        self.state = 'playing'
      } else {
        self.state = 'loading'
      }

      self.currentSound.load()
      self.currentSound.play()
    }))
  }, [setVocalist])

  const triggerOnPlay = useCallback(() => {
    setVocalist(base => produce(base, (self) => {
      self.state = 'playing'
    }))
  }, [setVocalist])

  const triggerOnEnd = useCallback(() => {
    setVocalist(base => produce(base, (self) => {
      self.state = 'stopped'
    }))
  }, [setVocalist])

  const triggerOnLoaded = useCallback(() => {
    setVocalist(base => produce(base, (self) => {
      self.state = 'playing'
    }))
  }, [setVocalist])

  return [
    vocalist, {
      switchTo,
      triggerOnPlay,
      triggerOnEnd,
      triggerOnLoaded
    }
  ]
}
