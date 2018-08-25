import React from 'react'
import cxs from 'cxs'

import { connect, update } from './modules/ReactApp/ReactApp'
import Canvas from './modules/Canvas/Canvas'
import Drawing from './Drawing'
import { filterBeforeLastClear } from './utils'
import { Squared } from './patterns'

export default connect([
  'images',
  'viewport',
  'drawings',
  'points',
  'selectedColor',
  'selectedThickness',
  'selectedTool',
])(update(['collectPoint', 'onDrawEnd', 'onImagePaste'])(Whiteboard)) // eslint-disable-line no-use-before-define

function Whiteboard({
  images,
  viewport,
  drawings,
  points,
  selectedColor,
  selectedThickness,
  selectedTool,
  collectPoint,
  onDrawEnd,
  onImagePaste,
}) {
  return (
    <Canvas
      onImagePaste={onImagePaste}
      className={cxs({ cursor: 'crosshair' })}
      width={viewport.width}
      height={viewport.height}
      onDraw={collectPoint}
      onDrawEnd={onDrawEnd}
      PatternBackground={() => <Squared size={30} />}
    >
      {filterBeforeLastClear(drawings).map(({
 points: drawingPoints, color, tool, thickness, id,
}) => (
  <Drawing
    key={id}
    points={drawingPoints}
    color={color}
    tool={tool}
    thickness={thickness}
  />
        ))}

      <Drawing
        key="currentDrawing"
        points={points}
        color={selectedColor}
        tool={selectedTool}
        thickness={selectedThickness}
      />

      {images.map(({ src, width, height }) => (
        <image
          href={src}
          height={height / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
          width={width / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
        />
      ))}
    </Canvas>
  )
}
