/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

import { url } from '../../assets/assets.meta'

import {
  Card,
  Typography,
  CardContent,
  Box,
  Divider as UnStyledDivider,
  useTheme
} from '@material-ui/core'

import { VoiceButton } from './voice-button'

import { useTranslation } from 'react-i18next'

import { Voice } from '../data'

export interface VoicesCardProps {
  tag: string,
  voices: Voice[]
}

export const VoicesCard = ({
  tag,
  voices
}: VoicesCardProps) : JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const Divider = styled(UnStyledDivider)`
    margin-top: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
  `

  return (
    <Card
      elevation = {2}
      css = {css`
        position: relative;
        overflow: visible;
        margin-top: ${theme.spacing(3)}px;
      `}
    >
      <img
        src = {url('@images/komori-hat.svg')}
        css = {css`
          width: 5.5em;
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-57%, -27%) rotate(-20deg);
        `}
      />

      <CardContent>
        <Typography variant = 'h5' align = 'center'>
          O_o
        </Typography>

        <Divider />

        <Box>
          {voices.map((voice) => (
            <VoiceButton
              key = {voice.path}
              voice = {voice}
              tag = {tag}
            />
          ))}
        </Box>

        <Divider />

        <Typography align = 'center'>
          {t(tag)}
        </Typography>

      </CardContent>
    </Card>
  )
}
