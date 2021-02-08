const webviewUserAgentPattern = new RegExp([
  'WebView',
  '(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)',
  'Android.*(wv|.0.0.0)',
  'Linux; U; Android'
].map(it => `(${it})`).join('|'), 'ig')

export const isWebView = () : boolean => {
  return webviewUserAgentPattern.test(navigator.userAgent)
}
