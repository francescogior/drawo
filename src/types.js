export type Point = {| x: number, y: number |};

export type Thickness = number; // TODO better type

export type DrawingType = {|
  points: Point[],
  color: Color,
  tool: Tool,
  thickness: Thickness
|};
