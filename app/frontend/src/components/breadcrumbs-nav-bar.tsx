/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { ReactNode } from 'react'

import { Link, useLocation } from 'react-router-dom'

import {
  Breadcrumbs,
  Button,
  Paper,
  useTheme
} from '@material-ui/core'

import { Archive, ChevronRight, Home, Information } from 'mdi-material-ui'

import { useTranslation } from 'react-i18next'

const crumb = {
  'home': {
    desc: '首页',
    icon: (<Home />)
  },

  'archive': {
    desc: '归档',
    icon: (<Archive />)
  },

  'about': {
    desc: '关于',
    icon: (<Information />)
  }
} as const

interface BreadProps {
  desc: string,
  icon: ReactNode,
  to: string
}

const Bread = ({ desc, icon, to }: BreadProps) => {
  const { t } = useTranslation()

  return (
    <Button
      component = {Link}
      to = {to}
      variant = 'text'
      startIcon = {icon}
      css = {css`
        text-transform: none;
      `}
    >
      {t(desc)}
    </Button>
  )
}

export const BreadcrumbsNavBar = () : JSX.Element | null => {
  const theme = useTheme()

  const { pathname } = useLocation()

  if (pathname === '/') {
    return null
  }

  const pathnames = pathname.split('/').filter((it) => it)

  return (
    <Paper
      css = {css`
        margin-bottom: ${theme.spacing(2)}px;
        padding: ${theme.spacing(2)}px;
      `}
    >
      <Breadcrumbs separator = {<ChevronRight />}>
        <Bread desc = '首页' icon = {<Home />} to = '/' />

        {pathnames.map((it, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const { desc, icon } = crumb[it as keyof typeof crumb]

          return <Bread key = {to} desc = {desc} icon = {icon} to = {to} />
        })}
      </Breadcrumbs>
    </Paper>
  )
}
