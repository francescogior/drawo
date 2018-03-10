import React from "react";

const { abs, min } = Math;

const Rectangle = ({ x0, y0, x1, y1, color, thickness }) => (
  <rect
    x={min(x0, x1)}
    y={min(y0, y1)}
    width={abs(x1 - x0)}
    height={abs(y1 - y0)}
    stroke={color}
    strokeWidth={thickness}
    fill="transparent"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default Rectangle;
