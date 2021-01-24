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
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5bcd522a79124b53b28304e5a11d47cd"}'></script>
<!-- End Cloudflare Web Analytics -->

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
