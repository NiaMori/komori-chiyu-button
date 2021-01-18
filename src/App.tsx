/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment } from 'react'

import {
  AppBar,
  Avatar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core'

import { VoiceInfoPanel } from './components/voice-info-panel'
import { OptionsPanel } from './components/options-panel'
import { Cards } from './components/cards'
import { VoicesCard } from './components/voices-card'

import { useVoices } from './hooks/use-voices'
import { useOptions } from './hooks/use-options'
import { url } from '../assets/assets.meta'
import { Github, TelevisionClassic } from 'mdi-material-ui'

const App = () : JSX.Element => {
  console.log('Komori......Komori...... 寂しい......')

  const theme = useTheme()

  const [options] = useOptions()

  const { voices } = useVoices(options)

  return (
    <Fragment>
      <AppBar position = 'sticky'>
        <Toolbar>
          <Avatar
            src = {url('@images/komori-avatar.png')}
            css = {css`
              margin-right: ${theme.spacing(2)}px;
            `}
          />

          <Typography
            css = {css`
              flex: 1;
            `}
          >
            Komori Chiyu Button
          </Typography>

          <Tooltip title = "bilibili">
            <IconButton
              color = 'inherit'
              component = 'a'
              href = 'https://space.bilibili.com/2299184/'
              target = '_blank'
            >
              <TelevisionClassic />
            </IconButton>
          </Tooltip>

          <Tooltip title = "Github">
            <IconButton
              color = 'inherit'
              component = 'a'
              href = 'https://github.com/NiaMori/komori-chiyu-button'
              target = '_blank'
            >
              <Github />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container
        css = {css`
          margin-top: ${theme.spacing(3)}px;
        `}
      >
        <Grid container spacing = {3} alignItems = 'stretch'>
          <Grid item xs>
            <VoiceInfoPanel
              css = {css`
                height: 100%;
              `}
            />
          </Grid>

          <Grid item xs>
            <OptionsPanel
              css = {css`
                height: 100%;
              `}
            />
          </Grid>
        </Grid>

        <Cards columnGap = {theme.spacing(5)}>
          {voices.map(([tag, voices]) => (
            <VoicesCard key = {tag} tag = {tag} voices = {voices}></VoicesCard>
          ))}
        </Cards>
      </Container>
    </Fragment>
  )
}

export default App
