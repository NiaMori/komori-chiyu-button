/** @jsx jsx */
import { jsx } from '@emotion/react'

import { Button } from '@material-ui/core'

import {
  lives,
  Origin,
  isFromLive,
  isFromWebPage,
  isFromVideo,
} from '../data'

export const getOriginInfo = (origin: Origin) : { url: string, desc: string } => {
  if (isFromWebPage(origin) || isFromVideo(origin)) {
    return origin
  } else if (isFromLive(origin)) {
    const live = lives[origin.live]

    return {
      url: live.url,
      desc: `${live.date} 「${live.desc}」`
    }
  } else {
    return {
      url: '',
      desc: '未知来源'
    }
  }
}

export interface OriginLinkProps {
  className?: string
  origin: Origin,
}

export const OriginLink = ({
  origin,
  className
}: OriginLinkProps) : JSX.Element => {
  const { url, desc } = getOriginInfo(origin)

  return (
    <Button
      component = 'a'
      href = {url}
      color = 'secondary'
      lang = 'zh-CN'
      className = {className}
    >
      {desc}
    </Button>
  )
}
