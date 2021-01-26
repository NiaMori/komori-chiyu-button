/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import {
  Backdrop,
  Badge,
  Box,
  Button,
  useTheme
} from '@material-ui/core'

import {
  useVoicePlayback,
  useVocalist,
  useDebounced
} from '../hooks'

import {
  Voice,
  isNewVoice
} from '../data'

export interface VoiceButtonProps {
  className?: string,
  voice: Voice,
  tag: string
}

export const VoiceButton = ({
  voice,
  tag,
  className
}: VoiceButtonProps) : JSX.Element => {
  const theme = useTheme()

  const { desc, path } = voice

  const { play } = useVoicePlayback({
    voice,
    tag
  })

  const isNew = isNewVoice(voice)

  const [{ state, currentSound }] = useVocalist()

  const isLoadingRaw = state === 'loading'
    && !!currentSound
    && currentSound.voice.path == path
    && currentSound.tag == tag

  const isLoading = useDebounced(isLoadingRaw, 150)

  return (
    <Badge
      color = 'primary'
      badgeContent = 'new'
      invisible = {!isNew}
      className = {className}
      css = {css`
        margin-right: ${isNew ? theme.spacing(3) : theme.spacing(1)}px;
        margin-bottom: ${theme.spacing(2)}px;
        z-index: 2;
      `}
    >
      <Box>
        <Button
          onClick = {() => {play()}}
          variant = 'contained'
          color = 'secondary'
        >
          <span
            css = {css`
              color: #FFFCEF;
              opacity: ${isLoading ? 0 : 1};
            `}
          >
            {desc}
          </span>
        </Button>

        <Backdrop
          open = {isLoading}
          css = {css`
            position: absolute;
            z-index: 1;
          `}
        >
          <span
            css = {css`
              color: #FFFCEF;
            `}
          >
            Lording...
          </span>
        </Backdrop>
      </Box>
    </Badge>
  )
}
