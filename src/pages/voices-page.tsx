/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import { Fragment } from 'react'

import { Grid, useTheme } from '@material-ui/core'

import {
  VoiceInfoPanel,
  OptionsPanel,
  Cards,
  VoicesCard
} from '../components'

import {
  useVoices,
  useOptions
} from '../hooks'

import {
  voices as allVoices,
  isNewVoice
} from '../data'

export const VoicesPage = () : JSX.Element => {
  const theme = useTheme()

  const [options] = useOptions()
  const { voices } = useVoices(options)
  const newVoices = allVoices.filter(isNewVoice)

  return (<Fragment>
    <Grid container spacing = {3} alignItems = 'stretch'>
      <Grid item md = {6} xs = {12}>
        <VoiceInfoPanel
          css = {css`
            height: 100%;
          `}
        />
      </Grid>

      <Grid item md = {6} xs = {12}>
        <OptionsPanel
          css = {css`
            height: 100%;
          `}
        />
      </Grid>
    </Grid>

    {
      !!newVoices.length
      && <VoicesCard tag = {'最近更新'} voices = {newVoices}></VoicesCard>
    }

    <Cards columnGap = {theme.spacing(5)}>
      {voices.map(([tag, voices]) => (
        <VoicesCard key = {tag} tag = {tag} voices = {voices}></VoicesCard>
      ))}
    </Cards>
  </Fragment>)
}
