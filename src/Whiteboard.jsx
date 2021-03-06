import React from 'react'
import cxs from 'cxs'

import { connect, update } from './modules/ReactApp/ReactApp'
import Canvas from './modules/Canvas/Canvas'
import Drawing from './Drawing'
import Image from './Image'
import { filterBeforeLastClear, computeUndosAndRedos, calculateTotalMovement } from './utils'
import { Squared } from './patterns'
import { onData } from './io'

const keyStatesToConnect = [
  'drawings',
  'viewport',
  'points',
  'selectedColor',
  'selectedThickness',
  'selectedTool',
  'remotePoints',
  'imagesMovements',
]

const updateToConnect = [
  'collectPoint',
  'onDrawEnd',
  'onImagePaste',
  'onRemoteDraw',
  'onRemotePoints',
  'onImageMove',
]

function whiteboardRender({
  viewport,
  drawings,
  points,
  selectedColor,
  selectedThickness,
  selectedTool,
  collectPoint,
  onDrawEnd,
  onImagePaste,
  remotePoints,
  onImageMove,
  imagesMovements,
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
      {filterBeforeLastClear(computeUndosAndRedos(drawings)).map(({
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
          x={200 + calculateTotalMovement(imagesMovements[id]).x}
          y={200 + calculateTotalMovement(imagesMovements[id]).y}
          height={image.height}
          width={image.width}
          onDrag={(position) => {
            onImageMove(id, position)
          }}
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

      <Drawing
        key="remoteDrawing"
        points={remotePoints}
        color={selectedColor}
        tool={selectedTool}
        thickness={selectedThickness}
      />

    </Canvas>
  )
}

class Whiteboard extends React.Component {
  componentDidMount() {
    onData((data) => {
      if (Array.isArray(data)) { // points
        this.props.onRemotePoints(data)
      } else { // drawing
        this.props.onRemoteDraw(data)
      }
    })
  }

  render() {
    return whiteboardRender(this.props)
  }
}

export default connect(keyStatesToConnect)(update(updateToConnect)(Whiteboard)) // eslint-disable-line no-use-before-define
