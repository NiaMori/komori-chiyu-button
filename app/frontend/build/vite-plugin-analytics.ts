import { Plugin } from 'vite'

export const analytics = (): Plugin => {
  return {
    name: 'vite-plugin-analytics',

    transformIndexHtml (html, { server }) {
      if (server) {
        return html
      }

      return html.replace(/<head>/, '' +
`<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VLGY6V94TB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag () { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-VLGY6V94TB');
</script>
`)
    }
  }
}
