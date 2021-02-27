import { Server as SocketServer, Socket } from 'socket.io'
import { getDatabaseProvider } from './database'
import { emit, subscribe } from './remote-event-emitter'

const main = async () => {
  const { retire, record } = await getDatabaseProvider()
  const statistics = await retire()

  const io = new SocketServer(3002, {
    path: '/backend/',
    cors: {
      origin: [
        'https://komori.niamori.moe',
        'https://button.komori.club',
        'https://komori-chiyu-button.niamori.workers.dev',
        'https://komori-chiyu-button-dev.niamori.workers.dev'
      ]
    }
  })

  io.on('connection', (socket: Socket) => {
    emit(io, '@voice-playback-statistics/changes', {
      changes: Object.entries(statistics).map(([path, count]) => {
        return {
          type: 'create',
          newData: {
            path,
            count
          }
        }
      })
    })

    subscribe(socket, '@voice-playback-statistics/report-playback', ({ path, clientID, timestampInMilliseconds }) => {
      if (!statistics[path]) {
        statistics[path] = 0
      }

      const prevCount = statistics[path]
      const currCount = statistics[path] + 1

      statistics[path] = currCount

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

      record({
        voiceID: path,
        clientID,
        playTime: new Date(timestampInMilliseconds)
      })
    })
  })

}

main()
