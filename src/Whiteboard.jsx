import React from 'react'
import cxs from 'cxs'
import { connect, update } from './modules/ReactApp/ReactApp'
import Canvas from './modules/Canvas/Canvas'
import Drawing from './Drawing'
import { l, filterBeforeLastClear, getDirection } from './utils'
import { Squared } from './patterns'

export default connect([
  'viewport',
  'drawings',
  'points',
  'selectedColor',
  'selectedThickness',
  'selectedTool',
])(update(['collectPoint', 'onDrawEnd'])(Whiteboard))

function Whiteboard({
  viewport,
  drawings,
  points,
  selectedColor,
  selectedThickness,
  selectedTool,
  collectPoint,
  onDrawEnd,
}) {
  return (
    <Canvas
      className={cxs({ cursor: 'crosshair' })}
      width={viewport.width}
      height={viewport.height}
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
    </Canvas>
  )
}
