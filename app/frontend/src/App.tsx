/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment, useCallback, useEffect, useState } from 'react'

import { Switch as RouterView, Link, Route, useLocation } from 'react-router-dom'

import {
  Button,
  Container,
  Fab,
  Paper,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import { Header, BreadcrumbsNavBar } from './components'

import {
  VoicesPage,
  AboutPage,
  ArchivePage
} from './pages'

import { useEffectOnce } from 'react-use'
import { useSnackbar } from 'notistack'

import { isWebView } from './misc/utility'
import { Home } from 'mdi-material-ui'
import { useSubscriber } from './hooks/use-remote-event-emitter'
import { produce } from 'immer'

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
}, {
  path: '/archive',
  exact: true,
  render: () => <ArchivePage />
}]

const App = () : JSX.Element => {
  useEffect(() => {
    for (const it of komoriAA.trim().split(/\n/)) {
      console.log(it)
    }
  }, [])

  console.log('Komori......Komori...... 寂しい......')

  const theme = useTheme()

  const { pathname } = useLocation()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const showBackToHome = isSmall && pathname !== '/'

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffectOnce(() => {
    if (isWebView()) {
      enqueueSnackbar('您正在使用 app 内置浏览器\n为获得最佳的体验\n推荐使用原生浏览器访问本站 ^_^', {
        variant: 'warning',
        style: { whiteSpace: 'pre-line' },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        autoHideDuration: 3500,
        action: (key) => (
          <Button
            key = 'confirm'
            onClick = {() => closeSnackbar(key)}
            variant = 'contained'
            color = 'secondary'
          >
            确认
          </Button>
        )
      })
    }
  })

  const [state, setState] = useState<Record<string, number>>({})

  useSubscriber('@voice-playback-statistics/changes', useCallback(({ changes }) => {
    setState(prev => produce(prev, draft => {
      for (const change of changes) {
        if (change.type === 'create' || change.type === 'update') {
          const { path, count } = change.newData
          const prevCount = draft[path] ?? 0
          draft[path] = Math.max(prevCount, count)
        } else if (change.type === 'delete') {
          const { path } = change.oldData
          draft[path] = 0
        }
      }
    }))
  }, []))

  return (
    <Fragment>
      <Header />

      <Container
        css = {css`
          margin-top: ${theme.spacing(3)}px;
          margin-bottom: ${theme.spacing(3)}px;
          padding-left: ${theme.spacing(5)}px;
          padding-right: ${theme.spacing(5)}px;
        `}
      >
        <Fragment>
          <BreadcrumbsNavBar />

          <Paper
            css = {css`
              padding: ${theme.spacing(2)}px;
              margin-bottom: ${theme.spacing(3)}px;
            `}
          >
            <pre>
              {JSON.stringify(state, null, 2)}
            </pre>
          </Paper>

          <RouterView>
            {routers.map(({ path, render, exact }, index) => (
              <Route key = {index} path = {path} exact = {exact} render = {render}/>
            ))}
          </RouterView>

          {showBackToHome && <div
            css = {css`
              margin-top: ${theme.spacing(3)}px;
              text-align: center;
            `}
          >
            <Fab
              component = {Link}
              to = '/'
              variant = 'extended'
              css = {css`
                text-transform: none;
              `}
            >
              <Home
                css = {css`
                  margin-right: ${theme.spacing(1)}px;
                `}
              />

              Back To Home
            </Fab>
          </div>}
        </Fragment>
      </Container>
    </Fragment>
  )
}

export default App
