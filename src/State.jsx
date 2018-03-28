// @flow
import type { Drawing, Point, Color, Tool, Thickness, Viewport } from './domain'

export type State = {|
  colors: Color[],
  thicknesses: Thickness[],
  tools: Tool[],
  images: { src: string, width: number, height: number }[],
  undos: Drawing[],
  points: Point[],
  dudloSize: number,
  drawings: Drawing[],
  isDrawing: boolean,
  selectedColor: Color,
  selectedTool: Tool,
  selectedThickness: Thickness,
  isColorMenuOpen: boolean,
  isToolMenuOpen: boolean,
  isThicknessMenuOpen: boolean,
  viewport: Viewport,
|}

export type PState = $Rest<State, {}>
