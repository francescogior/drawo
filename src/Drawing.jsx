import React from "react";
import Rectangle from "./modules/Canvas/Rectangle";
import Path from "./modules/Canvas/Path";
import Circle from "./modules/Canvas/Circle";
import Point from "./modules/Canvas/Point";
import Line from "./modules/Canvas/Line";
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
  const { x: x0, y: y0 } = P0;
  const { x: x1, y: y1 } = P1;

  if (!x0 && !y0) return null;

  if (!x1 && !y1) {
    return <Point x0={x0} y0={y0} thickness={thickness} color={color} />;
  }

  return tool === "pen" ? (
    <Path points={points} color={color} thickness={thickness} />
  ) : tool === "rectangle" ? (
    <Rectangle
      thickness={thickness}
      color={color}
      x0={x0}
      y0={y0}
      x1={x1}
      y1={y1}
    />
  ) : tool === "circle" ? (
    <Circle
      thickness={thickness}
      color={color}
      x0={x0}
      y0={y0}
      x1={x1}
      y1={y1}
    />
  ) : tool === "line" ? (
    <Line thickness={thickness} color={color} x0={x0} y0={y0} x1={x1} y1={y1} />
  ) : (
    l.error("TOOL NON SUPPORTATO")
  );
}
