import { url } from '../misc/assets'

import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useVocalist } from './use-vocalist'

import { Voice } from '../data'

import { useReportVoicePlayback } from '../misc/analytics'
import { useOptions } from './use-options'
import { Howl } from 'howler'

export interface UseVoicePlaybackProps {
  voice: Voice,
  tag: string
}

export interface UseVoicePlaybackHook {
  play: () => void
}

export const useVoicePlayback = ({
  voice,
  tag
}: UseVoicePlaybackProps) : UseVoicePlaybackHook => {
  const [, { switchTo, dispatchEvent }] = useVocalist()

  const soundRef = useRef<Howl>()

  const id = useMemo(() => `${voice.path}#${tag}`, [tag, voice.path])

  const [{ loop }, { getOption }] = useOptions()

  const { report } = useReportVoicePlayback()

  const playSound = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: url(voice.path),
        loop: getOption('loop')
      })
    }

    soundRef.current.off()
    soundRef.current.on('load', () => dispatchEvent({ event: 'loaded', id }))
    soundRef.current.on('play', () => dispatchEvent({ event: 'play', id }))
    soundRef.current.on('end', () => dispatchEvent({ event: 'end', id }))
    soundRef.current.on('stop', () => dispatchEvent({ event: 'stop', id }))

    soundRef.current.loop(getOption('loop'))

    if (soundRef.current.state() === 'unloaded') {
      soundRef.current.load()
    }

    soundRef.current.play()
  }, [getOption, voice.path, dispatchEvent, id])

  const stopSound = useCallback(() => {
    if (soundRef.current && soundRef.current.playing()) {
      soundRef.current.stop()
      soundRef.current.off()
    }
  }, [])

  const play = useCallback(() => {
    report(voice)

    switchTo({
      id,
      voice,
      play: playSound,
      stop: stopSound,
      ref: () => soundRef.current ?? null
    })
  }, [switchTo, id, voice, playSound, stopSound, report])

  useEffect(() => {
    soundRef.current?.loop(loop)
  }, [loop])

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop()
      }
    }
  }, [])

  return {
    play
  }
}
