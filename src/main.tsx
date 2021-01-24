/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core'

import {
  VocalistProvider,
  OptionsProvider
} from './hooks'

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
      <VocalistProvider>
        <OptionsProvider>
          <App />
        </OptionsProvider>
      </VocalistProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
