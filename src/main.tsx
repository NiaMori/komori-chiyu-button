/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { CssBaseline } from '@material-ui/core'
import { VocalistProvider } from './hooks/use-vocalist'
import { OptionsProvider } from './hooks/use-options'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />

    <VocalistProvider>
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </VocalistProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
