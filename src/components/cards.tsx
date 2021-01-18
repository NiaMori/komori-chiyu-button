/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { ReactNode } from 'react'

import { Box, useTheme } from '@material-ui/core'

export interface CardsProps {
  children: ReactNode,
  className?: string,
  columnGap?: number
}

export const Cards = (props: CardsProps) : JSX.Element => {
  const theme = useTheme()

  const {
    children,
    className,
    columnGap = theme.spacing(2)
  } = props

  const style = css`
    ${theme.breakpoints.up('md')} {
      column-count: 3;
    }

    ${theme.breakpoints.between('sm', 'md')} {
      column-count: 2;
    }

    ${theme.breakpoints.down('sm')} {
      column-count: 1;
    }

    column-gap: ${columnGap}px;

    > .MuiCard-root {
      break-inside: avoid-column;
      display: inline-block;
      width: 100%;
      margin-bottom: ${theme.spacing(2)}px;
    }
  `

  return (
    <Box css = {style} className = {className}>
      { children }
    </Box>
  )
}
