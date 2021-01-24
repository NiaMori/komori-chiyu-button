/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { Badge, Button, useTheme } from '@material-ui/core'

import { useVoicePlayback } from '../hooks/use-voice-playback'

import { Voice, isNewVoice } from '../data/voices.data'

export interface VoiceButtonProps {
  className?: string,
  voice: Voice
}

export const VoiceButton = ({
  voice,
  className
}: VoiceButtonProps) : JSX.Element => {
  const theme = useTheme()

  const { desc } = voice

  const { play } = useVoicePlayback(voice)

  const isNew = isNewVoice(voice)

  return (
    <Badge
      color = 'primary'
      badgeContent = 'new'
      invisible = {!isNew}
      className = {className}
      css = {css`
        margin-right: ${isNew ? theme.spacing(3) : theme.spacing(1)}px;
        margin-bottom: ${theme.spacing(2)}px;
      `}
    >
      <Button
        onClick = {() => {play()}}
        variant = 'contained'
        color = 'secondary'
        css = {css`
          color: #FFFCEF;
        `}
      >
        <span>{desc}</span>
      </Button>
    </Badge>
  )
}
