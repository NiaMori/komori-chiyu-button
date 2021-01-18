/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment } from 'react'

import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core'

import { VoiceInfoPanel } from './components/voice-info-panel'
import { OptionsPanel } from './components/options-panel'
import { Cards } from './components/cards'
import { VoicesCard } from './components/voices-card'

import { useVoices } from './hooks/use-voices'
import { useOptions } from './hooks/use-options'

const App = () : JSX.Element => {
  console.log('Komori......Komori...... 寂しい......')

  const theme = useTheme()

  const [options] = useOptions()

  const { voices } = useVoices(options)

  return (
    <Fragment>
      <AppBar position = 'sticky'>
        <Toolbar>
          <Typography>
            Komori Chiyu Button
          </Typography>
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
