// @flow
export type Id = number | string

export type Viewport = { width: number, height: number }

type R = number
type G = number
type B = number
type Alpha = number
export type RGBAColor = [R, G, B] | [R, G, B, Alpha]
export type Color = string

export type Point = {| x: number, y: number |}

type Tools = {|
  pen: 'pen',
  rectangle: 'rectangle',
  circle: 'circle',
  line: 'line',
|}
export type Tool = $Keys<Tools>

export type Thickness = number

export type Image = { src: string, width: number, height: number }

export type Drawing = {|
  points: Point[],
  color: Color,
  tool: Tool,
  thickness: Thickness,
  id: Id,
  image?: Image,
  |}
