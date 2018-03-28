import React from 'react'
import cxs from 'cxs'
import { connect, update } from './modules/ReactApp/ReactApp'
import Canvas from './modules/Canvas/Canvas'
import Drawing from './Drawing'
import { l, filterBeforeLastClear, getDirection } from './utils'
import { Squared } from './patterns'

export default connect([
  'doodloSize',
  'images',
  'drawings',
  'points',
  'selectedColor',
  'selectedThickness',
  'selectedTool',
])(update(['collectPoint', 'onDrawEnd', 'onImagePaste'])(Whiteboard))

function Whiteboard({
  images,
  doodloSize,
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
      width={doodloSize}
      height={doodloSize}
      onDraw={collectPoint}
      onDrawEnd={onDrawEnd}
      PatternBackground={() => <Squared size={30} />}
    >
      {filterBeforeLastClear(drawings).map(
        ({ points, color, tool, thickness, id }) => (
          <Drawing
            key={id}
            points={points}
            color={color}
            tool={tool}
            thickness={thickness}
          />
        ),
      )}

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
          height={height / ((window && (window.devicePixelRatio || 2)) || 500)}
          width={width / ((window && (window.devicePixelRatio || 2)) || 500)}
        />
      ))}
    </Canvas>
  )
}
