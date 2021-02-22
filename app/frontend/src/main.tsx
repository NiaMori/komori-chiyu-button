/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'
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
  RemoteEventEmiterProvider
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

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />

    <ThemeProvider theme = {theme}>
      <RemoteEventEmiterProvider>
        <SnackbarProvider>
          <OptionsProvider>
            <VocalistProvider>
              <RouterProvider>
                <App />
              </RouterProvider>
            </VocalistProvider>
          </OptionsProvider>
        </SnackbarProvider>
      </RemoteEventEmiterProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
