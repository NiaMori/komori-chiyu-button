export interface Create<T> {
  type: 'create',
  newData: T
}

export interface Update<T> {
  type: 'update',
  oldData: T,
  newData: T
}

export interface Delete<T> {
  type: 'delete',
  oldData: T
}

export type Change<T> = Create<T> | Update<T> | Delete<T>

export interface ClientEvents {
  '@voice-playback-statistics/report-playback': {
    path: string
  }
}

export interface ServerEvents {
  '@voice-playback-statistics/changes': {
    changes: Change<{
      path: string,
      count: number
    }>[]
  }
}
