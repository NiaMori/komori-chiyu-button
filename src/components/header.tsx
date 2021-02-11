/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { ReactNode, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { url } from '../misc/assets'

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
  Archive
} from 'mdi-material-ui'

import { Language } from '../misc/i18n'

interface Item {
  desc: string,
  renderedDesc?: ReactNode,
  type: 'primary' | 'secondary' | 'only-in-menu' | 'only-outside',
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
    const languageItem = {
      'zh-CN': {
        desc: t('日文', { lng: 'ja' }),
        renderedDesc: <span lang = 'ja'>{t('日文', { lng: 'ja' })}</span>,
        icon: <img src = {url('@images/日.svg')} className = 'MuiSvgIcon-root' css = {css`transform: scale(0.92);`}/>,
        type: 'primary',
        action: {
          onClick: () => i18n.changeLanguage('ja')
        }
      },

      'ja': {
        desc: t('中文', { lng: 'zh-CN' }),
        renderedDesc: <span lang = 'zh-CN'>{t('中文', { lng: 'zh-CN' })}</span>,
        icon: <img src = {url('@images/中.svg')} className = 'MuiSvgIcon-root'/>,
        type: 'primary',
        action: {
          onClick: () => i18n.changeLanguage('zh-CN')
        }
      }
    } as const

    return [languageItem[t('@language-code') as Language], {
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
    },{
      desc: '归档',
      icon: <Archive />,
      type: 'only-outside',
      action: {
        url: '/archive',
        external: false,
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
      {items.filter(it => ['secondary', 'only-in-menu'].includes(it.type)).map(({ desc, renderedDesc, icon, action }) => (
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
            { renderedDesc ?? t(desc) }
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
          古守按钮
        </Button>

        {items.filter(it => it.type === 'primary').map(({ desc, renderedDesc, icon, action }) => (
          <Tooltip title = {renderedDesc ?? t(desc) ?? ''} key = {desc}>
            <IconButton
              color = 'inherit'
              { ...bindAction(action) }
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}

        <Hidden xsDown>
          {items.filter(it => ['secondary', 'only-outside'].includes(it.type)).map(({ desc, renderedDesc, icon, action }) => (
            <Tooltip title = {renderedDesc ?? t(desc) ?? ''} key = {desc}>
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
