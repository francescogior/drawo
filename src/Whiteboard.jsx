import React from 'react'
import cxs from 'cxs'

import { connect, update } from './modules/ReactApp/ReactApp'
import Canvas from './modules/Canvas/Canvas'
import Drawing from './Drawing'
import Image from './Image'
import { filterBeforeLastClear } from './utils'
import { Squared } from './patterns'

const keyStatesToConnect = [
  'drawings',
  'viewport',
  'points',
  'selectedColor',
  'selectedThickness',
  'selectedTool',
]

const updateToConnect = ['collectPoint', 'onDrawEnd', 'onImagePaste']

export default connect(keyStatesToConnect)(update(updateToConnect)(Whiteboard)) // eslint-disable-line no-use-before-define

function Whiteboard({
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
        image,
        points: drawingPoints,
        color,
        tool,
        thickness,
        id,
      }) => (image != null ? (
        <Image
          key={id}
          src={image.src}
          height={image.height}
          width={image.width}
        />
      ) : (
        <Drawing
          key={id}
          points={drawingPoints}
          color={color}
          tool={tool}
          thickness={thickness}
        />
      )))}

      <Drawing
        key="currentDrawing"
        points={points}
        color={selectedColor}
        tool={selectedTool}
        thickness={selectedThickness}
      />

    </Canvas>
  )
}
