/** @jsx jsx */
import { jsx } from '@emotion/react'

import { Button } from '@material-ui/core'

import { useVoicePlayback } from '../hooks/use-voice-playback'

import { Voice } from '../data/voices.data'

export interface VoiceButtonProps {
  className?: string,
  voice: Voice
}

export const VoiceButton = ({
  voice,
  className
}: VoiceButtonProps) : JSX.Element => {
  const { desc } = voice

  const { play } = useVoicePlayback(voice)

  return (
    <Button
      onClick = {() => {play()}}
      variant = 'contained'
      color = 'secondary'
      className = {className}
    >
      <span>{desc}</span>
    </Button>
  )
}
