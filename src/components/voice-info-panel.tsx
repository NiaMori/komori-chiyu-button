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
  Box,
  useTheme
} from '@material-ui/core'

import { useVocalist } from '../hooks/use-vocalist'

import { voices as allVoices, origins } from '../data/voices.data'

export interface VoiceInfoPanelProps {
  className?: string
}

export const VoiceInfoPanel = ({
  className
}: VoiceInfoPanelProps) : JSX.Element => {
  const theme = useTheme()

  const [{ currentSound, state }] = useVocalist()

  const {
    voice = allVoices[0]
  } = currentSound ?? {}

  const {
    desc,
    origin: originName,
    tags
  } = voice

  const origin = originName ? origins[originName] : null

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
        <Typography variant = 'h5'>
          《{ desc }》- {state === 'loading' ? 'lording' : state}
        </Typography>

        <Divider />

        <Grid container>
          <Grid item css = {styles.flexVCenter}>
            来源：
          </Grid>

          <Grid item xs>
            {origin ? (
              <Button component = 'a' href = {origin.url} color = 'primary'>
                {`${origin.date} 「${origin.desc}」`}
              </Button>
            ) : (
              <Box>未知</Box>
            )}
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
