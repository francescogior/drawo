// @flow
import * as R from 'ramda'

import { makeId } from '../utils'
import type { Point, Tool, Color, Thickness } from '../domain'
import type { State, PState } from '../State'
import { emit } from '../io'
// import { stringify } from '../serializer'

// TODO this would be a command
// const save = (drawings: Drawing[]): Drawing[] => {
//   window.location.hash = stringify(drawings) // eslint-disable-line no-undef
//   return drawings
// }


export const onImageMove = (imageId: string, dragCurrentPoint: Point) => ({ imagesMovements }) => console.log('move', imagesMovements[imageId]) || ({
  imagesMovements: {
    ...imagesMovements,
    [imageId]:
      (imagesMovements[imageId] || []).length === 0 ?
        [{ start: dragCurrentPoint, end: dragCurrentPoint }] :
        ((R.last(imagesMovements[imageId]).start === R.last(imagesMovements[imageId]).end) ?
          imagesMovements[imageId].slice(0, -1) : imagesMovements[imageId])
          .concat({
            start: R.last(imagesMovements[imageId]).start,
            end: dragCurrentPoint,
          }),
  },
})

export const onImageMoveEnd = imageId => ({ imagesMovements, drawings }) => ({

})


export const collectPoint = (point: Point) => ({ selectedTool, points }: State): PState => {
  const newPoints = selectedTool === 'pen' ? R.append(point, points) : points.length === 0 ? [point] : [points[0], point]
  emit(newPoints)
  return ({
    points: newPoints,
  })
}
export const setColor = (color: Color) => (): PState => ({
  selectedColor: color,
})

export const openColorMenu = () => (): PState => ({
  isColorMenuOpen: true,
})

export const closeColorMenu = () => (): PState => ({
  isColorMenuOpen: false,
})

export const openToolMenu = () => (): PState => ({
  isToolMenuOpen: true,
})

export const closeToolMenu = () => (): PState => ({
  isToolMenuOpen: false,
})

export const openThicknessMenu = () => (): PState => ({
  isThicknessMenuOpen: true,
})

export const closeThicknessMenu = () => (): PState => ({
  isThicknessMenuOpen: false,
})

export const setThickness = (thickness: Thickness) => (): PState => ({
  selectedThickness: thickness,
})

export const setTool = (tool: Tool) => (): PState => ({
  selectedTool: tool,
})

export const onImagePaste = (base64Data: string, { width, height }: { width: number, height: number }) => ({
  drawings,
}: State): PState => {
  const newDrawing = {
    image: { src: base64Data, height, width },
    color: '',
    id: makeId(),
    points: [],
    thickness: 1,
    tool: 'pen',
  }
  emit(newDrawing)
  return {
    drawings: drawings.concat(newDrawing),
  }
}

export const onDrawEnd = () => ({
  drawings,
  points,
  selectedColor,
  selectedTool,
  selectedThickness,
}: State): PState => {
  const newDrawing = {
    id: makeId(),
    points,
    color: selectedColor,
    tool: selectedTool,
    thickness: selectedThickness,
  }
  emit(newDrawing)
  return {
    points: [],
    undos: [],
    drawings: R.append(newDrawing)(drawings),
  }
}

export const onRemoteDraw = (newRemoteDrawing: Drawing) => ({
  drawings,
}: State): PState => ({
  points: [],
  remotePoints: [],
  undos: [],
  drawings: R.append(newRemoteDrawing)(drawings),
})

export const onRemotePoints = (newRemotePoints: Point[]) => () => ({
  remotePoints: newRemotePoints,
})


export const onClear = () => ({ drawings, selectedColor, selectedThickness }: State): PState => {
  const newDrawing = {
    id: makeId(),
    points: [],
    tool: 'clear',
    color: selectedColor,
    thickness: selectedThickness,
  }
  emit(newDrawing)
  return {
    undos: [],
    drawings: R.append(newDrawing)(drawings),
  }
}

export const onUndo = () => ({ drawings }: State): PState => {
  const newDrawing = {
    id: makeId(),
    tool: 'undo',
  }
  emit(newDrawing)
  return {
    drawings: R.append(newDrawing)(drawings),
  }
}

export const onRedo = () => ({ drawings }: State): PState => {
  const newDrawing = {
    id: makeId(),
    tool: 'redo',
  }
  emit(newDrawing)
  return {
    drawings: R.append(newDrawing)(drawings),
  }
}
