import React from "react";
import Rectangle from "./modules/Canvas/Rectangle";
import Path from "./modules/Canvas/Path";
import Circle from "./modules/Canvas/Circle";
import { head, last } from "ramda";
import { type Tool } from "./tools";
import { type Color } from "./colors";
import { l } from "./utils";
export type Props = {
  tool: Tool,
  color: Color
};

export default function Drawing({
  tool,
  color,
  thickness,
  points
}: Props): JSX.Element {
  const P0 = head(points) || {};
  const P1 = head(points.slice(1)) || {};
  return tool === "pen" ? (
    <Path points={points} color={color} thickness={thickness} />
  ) : tool === "rectangle" ? (
    <Rectangle
      thickness={thickness}
      color={color}
      x0={P0.x}
      y0={P0.y}
      x1={P1.x}
      y1={P1.y}
    />
  ) : tool === "circle" ? (
    <Circle
      thickness={thickness}
      color={color}
      x0={P0.x}
      y0={P0.y}
      x1={P1.x}
      y1={P1.y}
    />
  ) : (
    l.error("TOOL NON SUPPORTATO")
  );
}
