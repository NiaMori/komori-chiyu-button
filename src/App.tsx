/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment, useEffect } from 'react'

import { url } from '../assets/assets.meta'

import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core'

import {
  Github,
  TelevisionClassic
} from 'mdi-material-ui'

import { VoicesPage } from './pages'

const komoriAA = `
言いたいことがあるんだよ！
やっぱり古守はかわいいよ！
すきすき大好き！やっぱ好き！
やっと見つけた吸血鬼！
お肉が生まれてきた理由
それは古守に出会うため！
お肉と一緒に人生歩もう！
世界で一番ひきこもり！
ひ・き・こ・も・り！！
`

const App = () : JSX.Element => {
  useEffect(() => {
    for (const it of komoriAA.trim().split(/\n/)) {
      console.log(it)
    }
  }, [])

  console.log('Komori......Komori...... 寂しい......')

  const theme = useTheme()

  return (
    <Fragment>
      <AppBar position = 'sticky'>
        <Toolbar>
          <Avatar
            src = {url('@images/komori-avatar.webp')}
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
        <VoicesPage />
      </Container>
    </Fragment>
  )
}

export default App
