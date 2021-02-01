/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { ReactNode, useMemo, useState } from 'react'

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
  Home,
  Translate
} from 'mdi-material-ui'

interface Item {
  desc: string,
  type: 'primary' | 'secondary' | 'only-in-menu',
  icon: ReactNode,

  action: {
    url?: string,
    external?: boolean,
    onClick?: () => void
  }
}

const bindAction = ({ url, external, onClick }: Item['action']) => {
  if (url) {
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
  } else if (onClick) {
    return {
      onClick
    }
  } else {
    return {}
  }
}

const useItems = () : Item[] => {
  const { t, i18n } = useTranslation()

  return useMemo(() => {
    return [{
      desc: 'Bilibili',
      icon: <TelevisionClassic />,
      type: 'primary',
      action: {
        url: 'https://space.bilibili.com/2299184',
        external: true
      },
    }, {
      desc: '首页',
      icon: <Home />,
      type: 'only-in-menu',
      action: {
        url: '/',
        external: false
      }
    }, {
      desc: 'GitHub',
      icon: <Github />,
      type: 'secondary',
      action: {
        url: 'https://github.com/NiaMori/komori-chiyu-button',
        external: true,
      }
    }, {
      desc: '关于',
      icon: <Information />,
      type: 'secondary',
      action: {
        url: '/about',
        external: false,
      }
    }, {
      desc: i18n.language === 'zh-CN' ? t('切换到日文', { lng: 'ja' }) : t('切换到中文', { lng: 'zh-CN' }),
      icon: <Translate />,
      type: 'secondary',
      action: {
        onClick: () => {
          if (i18n.language === 'zh-CN') {
            i18n.changeLanguage('ja')
          } else {
            i18n.changeLanguage('zh-CN')
          }
        }
      }
    }]
  }, [i18n, t])
}

const useMenu = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const items = useItems()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const openMenuHere = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const menu = (
    <Menu
      anchorEl = {anchorEl}
      keepMounted
      open = {Boolean(anchorEl)}
      onClose = {closeMenu}
      anchorOrigin = {{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin = {{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {items.filter(it => ['secondary', 'only-in-menu'].includes(it.type)).map(({ desc, icon, action }) => (
        <MenuItem
          onClick = {() => {
            closeMenu()
            action.onClick && action.onClick()
          }}
          key = {desc}
          { ...bindAction({ url: action.url, external: action.external }) }
        >
          {icon}
          <span
            css = {css`
              margin-left: ${theme.spacing(1)}px;
            `}
          >
            { t(desc) }
          </span>
        </MenuItem>
      ))}
    </Menu>
  )

  return [menu, {
    openMenuHere,
    closeMenu
  }] as const
}

export const Header = () : JSX.Element => {
  const theme = useTheme()
  const { t }  = useTranslation()

  const items = useItems()

  const [menu, { openMenuHere }] = useMenu()

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

        {items.filter(it => it.type === 'primary').map(({ desc, icon, action }) => (
          <Tooltip title = {t(desc) ?? ''} key = {desc}>
            <IconButton
              color = 'inherit'
              { ...bindAction(action) }
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}

        <Hidden xsDown>
          {items.filter(it => it.type === 'secondary').map(({ desc, icon, action }) => (
            <Tooltip title = {t(desc) ?? ''} key = {desc}>
              <IconButton
                color = 'inherit'
                { ...bindAction(action) }
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
              onClick = {openMenuHere}
            >
              <DotsVertical />
            </IconButton>
          </Tooltip>
        </Hidden>

        {menu}
      </Toolbar>
    </AppBar>
  )
}
