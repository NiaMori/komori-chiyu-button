import { useCallback, useMemo } from 'react'

import { Options } from './use-options'

import {
  sexyTags,
  Voice,
  voices as allVoices
} from '../data'

export type UseVoicesProps = Options

export interface UseVoicesHook {
  voices: [string, Voice[]][]
}

export const useGroupedVoices = (voices: Voice[]) : { bucket: { [tag: string]: Voice[] } } => {
  const bucket = useMemo(() => {
    const bucket: {
      [tag: string]: Voice[]
    } = {}

    for (const voice of voices) {
      for (const tag of voice.tags) {
        if (!bucket[tag]) {
          bucket[tag] = []
        }

        bucket[tag].push(voice)
      }
    }

    return bucket
  }, [voices])

  return {
    bucket
  }
}

export const useSortedTags = (bucket: { [tag: string]: Voice[] }) : { tags: string[] }=> {
  const tags = useMemo(() => {
    const items = Object.keys(bucket)
      .map(tag => [
        tag,
        bucket[tag].reduce((sum, voice) => sum + voice.desc.length, 0) / 14 + 4
      ] as [string, number])
      .sort(([, sumA], [, sumB]) => sumB - sumA)

    const parts: [number, string[]][] = [[0, []], [0, []], [0, []]]

    for (const [tag, sum] of items) {
      let min = -1
      for (let i = 0; i < parts.length; i++) {
        if (min === -1 || parts[min][0] > parts[i][0]) {
          min = i
        }
      }

      const part = parts[min]
      part[0] += sum
      part[1].push(tag)
    }

    return parts.map(([, tags]) => tags).flat()
  }, [bucket])

  return {
    tags
  }
}

export const useVoices = ({
  gachiValue,
  showAllVoices,
  showSexyKomori
}: UseVoicesProps) : UseVoicesHook => {
  const { bucket } = useGroupedVoices(allVoices)
  const { tags } = useSortedTags(bucket)

  const test = useCallback((it: Voice) => {
    if (showAllVoices) {
      return true
    }

    if (!showSexyKomori && it.tags.some(tag => sexyTags.includes(tag))) {
      return false
    }

    return !it.gachiRanges || it.gachiRanges.some(
      ([l, r]) => (l <= gachiValue && gachiValue <= r)
    )
  }, [showAllVoices, showSexyKomori, gachiValue])

  const voices = useMemo(() => {
    return tags
      .map((tag) => [
        tag,
        bucket[tag]
          .filter(test)
          .sort((a, b) => -a.date.localeCompare(b.date))
      ] as [string, Voice[]])
      .filter(([, voices]) => voices.length != 0)
  }, [bucket, tags, test])

  return {
    voices
  }
}
