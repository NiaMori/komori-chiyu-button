/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import { url } from '../../assets/assets.meta'

import { useTranslation } from 'react-i18next'

import {
  AppBar,
  Avatar,
  Button,
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

export const Header = () : JSX.Element => {
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
  )
}
