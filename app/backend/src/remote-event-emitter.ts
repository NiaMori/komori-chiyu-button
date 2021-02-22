import { ClientEvents, ServerEvents } from '@bridge/src/events'

import { EventEmitter } from 'events'

export const emit = <E extends keyof ServerEvents>(
  emitter: EventEmitter,
  eventName: E,
  payload: ServerEvents[E]
) => {
  emitter.emit(eventName, payload)
}

export const subscribe = <E extends keyof ClientEvents>(
  emitter: EventEmitter,
  eventName: E,
  subscriber: (payload: ClientEvents[E]) => unknown
) : () => void => {
  emitter.on(eventName, subscriber)

  return () => {
    emitter.off(eventName, subscriber)
  }
}
