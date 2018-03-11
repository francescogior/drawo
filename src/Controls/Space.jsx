import React from 'react'
import { makeView } from '../utils'

const MakeSpace = makeView(({ vertical, horizontal }) => ({
  marginLeft: `${horizontal}px`,
  marginRight: `${horizontal}px`,
  marginTop: `${vertical}px`,
  marginBottom: `${vertical}px`,
}))

const Space = ({ direction }) => (
  <MakeSpace
    vertical={direction === 'column' ? 15 : 0}
    horizontal={direction === 'row' ? 15 : 0}
  />
)

export default Space
