// @flow
import * as R from 'ramda'

import { makeId } from '../utils'
import type { Point, Tool, Color, Thickness } from '../domain'
import type { State, PState } from '../State'
// import { stringify } from '../serializer'

// TODO this would be a command
// const save = (drawings: Drawing[]): Drawing[] => {
//   window.location.hash = stringify(drawings) // eslint-disable-line no-undef
//   return drawings
// }

export const collectPoint = (point: Point) => ({ selectedTool, points }: State): PState => ({
  points: selectedTool === 'pen' ? R.append(point, points) : points.length === 0 ? [point] : [points[0], point],
})

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
  images,
}: State): PState => ({
  images: images.concat({ src: base64Data, height, width }),
})

export const onDrawEnd = () => ({
  drawings,
  points,
  selectedColor,
  selectedTool,
  selectedThickness,
}: State): PState => ({
  points: [],
  undos: [],
  drawings: R.append({
    id: makeId(),
    points,
    color: selectedColor,
    tool: selectedTool,
    thickness: selectedThickness,
  })(drawings),
})

export const onClear = () => ({ drawings, selectedColor, selectedThickness }: State): PState => ({
  undos: [],
  drawings: R.append({
    id: makeId(),
    points: [],
    tool: 'clear',
    color: selectedColor,
    thickness: selectedThickness,
  })(drawings),
})

export const onUndo = () => ({ undos, drawings }: State): PState => ({
  drawings: R.slice(0, -1)(drawings),
  undos: R.prepend(R.last(drawings))(undos),
})

export const onRedo = () => ({ undos, drawings }: State): PState => ({
  drawings: R.append(R.head(undos))(drawings),
  undos: R.slice(1, Infinity)(undos),
})
