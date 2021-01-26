/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment, useEffect } from 'react'

import { Switch as RouterView, Route, Link } from 'react-router-dom'

import { url } from '../assets/assets.meta'

import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme
} from '@material-ui/core'

import {
  Github,
  TelevisionClassic,
  Information
} from 'mdi-material-ui'

import {
  VoicesPage,
  AboutPage
} from './pages'

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

const routers = [{
  path: '/',
  exact: true,
  render: () => <VoicesPage />
}, {
  path: '/about',
  exact: true,
  render: () => <AboutPage />
}]

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

          <Button
            variant = 'text'
            component = {Link}
            to = '/'
            color = 'inherit'
            css = {css`
              flex: 1;
              text-transform: none;
              > .MuiButton-label {
                justify-content: flex-start;
              }
            `}
          >
            Komori Chiyu Button
          </Button>

          <Tooltip title = "bilibili">
            <IconButton
              color = 'inherit'
              component = 'a'
              href = 'https://space.bilibili.com/2299184/'
              target = '_blank'
              rel = 'noopener'
            >
              <TelevisionClassic />
            </IconButton>
          </Tooltip>

          <Tooltip title = "About">
            <IconButton
              color = 'inherit'
              component = {Link}
              to = '/about'
            >
              <Information />
            </IconButton>
          </Tooltip>

          <Tooltip title = "Github">
            <IconButton
              color = 'inherit'
              component = 'a'
              href = 'https://github.com/NiaMori/komori-chiyu-button'
              target = '_blank'
              rel = 'noopener'
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
        <RouterView>
          {routers.map(({ path, render, exact }, index) => (
            <Route key = {index} path = {path} exact = {exact} render = {render}/>
          ))}
        </RouterView>
      </Container>
    </Fragment>
  )
}

export default App
