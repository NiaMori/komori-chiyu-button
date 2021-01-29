/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

import {
  Card,
  CardContent,
  Typography,
  Divider as UnStyledDivider,
  Grid,
  Button,
  Chip,
  useTheme
} from '@material-ui/core'

import { useVocalist } from '../hooks'

import {
  lives,
  voices as allVoices,
  Origin,
  isFromLive,
  isFromWebPage
} from '../data'

export interface VoiceInfoPanelProps {
  className?: string
}

const getOriginInfo = (origin: Origin) : { url: string, desc: string } => {
  if (isFromWebPage(origin)) {
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

const OriginLink = ({ origin }: { origin: Origin }) => {
  const { url, desc } = getOriginInfo(origin)

  return (
    <Button component = 'a' href = {url} color = 'secondary'>
      {desc}
    </Button>
  )
}

export const VoiceInfoPanel = ({
  className
}: VoiceInfoPanelProps) : JSX.Element => {
  const theme = useTheme()

  const [{ sounds }] = useVocalist()

  const id = Object.keys(sounds)[0] ?? 'null'
  const currentSound = sounds[id]

  const {
    voice = allVoices[0],
    state = 'unloaded'
  } = currentSound ?? {}

  const {
    desc,
    origin,
    tags
  } = voice

  const styles = {
    flexVCenter: css`
      display: flex;
      align-items: center;
    `
  }

  const Divider = styled(UnStyledDivider)`
    margin-top: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
  `

  return (
    <Card className = {className}>
      <CardContent>
        {Object.keys(sounds).map((id) => {
          const { voice, state } = sounds[id]
          const { desc } = voice
          return (
            <div key = {id}>
              《{ desc }》- {state === 'loading' ? 'lording' : state}
            </div>
          )
        })}

        <Divider />

        <Typography variant = 'h5'>
          《{ desc }》- {state === 'loading' ? 'lording' : state}
        </Typography>

        <Divider />

        <Grid container>
          <Grid item css = {styles.flexVCenter}>
            来源：
          </Grid>

          <Grid item xs>
            <OriginLink origin = {origin}></OriginLink>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item css = {styles.flexVCenter}>
            标签：
          </Grid>

          <Grid item xs
            css = {css`
              > .MuiChip-root {
                margin-right: ${theme.spacing(1)}px;
              }
            `}
          >
            {tags.map((tag) => (
              <Chip key = {tag} variant = {'outlined'} label = {tag} onClick = {() => null}/>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
