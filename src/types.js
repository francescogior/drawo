export type Point = {| x: number, y: number |};
export type DrawingType = {|
  points: Point[],
  color: Color,
  tool: Tool,
  thickness: Thickness
|};
