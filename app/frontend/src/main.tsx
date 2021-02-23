/** @jsx jsx */
import { jsx } from '@emotion/react'

import React, { ComponentType, Fragment, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as RouterProvider } from 'react-router-dom'

import App from './App'

import { SnackbarProvider } from 'notistack'

import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core'

import {
  OptionsProvider,
  VocalistProvider,
  RemoteEventEmiterProvider,
  DatabaseProvider
} from './hooks'

import { configureI18N } from './misc/i18n'

configureI18N()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#444041'
    },

    secondary: {
      main: '#AE3A49'
    }
  }
})

export const Compose = ({
  components,
  children
}: PropsWithChildren<{ components: ComponentType[] }>) : JSX.Element => (
  <Fragment>
    {components.reverse().reduce((children, Component) => {
      return <Component>{children}</Component>
    }, children)}
  </Fragment>
)

const providers: ComponentType[] = [
  ({ children }) => <ThemeProvider theme = {theme}>{children}</ThemeProvider>,
  RemoteEventEmiterProvider,
  DatabaseProvider,
  ({ children }) => <SnackbarProvider>{children}</SnackbarProvider>,
  OptionsProvider,
  VocalistProvider,
  RouterProvider
]

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />

    <Compose components = {providers}>
      <App/>
    </Compose>
  </React.StrictMode>,
  document.getElementById('root')
)
