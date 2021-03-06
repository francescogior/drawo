import React from 'react'

const { sqrt, pow } = Math // eslint-disable-line
const distance = (p1, p0) => sqrt(pow(p1.x - p0.x, 2) + pow(p1.y - p0.y, 2))

const Circle = ({
  x0, y0, x1, y1, r, color, thickness,
}) => (
  <circle
    cx={x0}
    cy={y0}
    r={typeof r === 'number' ? r : distance({ x: x1, y: y1 }, { x: x0, y: y0 })}
    fill="transparent"
    strokeWidth={thickness}
    stroke={color}
    style={{ cursor: 'pointer' }}
  />
)

export default Circle
