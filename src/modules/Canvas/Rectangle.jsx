import React from "react";
import { type Color } from "../../colors";
import { type Thickness } from "../../thicknesses";

const { abs, min } = Math;

export type Props = {
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color?: ?Color,
  thickness?: ?Thickness,
  background?: ?string // todo boh
};

const Rectangle = ({
  x0,
  y0,
  x1,
  y1,
  color,
  thickness,
  background = "transparent"
}) => (
  <rect
    x={min(x0, x1)}
    y={min(y0, y1)}
    width={abs(x1 - x0) || 1}
    height={abs(y1 - y0) || 1}
    stroke={color}
    strokeWidth={thickness}
    fill={background}
    strokeLinecap="round"
  />
);

export default Rectangle;
