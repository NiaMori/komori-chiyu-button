/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

import { useEffect, useRef } from 'react'

import {
  Card,
  CardContent,
  Typography,
  Divider as UnStyledDivider,
  Grid,
  Chip,
  useTheme
} from '@material-ui/core'

import { OriginLink } from './origin-link'

import { useVocalist } from '../hooks'

import { useTranslation } from 'react-i18next'

import {
  voices as allVoices,
  Voice
} from '../data'

export interface VoiceInfoPanelProps {
  className?: string
}

export const VoiceInfoPanel = ({
  className
}: VoiceInfoPanelProps) : JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [{ sounds, soundsIndex }] = useVocalist()

  const id = soundsIndex[soundsIndex.length - 1]
  const currentSound = sounds[id]

  const prevVoiceRef = useRef<Voice>()

  useEffect(() => {
    if (currentSound) {
      prevVoiceRef.current = currentSound.voice
    }
  }, [currentSound])

  const {
    voice = prevVoiceRef.current ?? allVoices[0],
    state = 'stopped'
  } = currentSound ?? {}

  const {
    desc,
    origin,
    tags,
    translation
  } = voice

  const styles = {
    flexVCenter: css`
      display: flex;
      align-items: center;
    `
  }

  const Divider = styled(UnStyledDivider)`
    margin-top: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
  `

  return (
    <Card className = {className}>
      <CardContent>
        <Typography variant = 'h5' lang = {translation && translation.ja ? 'ja' : 'zh-CN'}>
          《{ t(desc) }》- {state === 'loading' ? 'lording' : state}
        </Typography>

        <Divider />

        <Grid container>
          <Grid item css = {styles.flexVCenter}>
            {t('来源')}：
          </Grid>

          <Grid item xs>
            <OriginLink origin = {origin}></OriginLink>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item css = {styles.flexVCenter}>
            {t('标签')}：
          </Grid>

          <Grid item xs
            css = {css`
              > .MuiChip-root {
                margin-right: ${theme.spacing(1)}px;
              }
            `}
          >
            {tags.map((tag) => (
              <Chip key = {tag} variant = {'outlined'} label = {t(tag)} onClick = {() => null}/>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
