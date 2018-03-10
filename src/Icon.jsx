import React from 'react'
import Canvas from './modules/Canvas/Canvas'

export const ICON_COLOR = 'rgba(0, 0, 0, .8)'
export const ICON_SIZE = 30

const Icon = ({ children, size }) => (
  <Canvas width={size} height={size}>
    {children}
  </Canvas>
)

export default Icon
