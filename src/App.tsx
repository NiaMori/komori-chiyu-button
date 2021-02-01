/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment, useEffect, useState } from 'react'

import { Switch as RouterView, Route, Link } from 'react-router-dom'

import { url } from '../assets/assets.meta'

import { useTranslation } from 'react-i18next'

import {
  AppBar,
  Avatar,
  Button,
  Container,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useTheme
} from '@material-ui/core'

import {
  Github,
  TelevisionClassic,
  Information,
  DotsVertical,
  Home
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

const items = [{
  url: 'https://space.bilibili.com/2299184',
  desc: 'Bilibili',
  external: true,
  icon: <TelevisionClassic />,
  type: 'primary',
}, {
  url: '/',
  desc: '首页',
  external: false,
  icon: <Home />,
  type: 'only-in-menu'
}, {
  url: 'https://github.com/NiaMori/komori-chiyu-button',
  desc: 'GitHub',
  external: true,
  icon: <Github />,
  type: 'secondary'
}, {
  url: '/about',
  desc: '关于',
  external: false,
  icon: <Information />,
  type: 'secondary'
}] as const

const bindLink = ({ url, external }: { url: string, external: boolean }) => {
  if (external) {
    return {
      component: 'a',
      href: url,
      target: '_blank',
      rel: 'noopener'
    }
  } else {
    return {
      component: Link,
      to: url
    }
  }
}

const App = () : JSX.Element => {
  useEffect(() => {
    for (const it of komoriAA.trim().split(/\n/)) {
      console.log(it)
    }
  }, [])

  console.log('Komori......Komori...... 寂しい......')

  const theme = useTheme()

  const { t }  = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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

          {items.filter(it => it.type === 'primary').map(({ url, desc, external, icon }) => (
            <Tooltip title = {t(desc) ?? ''} key = {url}>
              <IconButton
                color = 'inherit'
                { ...bindLink({ url, external }) }
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}

          <Hidden xsDown>
            {items.filter(it => it.type === 'secondary').map(({ url, desc, external, icon }) => (
              <Tooltip title = {t(desc) ?? ''} key = {url}>
                <IconButton
                  color = 'inherit'
                  { ...bindLink({ url, external }) }
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Hidden>

          <Hidden smUp>
            <Tooltip title = "More">
              <IconButton
                color = 'inherit'
                onClick = {handleClick}
              >
                <DotsVertical />
              </IconButton>
            </Tooltip>
          </Hidden>

          <Menu
            anchorEl = {anchorEl}
            keepMounted
            open = {Boolean(anchorEl)}
            onClose = {handleClose}
            anchorOrigin = {{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin = {{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {items.filter(it => ['secondary', 'only-in-menu'].includes(it.type)).map(({ url, desc, external, icon }) => (
              <MenuItem onClick = {handleClose} key = {url} { ...bindLink({ url, external }) }>
                {icon}
                <span
                  css = {css`
                    margin-left: ${theme.spacing(1)}px;
                  `}
                >{t(desc)}</span>
              </MenuItem>
            ))}
          </Menu>
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
