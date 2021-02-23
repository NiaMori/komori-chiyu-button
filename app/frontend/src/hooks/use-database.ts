import { useCallback } from 'react'
import produce, { Draft } from 'immer'
import { createStateContext } from 'react-use'

import { useSubscriber } from './use-remote-event-emitter'

export interface Database {
  '@voice-playback-statistics': Record<string, number>
}

export const [useDatabaseState, DatabaseProvider] = createStateContext<Database>({
  '@voice-playback-statistics': {}
})

interface UseDatabaseHook {
  databaseSnapshot: Database,
  updateDatabase: (recipe: (databaseDraft: Draft<Database>) => void) => void
}

export const useDatabase = () : UseDatabaseHook => {
  const [databaseSnapshot, setDatabase] = useDatabaseState()

  const updateDatabase = useCallback<UseDatabaseHook['updateDatabase']>((recipe) => {
    setDatabase(base => produce(base, draft => {
      recipe(draft)
    }))
  }, [setDatabase])

  return {
    databaseSnapshot,
    updateDatabase
  }
}

export const useDatabaseSync = () : void => {
  const { updateDatabase } = useDatabase()

  useSubscriber('@voice-playback-statistics/changes', useCallback(({ changes }) => {
    updateDatabase(({ '@voice-playback-statistics': statistics }) => {
      for (const change of changes) {
        if (change.type === 'create' || change.type === 'update') {
          const { path, count } = change.newData
          const prevCount = statistics[path] ?? 0
          statistics[path] = Math.max(prevCount, count)
        } else if (change.type === 'delete') {
          const { path } = change.oldData
          statistics[path] = 0
        }
      }
    })
  }, [updateDatabase]))
}
