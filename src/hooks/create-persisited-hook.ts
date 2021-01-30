import { useState } from 'react'

export interface StorageProvider {
  get: (key: string) => string | null,
  set: (key: string, value: string) => void,
  del: (key: string) => void
}

export const LocalStorageProvider: StorageProvider = {
  get: (key) => {
    return window.localStorage.getItem(key)
  },

  set: (key, value) => {
    window.localStorage.setItem(key, value)
  },

  del: (key) => {
    window.localStorage.removeItem(key)
  }
}

export interface CreatePersistedHookOptions {
  key: string,
  provider?: StorageProvider
}

export type PersistedHook = <S>(initialState: S) => [S, (setStateAction: S | ((prevState: S) => S)) => void]

export const createPersistedHook = (options: CreatePersistedHookOptions) : PersistedHook => {
  const {
    key,
    provider = LocalStorageProvider
  } = options

  return <S>(initialState: S) => {
    const [storedState, setStoredState] = useState<S>(() => {
      const item = provider.get(key)

      if (item) {
        return JSON.parse(item) as S
      } else {
        provider.set(key, JSON.stringify(initialState))
        return initialState
      }
    })

    const setState = (setStateAction: S | ((prevState: S) => S)) => {
      const newState = setStateAction instanceof Function
        ? setStateAction(storedState)
        : setStateAction

      setStoredState(newState)
      provider.set(key, JSON.stringify(newState))
    }

    return [storedState, setState]
  }
}
