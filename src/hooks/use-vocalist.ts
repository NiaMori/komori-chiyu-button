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
  soundsIndex: string[]
}

export interface VocalistMethods {
  switchTo: (sound: Omit<Sound, 'state'>) => void,
  dispatchEvent: ({ event, id }: { event: 'play' | 'end' | 'stop' | 'loaded', id: string }) => void
}

export type VocalistHook = [Vocalist, VocalistMethods]

export const [useVocalistState, VocalistProvider] = createStateContext<Vocalist>({
  sounds: {},
  soundsIndex: []
})

const isLoaded = (ref: () => Howl | null) : boolean => {
  const instance = ref()
  return !!instance && instance.state() === 'loaded'
}

export const useVocalist = () : VocalistHook => {
  const [vocalist, setVocalist] = useVocalistState()

  const [{ overlap }, { getOption }] = useOptions()

  const switchTo = useCallback<VocalistMethods['switchTo']>((sound) => {
    setVocalist(base => produce(base, (self) => {
      if (!overlap) {
        for (const id of Object.keys(self.sounds)) {
          self.sounds[id].stop()

          delete self.sounds[id]
        }

        self.soundsIndex = []
      }

      const { id } = sound

      if (self.sounds[id]) {
        self.sounds[id].stop()
        self.soundsIndex.splice(self.soundsIndex.findIndex((it) => it === id), 1)
      }

      self.soundsIndex.push(id)

      const state = isLoaded(sound.ref) ? 'playing' : 'loading'

      self.sounds[id] = {
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

        if (!getOption('loop')) {
          delete self.sounds[id]

          self.soundsIndex.splice(self.soundsIndex.findIndex((it) => it === id), 1)
        }
      } else if (event === 'loaded') {
        self.sounds[id].state = 'playing'
      } else if (event === 'stop') {
        self.sounds[id].state = 'stopped'
      }
    }))
  }, [getOption, setVocalist])

  return [
    vocalist, {
      switchTo,
      dispatchEvent
    }
  ]
}
