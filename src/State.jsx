// @flow
import type { Drawing, Point, Color, Tool, Thickness, Viewport } from './domain'

export type State = {|
  colors: Color[],
  thicknesses: Thickness[],
  tools: Tool[],
  undos: Drawing[],
  points: Point[],
  drawings: Drawing[],
  selectedColor: Color,
  selectedTool: Tool,
  selectedThickness: Thickness,
  isColorMenuOpen: boolean,
  isToolMenuOpen: boolean,
  isThicknessMenuOpen: boolean,
  viewport: Viewport,
|}

export type PState = $Rest<State, {}>
