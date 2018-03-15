import React from 'react'
import { view } from '../utils'
import { UIProps } from './types'

const StatsView = view({
  position: 'absolute',
  height: '50px',
  right: '20px',
  top: '20px',
  marginLeft: 'auto',
  textAlign: 'right',
})

const Stat = view({
  padding: '20px',
  background: 'rgba(255,255,255,.8)',
  borderRadius: '5px',
  marginTop: '30px',
  marginBottom: '30px',
  lineHeight: '50px',
  zIndex: 1000,
})

export default function UI({
  pointsCounter,
  drawingsCounter,
  maxMaxX,
  avgAvgX,
  maxMaxY,
  avgAvgY,
}: UIProps) {
  return (
    <StatsView>
      <Stat>POINTS: {pointsCounter}</Stat>
      <Stat>DRAWINGS: {drawingsCounter}</Stat>
      <Stat>maxMaxDiffsX: {maxMaxX}</Stat>
      <Stat>avgAvgDiffsX: {avgAvgX}</Stat>
      <Stat>maxMaxDiffsY: {maxMaxY}</Stat>
      <Stat>avgAvgDiffsY: {avgAvgY}</Stat>
    </StatsView>
  )
}
