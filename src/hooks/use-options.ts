import { useCallback } from 'react'
import { createStateContext, useLatest } from 'react-use'
import produce, { Draft } from 'immer'

export interface Options {
  gachiValue: number,
  showAllVoices: boolean,
  showSexyKomori: boolean,
  loop: boolean,
  overlap: boolean
}

export interface OptionsMethods {
  modify: (recipe: (draft: Draft<Options>) => void) => void
}

export type OptionsHook = [Options, OptionsMethods]

export const [useOptionsState, OptionsProvider] = createStateContext<Options>({
  gachiValue: 100,
  showAllVoices: false,
  showSexyKomori: false,
  loop: false,
  overlap: false
})

export const useOptions = () : OptionsHook => {
  const [options, setOptions] = useOptionsState()

  const modify = useCallback<OptionsMethods['modify']>((recipe) => {
    setOptions(base => produce(base, draft => {
      recipe(draft)
    }))
  }, [setOptions])

  return [
    options, {
      modify
    }
  ]
}
