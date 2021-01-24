import { useState } from 'react'
import { useDebounce } from 'react-use'

export const useDebounced = <T>(value: T, ms: number) :T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useDebounce(() => {
    setDebouncedValue(value)
  }, ms, [value])

  return debouncedValue
}
