/** @jsx jsx */
import { jsx } from '@emotion/react'

import { Button } from '@material-ui/core'

import { useEffectOnce } from 'react-use'
import { useSnackbar } from 'notistack'

const webviewUserAgentPattern = new RegExp([
  'WebView',
  '(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)',
  'Android.*(wv|.0.0.0)',
  'Linux; U; Android'
].map(it => `(${it})`).join('|'), 'ig')

export const isWebView = () : boolean => {
  return webviewUserAgentPattern.test(navigator.userAgent)
}

export const useWebViewWarning = () : void => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffectOnce(() => {
    if (isWebView()) {
      enqueueSnackbar('您正在使用 app 内置浏览器\n为获得最佳的体验\n推荐使用原生浏览器访问本站 ^_^', {
        variant: 'warning',
        style: { whiteSpace: 'pre-line' },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        autoHideDuration: 3500,
        action: (key) => (
          <Button
            key = 'confirm'
            onClick = {() => closeSnackbar(key)}
            variant = 'contained'
            color = 'secondary'
          >
            确认
          </Button>
        )
      })
    }
  })
}
