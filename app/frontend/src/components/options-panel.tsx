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

import { useTranslation } from 'react-i18next'

import { useOptions } from '../hooks'

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

const switches = [{
  name: 'loop',
  desc: '循环播放'
}, {
  name: 'overlap',
  desc: '允许重叠'
}, {
  name: 'showAllVoices',
  desc: '显示所有声音'
}, {
  name: 'showSexyKomori',
  desc: '允许涩古守'
}] as const

export const OptionsPanel = ({
  className
}: OptionsPanelProps) : JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [options, { modify }] = useOptions()

  const Divider = styled(UnStyledDivider)`
    margin-top: ${theme.spacing(2)}px;
    margin-bottom: ${theme.spacing(2)}px;
  `

  return (
    <Card className = {className}>
      <CardContent>
        <Typography variant = 'h5'>
          {t('设置')}
        </Typography>

        <Divider />

        <Grid container>
          <Grid item>
            <Typography>
              { t('gachi 浓度') }：
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
          {switches.map(({ name, desc }) => (
            <FormControlLabel
              key = {name}
              control = {
                <Switch
                  checked = {options[name]}
                  onChange = {(event) => modify(it => it[name] = event.target.checked)}
                />
              }
              label = {t(desc)}
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  )
}