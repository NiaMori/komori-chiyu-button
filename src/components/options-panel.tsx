/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

import {
  Card,
  CardContent,
  Divider as UnStyledDivider,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Switch,
  Typography,
  useTheme
} from '@material-ui/core'

import { useOptions } from '../hooks/use-options'

export interface OptionsPanelProps {
  className?: string
}

const marks = [{
  value: 0,
  label: 'anti'
}, {
  value: 50,
  label: 'ganti'
}, {
  value: 100,
  label: 'gachi'
}]

export const OptionsPanel = ({
  className
}: OptionsPanelProps) : JSX.Element => {
  const theme = useTheme()
  const [options, { modify }] = useOptions()

  const Divider = styled(UnStyledDivider)`
    margin-top: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
  `

  return (
    <Card className = {className}>
      <CardContent>
        <Typography variant = 'h5'>
          设置
        </Typography>

        <Divider />

        <Grid container>
          <Grid item>
            <Typography>
              gachi 浓度：
            </Typography>
          </Grid>

          <Grid item xs
            css = {css`
              padding-right: ${theme.spacing(2)}px;
            `}
          >
            <Slider
              value = {options.gachiValue}
              onChange = {(event, newValue) => modify(it => it.gachiValue = newValue as number)}
              color = 'secondary'
              valueLabelDisplay = "auto"
              valueLabelFormat = {(value) => `${value}%`}
              marks = {marks}
              step = {1}
              min = {0}
              max = {100}
            />
          </Grid>
        </Grid>

        <FormGroup row>
          <FormControlLabel
            control = {<Switch />}
            label = "显示所有声音"
            value = {options.showAllVoices}
            onChange = {(event, newValue) => modify(it => it.showAllVoices = newValue)}
          />

          <FormControlLabel
            control = {<Switch />}
            label = "允许涩古守"
            value = {options.showSexyKomori}
            onChange = {(event, newValue) => modify(it => it.showSexyKomori = newValue)}
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
}