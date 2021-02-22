/** @jsx jsx */
import { jsx } from '@emotion/react'

import {
  useEffect,
  useMemo,
  useCallback,

  createContext,
  useContext,

  ReactNode
} from 'react'

import { io, Socket } from 'socket.io-client'

import { ClientEvents, ServerEvents } from '@bridge/src/events'

export interface RemoteEventEmitter {
  socket: Socket
}

const RemoteEventEmitterContext = createContext<RemoteEventEmitter | null>(null)

export const useRemoteEventEmitterContext = () : RemoteEventEmitter => {
  const it = useContext(RemoteEventEmitterContext)

  if (!it) {
    throw new Error('there is no `RemoteEventEmiter` Context')
  }

  return it
}

export interface UseEmitHook {
  emit: <E extends keyof ClientEvents>(eventName: E, payload: ClientEvents[E]) => void,
}

export const useEmit = () : UseEmitHook => {
  const { socket } = useRemoteEventEmitterContext()

  const emit = useCallback<UseEmitHook['emit']>((eventName, payload) => {
    if (socket.connected) {
      socket.emit(eventName, payload)
    } else {
      socket.once('connect', () => {
        socket.emit(eventName, payload)
      })
    }
  }, [socket])

  return {
    emit
  }
}

export const useSubscriber = <E extends keyof ServerEvents>(
  eventName: E,
  subscriber: (payload: ServerEvents[E]) => unknown
) : void => {
  const { socket } = useRemoteEventEmitterContext()

  useEffect(() => {
    socket.on(eventName, subscriber)

    return () => {
      socket.off(eventName, subscriber)
    }
  }, [socket, eventName, subscriber])
}

export const RemoteEventEmiterProvider = ({
  children
}: { children: ReactNode }) : JSX.Element => {
  const it = useMemo(() => {
    const socket = io('http://localhost:3002', {
      transports: ['websocket']
    })

    return {
      socket
    }
  }, [])

  return (
    <RemoteEventEmitterContext.Provider value = {it}>
      {children}
    </RemoteEventEmitterContext.Provider>
  )
}
