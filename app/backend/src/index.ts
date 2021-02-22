import { Server as SocketServer, Socket } from 'socket.io'

import { emit, subscribe } from './remote-event-emitter'

const io = new SocketServer(3002)

const database: Record<string, number> = {}

io.on('connection', (socket: Socket) => {
  emit(io, '@voice-playback-statistics/changes', {
    changes: Object.entries(database).map(([path, count]) => {
      return {
        type: 'create',
        newData: {
          path,
          count
        }
      }
    })
  })

  subscribe(socket, '@voice-playback-statistics/report-playback', ({ path }) => {
    if (!database[path]) {
      database[path] = 0
    }

    const prevCount = database[path]
    const currCount = database[path] + 1

    database[path] = currCount

    emit(io, '@voice-playback-statistics/changes', {
      changes: [{
        type: 'update',

        oldData: {
          path,
          count: prevCount
        },

        newData: {
          path,
          count: currCount
        }
      }]
    })
  })
})
