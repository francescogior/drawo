import React from "react";
import Rectangle from "./modules/Canvas/Rectangle";
import Path from "./modules/Canvas/Path";
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
  return tool === "pen" ? (
    <Path points={points} color={color} thickness={thickness} />
  ) : tool === "rectangle" ? (
    <Rectangle
      thickness={thickness}
      color={color}
      x0={(points[0] || {}).x}
      y0={(points[0] || {}).y}
      x1={(points[1] || {}).x}
      y1={(points[1] || {}).y}
    />
  ) : (
    l.error("TOOL NON SUPPORTATO")
  );
}
