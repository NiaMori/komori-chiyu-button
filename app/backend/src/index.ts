import { createServer } from 'http'

import { voices } from '@frontend/src/data'

const http = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(voices, null, 2))
})

http.listen(8080, () => {
  console.log('listening at localhost:8080...')
})
