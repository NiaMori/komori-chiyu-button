import { useCallback } from 'react'
import { useLatest } from 'react-use'
import produce, { Draft } from 'immer'

import { createPersistedHook } from './create-persisited-hook'

export interface Options {
  gachiValue: number,
  showAllVoices: boolean,
  showSexyKomori: boolean,
  loop: boolean,
  overlap: boolean
}

export interface OptionsMethods {
  getOption: <T extends keyof Options>(name: T) => Options[T],
  modify: (recipe: (draft: Draft<Options>) => void) => void
}

export type OptionsHook = [Options, OptionsMethods]

const useOptionsState = createPersistedHook({
  key: '@komori-chiyu-button/options'
})

export const useOptions = () : OptionsHook => {
  const [options, setOptions] = useOptionsState<Options>({
    gachiValue: 100,
    showAllVoices: false,
    showSexyKomori: false,
    loop: false,
    overlap: false
  })

  const latestOptions = useLatest(options)
  const getOption = useCallback<OptionsMethods['getOption']>(name => {
    return latestOptions.current[name]
  }, [latestOptions])

  const modify = useCallback<OptionsMethods['modify']>((recipe) => {
    setOptions(base => produce(base, draft => {
      recipe(draft)
    }))
  }, [setOptions])

  return [
    options, {
      getOption,
      modify
    }
  ]
}
