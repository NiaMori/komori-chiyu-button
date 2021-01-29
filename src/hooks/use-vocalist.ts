import { useCallback } from 'react'
import { createStateContext, useLatest } from 'react-use'
import produce from 'immer'

import { Voice } from '../data'
import { useOptions } from './use-options'
import { Howl } from 'howler'

export interface Sound {
  id: string,
  voice: Voice,
  ref: () => Howl | null,
  play: () => void,
  stop: () => void,

  state: 'unloaded' | 'loading' | 'stopped' | 'playing'
}

export interface Vocalist {
  sounds: Record<string, Sound>,
}

export interface VocalistMethods {
  switchTo: (sound: Omit<Sound, 'state'>) => void,
  dispatchEvent: ({ event, id }: { event: 'play' | 'end' | 'stop' | 'loaded', id: string }) => void
}

export type VocalistHook = [Vocalist, VocalistMethods]

export const [useVocalistState, VocalistProvider] = createStateContext<Vocalist>({
  sounds: {}
})

const isLoaded = (ref: () => Howl | null) : boolean => {
  const instance = ref()
  return !!instance && instance.state() === 'loaded'
}

export const useVocalist = () : VocalistHook => {
  const [vocalist, setVocalist] = useVocalistState()

  const [{ loop, overlap }] = useOptions()

  // TODO: refactor useOptions to give latest options
  const latestLoop = useLatest(loop)
  const isLooping = useCallback(() => latestLoop.current, [latestLoop])

  const switchTo = useCallback<VocalistMethods['switchTo']>((sound) => {
    setVocalist(base => produce(base, (self) => {
      if (!overlap) {
        for (const id of Object.keys(self.sounds)) {
          self.sounds[id].stop()

          delete self.sounds[id]
        }
      }

      if (self.sounds[sound.id]) {
        self.sounds[sound.id].stop()
      }

      const state = isLoaded(sound.ref) ? 'playing' : 'loading'

      self.sounds[sound.id] = {
        ...sound,
        state
      }

      sound.play()
    }))
  }, [overlap, setVocalist])

  const dispatchEvent = useCallback<VocalistMethods['dispatchEvent']>(({ event, id }) => {
    setVocalist(base => produce(base, (self) => {
      if (!self.sounds[id]) {
        return
      }

      if (event === 'play') {
        self.sounds[id].state = 'playing'
      } else if (event === 'end') {
        self.sounds[id].state = 'stopped'

        if (!isLooping() && Object.keys(self.sounds).length != 1) {
          delete self.sounds[id]
        }
      } else if (event === 'loaded') {
        self.sounds[id].state = 'playing'
      } else if (event === 'stop') {
        self.sounds[id].state = 'stopped'
      }
    }))
  }, [isLooping, setVocalist])

  return [
    vocalist, {
      switchTo,
      dispatchEvent
    }
  ]
}
