/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment, useEffect } from 'react'

import { Switch as RouterView, Route } from 'react-router-dom'

import {
  Container,
  useTheme
} from '@material-ui/core'

import { Header } from './components'

import {
  VoicesPage,
  AboutPage,
  ArchivePage
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

  return (
    <Fragment>
      <Header />

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
