import * as R from 'ramda'
import { makeId } from '../utils'
import { Point, Drawing } from '../types'

import { stringify } from '../serializer'

const save = (drawings) => {
  window.location.hash = stringify(drawings)
  return drawings
}

export const collectPoint = (point: Point) => ({
  selectedTool,
  points,
}: PState): PState => ({
  points:
    selectedTool === 'pen'
      ? R.append(point, points)
      : points.length === 0 ? [point] : [points[0], point],
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

export const onImagePaste = (
  base64Data: string,
  { width, height }: { width: number, height: number },
) => ({ images }: State): PState => ({
  images: images.concat({ src: base64Data, height, width }),
})

export const onDrawEnd = () => ({
  drawings,
  points,
  selectedColor,
  selectedTool,
  selectedThickness,
}: PState): PState => ({
  points: [],
  undos: [],
  drawings: save(
    R.append({
      id: makeId(),
      points,
      color: selectedColor,
      tool: selectedTool,
      thickness: selectedThickness,
    })(drawings),
  ),
})

export const onClear = () => ({
  drawings,
  selectedColor,
  selectedTool,
  selectedThickness,
}) => ({
  undos: [],
  drawings: save(
    R.append({
      id: makeId(),
      points: [],
      tool: 'clear',
      color: selectedColor,
      thickness: selectedThickness,
    })(drawings),
  ),
})

export const onUndo = () => ({ undos, drawings }) => ({
  drawings: R.slice(0, -1)(drawings),
  undos: R.prepend(R.last(drawings))(undos),
})

export const onRedo = () => ({ undos, drawings }) => ({
  drawings: R.append(R.head(undos))(drawings),
  undos: R.slice(1, Infinity)(undos),
})
